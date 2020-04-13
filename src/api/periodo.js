import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
    get(payload = {}) {
        const params = payload.params || {};
        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/periodos`,
                    method: "get",
                    params
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    getPlantilla(payload = {}) {
        const params = payload.params || {};
        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/encuesta-plantillas`,
                    method: "get",
                    params
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    getById(payload = {}) {
        const periodoId = payload.periodoId || "";

        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/periodos/${periodoId}`,
                    method: "get"
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    cargarExcel(payload = {}) {
        const periodoId = payload.periodoId;
        const data = payload.data || {};
    
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/periodos/${periodoId}/detalle-respuestas`,
            method: "post",
            data,
            headers: {'Content-Type': 'multipart/form-data'},
          })
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    },
    getByIdEncuestas(payload = {}) {
        const periodoId = payload.periodoId || "";

        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/periodos/${periodoId}/encuestas`,
                    method: "get"
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    put(payload = {}) {
        const periodoId = payload.periodoId;
        const data = payload.data || {};

        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/periodos/${periodoId}`,
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
                    url: `${HOST}/periodos`,
                    method: "post",
                    data
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    delete(payload = {}) {
        const periodoId = payload.periodoId;
        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/periodos/${periodoId}`,
                    method: "delete",
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
};