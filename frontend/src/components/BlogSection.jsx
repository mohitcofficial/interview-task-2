import React, { useEffect, useState, useCallback, useRef } from "react";
import classes from "./BlogSection.module.css";
import BlogCard from "./card/BlogCard";
import BlogApiServices from "../services/api/Blog.api.services";

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const lastFetchedPage = useRef(0);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await BlogApiServices.getAllBlogs(page);
      setBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
      setHasMore(page < data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page !== lastFetchedPage.current) {
      lastFetchedPage.current = page;
      fetchBlogs();
    }
  }, [page]);

  const loadMoreBlogs = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreBlogs, {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMoreBlogs]);

  return (
    <div className={classes.container}>
      <p className={classes.heading}>
        <span>Blogs</span>
      </p>
      <div className={classes.blogContainer}>
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
      {loading && <div className={classes.loading}>Loading...</div>}
      {!hasMore && <div className={classes.noMore}>No more blogs to load</div>}
      {/* Intersection observer target */}
      <div ref={observerRef} className={classes.observerTarget}></div>
    </div>
  );
}

export default BlogSection;
