import * as types from "../mutation-types";
import encuestaAPI from "@/api/encuesta";

export const state = {
  encuestas: [],
  loadingEncuestas: false,
  currentEncuesta: null,
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
};
