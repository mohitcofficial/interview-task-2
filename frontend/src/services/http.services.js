export const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const USER_URLs = {
  login: `${BASEURL}/api/v1/login`,
  logout: `${BASEURL}/api/v1/logout`,
  signUp: `${BASEURL}/api/v1/user/signup`,
  getMyProfile: `${BASEURL}/api/v1/me`,
  verify: `${BASEURL}/api/v1/verify`,
};
export const BLOG_URLs = {
  createBlog: `${BASEURL}/api/v1/blog`,
  updateBlog: `${BASEURL}/api/v1/blog`,
  deleteBlog: `${BASEURL}/api/v1/blog`,
  getBlogInfo: `${BASEURL}/api/v1/blog`,
  getAllBlogs: `${BASEURL}/api/v1/blogs`,
};
