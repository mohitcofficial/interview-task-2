import axios from "axios";
import { USER_URLs } from "../http.services";

export default {
  login: async function (body) {
    const { data } = await axios.post(`${USER_URLs.login}`, body, {
      withCredentials: true,
    });
    return data;
  },
  logout: async function () {
    const { data } = await axios.post(
      `${USER_URLs.logout}`,
      {},
      {
        withCredentials: true,
      }
    );
    return data;
  },
  signUp: async function (body) {
    const { data } = await axios.post(`${USER_URLs.signUp}`, body, {
      withCredentials: true,
    });
    return data;
  },
  getMyProfile: async function () {
    const { data } = await axios.get(`${USER_URLs.getMyProfile}`, {
      withCredentials: true,
    });
    return data;
  },
  verifyUser: async function (token) {
    const { data } = await axios.post(
      `${USER_URLs.verify}`,
      { token },
      {
        withCredentials: true,
      }
    );
    return data;
  },
};
