import * as types from "../mutation-types";
import nivelEducacionAPI from "@/api/nivelEducacion";

export const state = {
  nivelesEducacion: [],
  loadingNivelesEducacion: false
};

export const actions = {
  getNivelesEducacion({ commit }, payload) {
    commit(types.REPLACE_LOADING_NIVELES_EDUCACION, { status: true });

    return new Promise((resolve, reject) => {
      nivelEducacionAPI
        .get(payload)
        .then(response => {
          const nivelesEducacion = response.data.data;

          commit(types.REPLACE_LOADING_NIVELES_EDUCACION, { status: false });
          commit(types.REPLACE_NIVELES_EDUCACION, { nivelesEducacion });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_NIVELES_EDUCACION, { status: false });
          reject(error);
        });
    });
  }
};

export const mutations = {
  [types.REPLACE_LOADING_NIVELES_EDUCACION](state, { status }) {
    state.loadingNivelesEducacion = status;
  },
  [types.REPLACE_NIVELES_EDUCACION](state, { nivelesEducacion }) {
    state.nivelesEducacion = nivelesEducacion;
  }
};
