import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/comentarios`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  getById(payload = {}) {
    const comentarioId = payload.comentarioId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/comentarios/${comentarioId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  put(payload = {}) {
    const comentarioId = payload.comentarioId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/comentarios/${comentarioId}`,
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
        url: `${HOST}/comentarios`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  delete(payload = {}) {
    const comentarioId = payload.comentarioId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/comentarios/${comentarioId}`,
        method: "delete",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getTipoComentarios(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipo-comentarios`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
};

