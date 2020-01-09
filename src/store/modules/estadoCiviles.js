import * as types from "../mutation-types";
import estadoCivilAPI from "@/api/estadoCivil";

export const state = {
  estadoCiviles: [],
  loadingEstadoCiviles: false
};

export const actions = {
  getEstadoCiviles({ commit }, payload) {
    commit(types.REPLACE_LOADING_ESTADO_CIVILES, { status: true });

    return new Promise((resolve, reject) => {
      estadoCivilAPI
        .get(payload)
        .then(response => {
          const estadoCiviles = response.data.data;

          commit(types.REPLACE_LOADING_ESTADO_CIVILES, { status: false });
          commit(types.REPLACE_ESTADO_CIVILES, { estadoCiviles });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_ESTADO_CIVILES, { status: false });
          reject(error);
        });
    });
  }
};

export const mutations = {
  [types.REPLACE_LOADING_ESTADO_CIVILES](state, { status }) {
    state.loadingEstadoCiviles = status;
  },
  [types.REPLACE_ESTADO_CIVILES](state, { estadoCiviles }) {
    state.estadoCiviles = estadoCiviles;
  }
};
