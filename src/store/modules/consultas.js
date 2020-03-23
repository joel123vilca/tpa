import * as types from "../mutation-types";
import consultaAPI from "@/api/consulta";

export const state = {
  consultas: [],
  loadingConsultas: false
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
  }
};

export const mutations = {
  [types.REPLACE_LOADING_CONSULTAS](state, { status }) {
    state.loadingConsultas = status;
  },
  [types.REPLACE_CONSULTAS](state, { consultas }) {
    state.consultas = consultas;
  }
};
