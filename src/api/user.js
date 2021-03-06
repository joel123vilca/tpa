import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  getById(payload = {}) {
    const userId = payload.userId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  put(payload = {}) {
    const userId = payload.userId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}`,
        method: "put",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  async post(payload = {}) {
    const data = payload.data || {};
    try {
      const response = await axios({
        url: `${HOST}/users`,
        method: "post",
        data
      })
      return response;
    }
    catch (error) {
      console.log(error)
      return error;
    }

  },
  delete(payload = {}) {
    const data = payload.users;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users`,
        method: "delete",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  sendTokenForResetPassword(payload = {}) {
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/password/email`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  resetPassword(payload = {}) {
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/password/reset`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
};
