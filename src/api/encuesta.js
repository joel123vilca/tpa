import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/encuestas`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getById(payload = {}) {
    const encuestaId = payload.encuestaId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/encuestas/${encuestaId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  put(payload = {}) {
    const encuestaId = payload.encuestaId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/encuestas/${encuestaId}`,
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
        url: `${HOST}/encuestas`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  delete(payload = {}) {
    const encuestaId = payload.encuestaId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/encuestas/${encuestaId}`,
        method: "delete",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
};
