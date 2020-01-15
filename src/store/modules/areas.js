import * as types from "../mutation-types";
import areaAPI from "@/api/area";

export const state = {
  areas: [],
  loadingAreas: false,
  currentArea: null,
  showModalDeleteArea: false,
};

export const actions = {
  getAreas({ commit }, payload) {
    commit(types.REPLACE_LOADING_AREAS, { status: true });
    return new Promise((resolve, reject) => {
      areaAPI
        .get(payload)
        .then(response => {
          const areas = response.data.data;
          commit(types.REPLACE_LOADING_AREAS, { status: false });
          commit(types.REPLACE_AREAS, { areas });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_AREAS, { status: false });
          reject(error);
        });
    });
  },

  getArea({ commit }, payload) {
    return new Promise((resolve, reject) => {
      areaAPI
        .getById(payload)
        .then(response => {
          const area = response.data.data;

          commit(types.REPLACE_CURRENT_AREA, { area });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteArea({ commit }, payload) {
    return new Promise((resolve, reject) => {
      areaAPI
        .delete(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Area",
            message: "El Area han sido eliminado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  replaceCurrentArea({ commit }, payload) {
    commit(types.REPLACE_CURRENT_AREA, payload);
  },
  replaceShowModalDeleteArea({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_AREA, payload);
  },
  updateArea({ commit }, payload) {
    return new Promise((resolve, reject) => {
      areaAPI
        .put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Area",
            message: "El Area ha sido actualizado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  createArea({ commit }, payload) {
    return new Promise((resolve, reject) => {
      areaAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Area",
            message: "El Area ha sido creado con éxito."
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
  [types.REPLACE_LOADING_AREAS](state, { status }) {
    state.loadingAreas = status;
  },
  [types.REPLACE_AREAS](state, { areas }) {
    state.areas = areas;
  },
  [types.REPLACE_CURRENT_AREA](state, { area }) {
    state.currentArea = area;
  },
  [types.REPLACE_SHOW_MODAL_DELETE_AREA](state, { status }) {
    state.showModalDeleteArea = status;
  }
};
