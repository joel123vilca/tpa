import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
  post(payload = {}) {
    const data = payload.data || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores`,
        method: "post",
        data,
        headers: {'Content-Type': 'multipart/form-data' },
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  get(payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getById(payload = {}) {
    const colaboradorId = payload.colaboradorId || "";

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/${colaboradorId}`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },

  put(payload = {}) {
    const colaboradorId = payload.colaboradorId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/${colaboradorId}`,
        method: "post",
        data,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  postFamily(payload = {}) {
    const data = payload.data || {};
    const colaboradorId = payload.colaboradorId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/${colaboradorId}/cargas-familiares`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  postMovilidad(payload = {}) {
    const data = payload.data || {};
    const colaboradorId = payload.colaboradorId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/${colaboradorId}/movilidades`,
        method: "post",
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getMovilidad(payload = {}) {
    const colaboradorId = payload.colaboradorId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/${colaboradorId}/movilidades`,
        method: "get",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getFamily(payload = {}) {
    const colaboradorId = payload.colaboradorId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/${colaboradorId}/cargas-familiares`,
        method: "get",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  getCarga(payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipo-cargas`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
}
