import * as types from "../mutation-types";
import colaboradorAPI from "@/api/colaborador";

export const state = {
  colaboradores: [],
  loadingColaboradores: false
};
export const actions = {
  createColaborador({ commit }, payload) {
    return new Promise((resolve, reject) => {
      colaboradorAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "COLABORADOR",
            message: "El colaborador ha sido creado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getColaboradores({ commit }, payload) {
    commit(types.REPLACE_LOADING_COLABORADORES, { status: true });

    return new Promise((resolve, reject) => {
      colaboradorAPI
        .get(payload)
        .then(response => {
          const colaboradores = response.data.data
          console.log(colaboradores);
          commit(types.REPLACE_LOADING_COLABORADORES, { status: false });
          commit(types.REPLACE_COLABORADORES, { colaboradores });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_COLABORADORES, { status: false });
          reject(error);
        });
    });
  }
}

export const mutations = {
  [types.REPLACE_LOADING_COLABORADORES](state, { status }) {
    state.loadingColaboradores = status;
  },
  [types.REPLACE_COLABORADORES](state, { colaboradores }) {
    state.colaboradores = colaboradores;
  }
};
