import axios from "axios";
import { BLOG_URLs } from "../http.services";

export default {
  createBlog: async function (body) {
    const { data } = await axios.post(`${BLOG_URLs.createBlog}`, body, {
      withCredentials: true,
    });
    return data;
  },
  updateBlog: async function (body, id) {
    const { data } = await axios.put(`${BLOG_URLs.updateBlog}/${id}`, body, {
      withCredentials: true,
    });
    return data;
  },
  deleteBlog: async function (id) {
    const { data } = await axios.delete(`${BLOG_URLs.deleteBlog}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  getBlogInfo: async function (id) {
    const { data } = await axios.get(`${BLOG_URLs.getBlogInfo}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  getAllBlogs: async function (page) {
    const { data } = await axios.get(`${BLOG_URLs.getAllBlogs}?page=${page}`, {
      withCredentials: true,
    });
    return data;
  },
};
