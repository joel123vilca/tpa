import * as types from "../mutation-types";
import periodoAPI from "@/api/periodo";

export const state = {
    periodos: [],
    loadinPeriodos: false,
    currentPeriodo: null,
    showModalDeletePeriodo: false,
    plantillas: [],
    loadingPlantillas: false,
    periodoEncuestas: [],
    loadingPeriodoEncuestas: false,
    periodoEstadisticas: [],
    loadingPeriodoEstadisticas: false
};

export const actions = {
    getPeriodos({ commit }, payload) {
        commit(types.REPLACE_LOADING_PERIODOS, { status: true });
        return new Promise((resolve, reject) => {
            periodoAPI
                .get(payload)
                .then(response => {
                    const periodos = response.data.data;
                    commit(types.REPLACE_LOADING_PERIODOS, { status: false });
                    commit(types.REPLACE_PERIODOS, { periodos });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_PERIODOS, { status: false });
                    reject(error);
                });
        });
    },
    getPlantillas({ commit }, payload) {
        commit(types.REPLACE_LOADING_PLANTILLAS, { status: true });
        return new Promise((resolve, reject) => {
            periodoAPI
                .getPlantilla(payload)
                .then(response => {
                    const plantillas = response.data.data;
                    commit(types.REPLACE_LOADING_PLANTILLAS, { status: false });
                    commit(types.REPLACE_PLANTILLAS, { plantillas });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_PLANTILLAS, { status: false });
                    reject(error);
                });
        });
    },
    getPeriodo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            periodoAPI
                .getById(payload)
                .then(response => {
                    const periodo = response.data.data;

                    commit(types.REPLACE_CURRENT_PERIODO, { periodo });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getPeriodoEncuestas({ commit }, payload) {
        commit(types.REPLACE_LOADING_PERIODO_ENCUESTAS, { status: true });
        return new Promise((resolve, reject) => {
            periodoAPI
                .getByIdEncuestas(payload)
                .then(response => {
                    const periodoEncuestas = response.data.data;
                    commit(types.REPLACE_LOADING_PERIODO_ENCUESTAS, { status: false });
                    commit(types.REPLACE_PERIODO_ENCUESTAS, { periodoEncuestas });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_PERIODO_ENCUESTAS, { status: false });
                    reject(error);
                });
        });
    },
    getPeriodoEstadisticas({ commit }, payload) {
        commit(types.REPLACE_LOADING_PERIODO_ESTADISTICAS, { status: true });
        return new Promise((resolve, reject) => {
            periodoAPI
                .getByIdEstadistica(payload)
                .then(response => {
                    const periodoEstadisticas = response.data.data;
                    commit(types.REPLACE_LOADING_PERIODO_ESTADISTICAS, { status: false });
                    commit(types.REPLACE_PERIODO_ESTADISTICAS, { periodoEstadisticas });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_PERIODO_ESTADISTICAS, { status: false });
                    reject(error);
                });
        });
    },
    deletePeriodo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            periodoAPI
                .delete(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Periodo",
                        message: "El Periodo han sido eliminado con éxito."
                    });
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    replaceCurrentPeriodo({ commit }, payload) {
        commit(types.REPLACE_CURRENT_PERIODO, payload);
    },
    replaceShowModalDeletePeriodo({ commit }, payload) {
        commit(types.REPLACE_SHOW_MODAL_DELETE_PERIODO, payload);
    },
    updatePeriodo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            periodoAPI
                .put(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Periodo",
                        message: "El periodo ha sido actualizado con éxito."
                    });
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    createPeriodo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            periodoAPI
                .post(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Periodo",
                        message: "El periodo ha sido creado con éxito."
                    });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    cargarExcel({ commit }, payload) {
        return new Promise((resolve, reject) => {
            periodoAPI
                .cargarExcel(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Periodo",
                        message: "Se cargo con exito"
                    });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },


};

export const mutations = {
    [types.REPLACE_LOADING_PERIODOS](state, { status }) {
        state.loadingPeriodos = status;
    },
    [types.REPLACE_PERIODOS](state, { periodos }) {
        state.periodos = periodos;
    },
    [types.REPLACE_LOADING_PLANTILLAS](state, { status }) {
        state.loadingPlantillas = status;
    },
    [types.REPLACE_PLANTILLAS](state, { plantillas }) {
        state.plantillas = plantillas;
    },
    [types.REPLACE_LOADING_PERIODO_ENCUESTAS](state, { status }) {
        state.loadingPeriodoEncuestas = status;
    },
    [types.REPLACE_PERIODO_ENCUESTAS](state, { periodoEncuestas }) {
        state.periodoEncuestas = periodoEncuestas;
    },
    [types.REPLACE_CURRENT_PERIODO](state, { periodo }) {
        state.currentPeriodo = periodo;
    },
    [types.REPLACE_SHOW_MODAL_DELETE_PERIODO](state, { status }) {
        state.showModalDeletePeriodo = status;
    },
    [types.REPLACE_LOADING_PERIODO_ESTADISTICAS](state, { status }) {
        state.loadingPeriodoEstadisticas = status;
    },
    [types.REPLACE_PERIODO_ESTADISTICAS](state, { periodoEstadisticas }) {
        state.periodoEstadisticas = periodoEstadisticas;
    },
};