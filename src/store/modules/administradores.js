import * as types from "../mutation-types";
import administradorAPI from "@/api/administrador";

export const state = {
  administradores: [],
  loadingAdministradores: false,
  currentAdministrador: null,
};

export const actions = {
  getAdministradores({ commit }, payload) {
    commit(types.REPLACE_LOADING_ADMINISTRADORES, { status: true });
    return new Promise((resolve, reject) => {
      administradorAPI
        .get(payload)
        .then(response => {
          const administradores = response.data.data;

          commit(types.REPLACE_LOADING_ADMINISTRADORES, { status: false });
          commit(types.REPLACE_ADMINISTRADORES, { administradores });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_ADMINISTRADORES, { status: false });
          reject(error);
        });
    });
  },

  getAdministrador({ commit }, payload) {
    return new Promise((resolve, reject) => {
      administradorAPI
        .getById(payload)
        .then(response => {
          const administrador = response.data.data;

          commit(types.REPLACE_CURRENT_ADMINISTRADOR, { administrador });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  replaceCurrentAdministrador({ commit }, payload) {
    commit(types.REPLACE_CURRENT_ADMINISTRADOR, payload);
  },
  updateAdministrador({ commit }, payload) {
    return new Promise((resolve, reject) => {
      administradorAPI
        .put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "TPA",
            message: "El administrador ha sido actualizado con éxito."
          });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  createAdministrador({ commit }, payload) {
    return new Promise((resolve, reject) => {
      administradorAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "TPA",
            message: "El administrador ha sido creado con éxito."
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
  [types.REPLACE_LOADING_ADMINISTRADORES](state, { status }) {
    state.loadingAdministradores = status;
  },
  [types.REPLACE_ADMINISTRADORES](state, { administradores }) {
    state.administradores = administradores;
  },
  [types.REPLACE_CURRENT_ADMINISTRADOR](state, { administrador }) {
    state.currentAdministrador = administrador;
  },
};
