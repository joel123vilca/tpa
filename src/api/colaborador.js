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
  getVerify(payload = {}) {
    const params = payload.params || {}
    const rut = payload.rut
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/validacion-rut?rut=${rut}`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
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
  getTipoMovilidad(payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipo-movilidades`,
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
  getByIdMovilidad(payload = {}) {
    const movilidadId = payload.movilidadId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/movilidades/${movilidadId}`,
        method: "get",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  putMovilidad(payload = {}) {
    const movilidadId = payload.movilidadId;
    const data = payload.data || {};
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/movilidades/${movilidadId}`,
        method: "put",
        data,
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  deleteMovilidad(payload = {}) {

    const movilidadId = payload.movilidadId;

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/movilidades/${movilidadId}`,
        method: 'delete',
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  },
  getByIdFamily(payload = {}) {
    const familiarId = payload.familiarId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargas-familiares/${familiarId}`,
        method: "get",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  putFamily(payload = {}) {
    const familiarId = payload.familiarId;
    const data = payload.data || {};

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/cargas-familiares/${familiarId}`,
        method: "patch",
        data,
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
  getCurso(payload = {}) {
    const colaboradorId = payload.colaboradorId;
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/${colaboradorId}/capacitaciones`,
        method: "get",
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  postAsignarCurso(payload = {}) {
    const data = payload.data || {};
    const colaboradorId = payload.colaboradorId;

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/colaboradores/${colaboradorId}/capacitaciones`,
        method: "post",
        data,
        headers: {'Content-Type': 'multipart/form-data' },
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
  deleteCurso(payload = {}) {
    const cursoId = payload.cursoId;

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/capacitaciones/${cursoId}`,
        method: 'delete',
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  },
};
