import * as types from "../mutation-types";
import encuestaAPI from "@/api/encuesta";

export const state = {
    encuestas: [],
    loadingEncuestas: false,
    currentEncuesta: null,
    asignados: [],
    loadingAsignados: false,
    disponibles: [],
    loadingDisponibles: false
};

export const actions = {
    getEncuestas({ commit }, payload) {
        commit(types.REPLACE_LOADING_ENCUESTAS, { status: true });
        return new Promise((resolve, reject) => {
            encuestaAPI
                .get(payload)
                .then(response => {
                    const encuestas = response.data.data;
                    commit(types.REPLACE_LOADING_ENCUESTAS, { status: false });
                    commit(types.REPLACE_ENCUESTAS, { encuestas });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_ENCUESTAS, { status: false });
                    reject(error);
                });
        });
    },
    getAsignados({ commit }, payload) {
        commit(types.REPLACE_LOADING_ASIGNADOS, { status: true });
        return new Promise((resolve, reject) => {
            encuestaAPI
                .asignados(payload)
                .then(response => {
                    const asignados = response.data.data;
                    commit(types.REPLACE_LOADING_ASIGNADOS, { status: false });
                    commit(types.REPLACE_ASIGNADOS, { asignados });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_ASIGNADOS, { status: false });
                    reject(error);
                });
        });
    },
    getDisponibles({ commit }, payload) {
        commit(types.REPLACE_LOADING_DISPONIBLES, { status: true });
        return new Promise((resolve, reject) => {
            encuestaAPI
                .disponibles(payload)
                .then(response => {
                    const disponibles = response.data.data;
                    commit(types.REPLACE_LOADING_DISPONIBLES, { status: false });
                    commit(types.REPLACE_DISPONIBLES, { disponibles });

                    resolve(response);
                })
                .catch(error => {
                    commit(types.REPLACE_LOADING_DISPONIBLES, { status: false });
                    reject(error);
                });
        });
    },
    getEncuesta({ commit }, payload) {
        return new Promise((resolve, reject) => {
            encuestaAPI
                .getById(payload)
                .then(response => {
                    const encuesta = response.data.data;

                    commit(types.REPLACE_CURRENT_ENCUESTA, { encuesta });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    replaceCurrentEncuesta({ commit }, payload) {
        commit(types.REPLACE_CURRENT_ENCUESTA, payload);
    },

    createEncuesta({ commit }, payload) {
        return new Promise((resolve, reject) => {
            encuestaAPI
                .post(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Encuesta",
                        message: "El encuesta ha sido creado con éxito."
                    });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    putEncuesta({ commit }, payload) {
        return new Promise((resolve, reject) => {
            encuestaAPI
                .put(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Encuesta",
                        message: "El encuesta ha sido editado con éxito."
                    });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    asignar({ commit }, payload) {
        return new Promise((resolve, reject) => {
            encuestaAPI
                .asignar(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Encuesta",
                        message: "la asignacion ha sido creado con éxito."
                    });

                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    desasignar({ commit }, payload) {
        return new Promise((resolve, reject) => {
            encuestaAPI
                .desasignar(payload)
                .then(response => {
                    this._vm.$notify.success({
                        title: "Encuestas",
                        message: "El colaboradores han sido Desasignados con éxito."
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
    [types.REPLACE_LOADING_ENCUESTAS](state, { status }) {
        state.loadingEncuestas = status;
    },
    [types.REPLACE_ENCUESTAS](state, { encuestas }) {
        state.encuestas = encuestas;
    },
    [types.REPLACE_CURRENT_ENCUESTA](state, { encuesta }) {
        state.currentEncuesta = encuesta;
    },
    [types.REPLACE_LOADING_ASIGNADOS](state, { status }) {
        state.loadingAsignados = status;
    },
    [types.REPLACE_ASIGNADOS](state, { asignados }) {
        state.asignados = asignados;
    },
    [types.REPLACE_LOADING_DISPONIBLES](state, { status }) {
        state.loadingDisponibles = status;
    },
    [types.REPLACE_DISPONIBLES](state, { disponibles }) {
        state.disponibles = disponibles;
    },
};