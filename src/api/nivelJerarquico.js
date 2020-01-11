import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/niveles-jerarquico`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  getById(payload = {}) {
    const jerarquiaId = payload.jerarquiaId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/niveles-jerarquico/${jerarquiaId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  put(payload = {}) {
    const jerarquiaId = payload.jerarquiaId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/niveles-jerarquico/${jerarquiaId}`,
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
        url: `${HOST}/niveles-jerarquico`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  delete(payload = {}) {
    const jerarquiaId = payload.jeraquiaId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/niveles-jerarquico/${jerarquiaId}`,
        method: "delete",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

};

