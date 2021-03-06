import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  get(payload = {}) {
    const params = payload.params || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargos`,
        method: "get",
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  getById(payload = {}) {
    const cargoId = payload.cargoId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargos/${cargoId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  put(payload = {}) {
    const cargoId = payload.cargoId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargos/${cargoId}`,
        method: "post",
        data,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  post(payload = {}) {
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargos`,
        method: "post",
        data,
        headers: {'Content-Type': 'multipart/form-data' },
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  delete(payload = {}) {
    const cargoId = payload.cargoId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargos/${cargoId}`,
        method: "delete",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getByIdAreas(payload = {}) {
    const cargoId = payload.cargoId || "";
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargos/${cargoId}/relacionados`,
        method: "get"
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
        url: `${HOST}/cargos/validar-nombre?nombre=${nombre}`,
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
    const cargoId = payload.cargoId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargos/${cargoId}/validar-nombre?nombre=${nombre}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
};
