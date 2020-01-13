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
        data
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
  getCarga(payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/tipos-carga`,
        method: "get"
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  },
}
