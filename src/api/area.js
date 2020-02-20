import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/areas`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getVerify(payload = {}) {
    const params = payload.params || {}
    const nombre = payload.nombre
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/areas/validar-nombre?nombre=${nombre}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getVerifyById(payload = {}) {
    const params = payload.params || {};
    const nombre = payload.nombre;
    const areaId = payload.areaId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/areas/${areaId}/validar-nombre?nombre=${nombre}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getById(payload = {}) {
    const areaId = payload.areaId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/areas/${areaId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getByIdAreas(payload = {}) {
    const areaId = payload.areaId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/areas/${areaId}/relacionados`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  put(payload = {}) {
    const areaId = payload.areaId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/areas/${areaId}`,
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
        url: `${HOST}/areas`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  delete(payload = {}) {
    const areaId = payload.areaId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/areas/${areaId}`,
        method: "delete",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
};
