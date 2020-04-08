import axios from "axios";
import { baseUrlAPI } from "@/config/api";

const HOST = baseUrlAPI;

export default {
    get(payload = {}) {
        const params = payload.params || {}
        const interno = payload.interno

        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/cursos?interno=${interno}`,
                    method: "get",
                    params
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    getTipoCursos(payload = {}) {
        const params = payload.params || {};
        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/tipo-cursos`,
                    method: "get",
                    params
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    cursoSeleccionado(payload = {}) {
        const data = payload.data || {};
        const cursoId = payload.cursoId;
        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/cursos/${cursoId}/capacitaciones`,
                    method: "post",
                    data
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    getById(payload = {}) {
        const cursoId = payload.cursoId || "";

        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/cursos/${cursoId}`,
                    method: "get"
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    getColaboradoresDisponibles(payload = {}) {
        const cursoId = payload.cursoId || "";
        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/cursos/${cursoId}/colaboradores-disponibles`,
                    method: "get"
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    getCursosDisponibles(payload = {}) {
        const colaboradorId = payload.colaboradorId || "";
        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/colaboradores/${colaboradorId}/cursos-disponibles`,
                    method: "get"
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    put(payload = {}) {
        const cursoId = payload.cursoId;
        const data = payload.data || {};

        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/cursos/${cursoId}`,
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
                    url: `${HOST}/cursos`,
                    method: "post",
                    data
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    delete(payload = {}) {
        const cursoId = payload.cursoId;
        return new Promise((resolve, reject) => {
            axios({
                    url: `${HOST}/cursos/${cursoId}`,
                    method: "delete",
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },

};