import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipos-area`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  getById(payload = {}) {
    const tipoAreaId = payload.tipoAreaId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipos-area/${tipoAreaId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  put(payload = {}) {
    const tipoAreaId = payload.tipoAreaId;
    const data = payload.data || {};
    console.log(data);
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipos-area/${tipoAreaId}`,
        method: "patch",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  post(payload = {}) {
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipos-area`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  delete(payload = {}) {
    const tipoAreaId = payload.tipoAreaId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipos-area/${tipoAreaId}`,
        method: "delete",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
};
