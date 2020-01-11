import * as types from "../mutation-types";
import nivelJerarquicoAPI from "@/api/nivelJerarquico";

export const state = {
  nivelesJerarquico: [],
  loadingNivelesJerarquico: false,
  currentNivelJerarquico: null,
  showModalDeleteNivelJerarquico: false,
};

export const actions = {
  getNivelesJerarquico({ commit }, payload) {
    commit(types.REPLACE_LOADING_NIVELES_JERARQUICO, { status: true });
    return new Promise((resolve, reject) => {
      nivelJerarquicoAPI
        .get(payload)
        .then(response => {
          const nivelesJerarquico = response.data.data;
          commit(types.REPLACE_LOADING_NIVELES_JERARQUICO, { status: false });
          commit(types.REPLACE_NIVELES_JERARQUICO, { nivelesJerarquico });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_NIVELES_JERARQUICO, { status: false });
          reject(error);
        });
    });
  },

  getNivelJerarquico({ commit }, payload) {
    return new Promise((resolve, reject) => {
      nivelJerarquicoAPI
        .getById(payload)
        .then(response => {
          const nivelJerarquico = response.data.data;

          commit(types.REPLACE_CURRENT_NIVEL_JERARQUICO, { nivelJerarquico });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteNivelJerarquico({ commit }, payload) {
    return new Promise((resolve, reject) => {
      nivelJerarquicoAPI
        .delete(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Curso",
            message: "El curso han sido eliminado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  replaceCurrentNivelJerarquico({ commit }, payload) {
    commit(types.REPLACE_CURRENT_NIVEL_JERARQUICO, payload);
  },
  replaceShowModalDeleteNivelJerarquico({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_NIVEL_JERARQUICO, payload);
  },
  updateNivelJerarquico({ commit }, payload) {
    return new Promise((resolve, reject) => {
      nivelJerarquicoAPI
        .put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "NIVEL JERARQUICO",
            message: "El nivel jerarquico ha sido actualizado con éxito."
          });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  createNivelJerarquico({ commit }, payload) {
    return new Promise((resolve, reject) => {
      nivelJerarquicoAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "NIVEL JERARQUICO",
            message: "El nivel jerarquico ha sido creado con éxito."
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
  [types.REPLACE_LOADING_NIVELES_JERARQUICO](state, { status }) {
    state.loadingNivelesJerarquico = status;
  },
  [types.REPLACE_NIVELES_JERARQUICO](state, { nivelesJerarquico }) {
    state.nivelesJerarquico = nivelesJerarquico;
  },
  [types.REPLACE_CURRENT_NIVEL_JERARQUICO](state, { nivelJerarquico }) {
    state.currentNivelJerarquico = nivelJerarquico;
  },
  [types.REPLACE_SHOW_MODAL_DELETE_NIVEL_JERARQUICO](state, { status }) {
    state.showModalDeleteNivelJerarquico = status;
  }
};

