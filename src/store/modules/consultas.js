import * as types from "../mutation-types";
import consultaAPI from "@/api/consulta";

export const state = {
  consultas: [],
  loadingConsultas: false,
  showModalVerConsultas: false,
  currentConsulta: null,
};

export const actions = {
  getConsultas({ commit }, payload) {
    commit(types.REPLACE_LOADING_CONSULTAS, { status: true });

    return new Promise((resolve, reject) => {
      consultaAPI
        .get(payload)
        .then(response => {
          const consultas = response.data.data;

          commit(types.REPLACE_LOADING_CONSULTAS, { status: false });
          commit(types.REPLACE_CONSULTAS, { consultas });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CONSULTAS, { status: false });
          reject(error);
        });
    });
  },
  replaceShowModalVerConsultas ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_VER_CONSULTAS, payload)
  },
  replaceCurrentConsulta ({ commit }, payload) {
    commit(types.REPLACE_CURRENT_CONSULTA, payload)
  },
  patchConsulta({ commit }, payload) {
    return new Promise((resolve, reject) => {
      consultaAPI
        .patch(payload)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export const mutations = {
  [types.REPLACE_LOADING_CONSULTAS](state, { status }) {
    state.loadingConsultas = status;
  },
  [types.REPLACE_CONSULTAS](state, { consultas }) {
    state.consultas = consultas;
  },
  [types.REPLACE_SHOW_MODAL_VER_CONSULTAS] (state, { status }) {
    state.showModalVerConsultas = status
  },
  [types.REPLACE_CURRENT_CONSULTA](state, { consulta }) {
    state.currentConsulta = consulta;
  },
};
