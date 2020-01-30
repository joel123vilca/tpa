import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/administradores`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  getById(payload = {}) {
    const administradorId = payload.administradorId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/administradores/${administradorId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  put(payload = {}) {
    const administradorId = payload.administradorId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/administradores/${administradorId}`,
        method: "put",
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
        url: `${HOST}/administradores`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

};
