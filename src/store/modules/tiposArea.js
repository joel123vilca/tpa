import * as types from "../mutation-types";
import tiposAreaAPI from "@/api/tiposArea";

export const state = {
  tiposArea: [],
  loadingTiposArea: false,
  currentTipoArea: null,
  showModalDeleteTipoArea: false,
};

export const actions = {
  getTiposArea({ commit }, payload) {
    commit(types.REPLACE_LOADING_TIPOS_AREA, { status: true });
    return new Promise((resolve, reject) => {
      tiposAreaAPI
        .get(payload)
        .then(response => {
          const tiposArea = response.data.data;
          commit(types.REPLACE_LOADING_TIPOS_AREA, { status: false });
          commit(types.REPLACE_TIPOS_AREA, { tiposArea });
          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TIPOS_AREA, { status: false });
          reject(error);
        });
    });
  },

  getTipoArea({ commit }, payload) {
    return new Promise((resolve, reject) => {
      tiposAreaAPI
        .getById(payload)
        .then(response => {
          const tipoArea = response.data.data;

          commit(types.REPLACE_CURRENT_TIPO_AREA, { tipoArea });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteTipoArea({ commit }, payload) {
    return new Promise((resolve, reject) => {
      tiposAreaAPI
        .delete(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Tipo Area",
            message: "El Tipo Area han sido eliminado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  replaceCurrentTipoArea({ commit }, payload) {
    commit(types.REPLACE_CURRENT_TIPO_AREA, payload);
  },
  replaceShowModalDeleteTipoArea({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_TIPO_AREA, payload);
  },
  updateTipoArea({ commit }, payload) {
    return new Promise((resolve, reject) => {
      tiposAreaAPI
        .put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Tipos Area",
            message: "El Tipos Area ha sido actualizado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  createTipoArea({ commit }, payload) {
    return new Promise((resolve, reject) => {
      tiposAreaAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Tipos Area",
            message: "El Tipos Area ha sido creado con éxito."
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
  [types.REPLACE_LOADING_TIPOS_AREA](state, { status }) {
    state.loadingTiposArea = status;
  },
  [types.REPLACE_TIPOS_AREA](state, { tiposArea }) {
    state.tiposArea = tiposArea;
  },
  [types.REPLACE_CURRENT_TIPO_AREA](state, { tipoArea }) {
    state.currentTipoArea = tipoArea;
  },
  [types.REPLACE_SHOW_MODAL_DELETE_TIPO_AREA](state, { status }) {
    state.showModalDeleteTipoArea = status;
  }
};
