import * as types from "../mutation-types";
import cargoAPI from "@/api/cargo";

export const state = {
  cargos: [],
  loadingCargos: false,
  currentCargo: null,
  showModalDeleteCargo: false,
};

export const actions = {
  getCargos({ commit }, payload) {
    commit(types.REPLACE_LOADING_CARGOS, { status: true });
    return new Promise((resolve, reject) => {
      cargoAPI
        .get(payload)
        .then(response => {
          const cargos = response.data.data;
          commit(types.REPLACE_LOADING_CARGOS, { status: false });
          commit(types.REPLACE_CARGOS, { cargos });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CARGOS, { status: false });
          reject(error);
        });
    });
  },

  getCargo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      cargoAPI
        .getById(payload)
        .then(response => {
          const cargo = response.data.data;

          commit(types.REPLACE_CURRENT_CARGO, { cargo });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteCargo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      cargoAPI
        .delete(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Cargo",
            message: "El Cargo han sido eliminado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  replaceCurrentCargo({ commit }, payload) {
    commit(types.REPLACE_CURRENT_CARGO, payload);
  },
  replaceShowModalDeleteCargo({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_CARGO, payload);
  },
  updateCargo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      cargoAPI
        .put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Cargo",
            message: "El Cargo ha sido actualizado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  createCargo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      cargoAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Cargo",
            message: "El Cargo ha sido creado con éxito."
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
  [types.REPLACE_LOADING_CARGOS](state, { status }) {
    state.loadingCargos = status;
  },
  [types.REPLACE_CARGOS](state, { cargos }) {
    state.cargos = cargos;
  },
  [types.REPLACE_CURRENT_CARGO](state, { cargo }) {
    state.currentCargo = cargo;
  },
  [types.REPLACE_SHOW_MODAL_DELETE_CARGO](state, { status }) {
    state.showModalDeleteCargo = status;
  }
};
