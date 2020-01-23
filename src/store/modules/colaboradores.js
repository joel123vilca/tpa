import * as types from "../mutation-types";
import colaboradorAPI from "@/api/colaborador";

export const state = {
  colaboradores: [],
  loadingColaboradores: false,
  currentColaborador: null,
  tiposCarga: [],
  loadingTiposCarga: false,
  cargaFamiliar: [],
  loadingCargaFamiliar: false,
  movilidades: [],
  loadingMovilidades: false,
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
  },
  postFamily({ commit }, payload) {
    return new Promise((resolve, reject) => {
      colaboradorAPI
        .postFamily(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Colaborador",
            message: "Se agrego Carga Familiar con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  postMovilidad({ commit }, payload) {
    return new Promise((resolve, reject) => {
      colaboradorAPI
        .postMovilidad(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Colaborador Movilidad",
            message: "Se hizo Movilidad con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  replaceCurrentColaborador({ commit }, payload) {
    commit(types.REPLACE_CURRENT_COLABORADOR, payload);
  },
  getColaborador({ commit }, payload) {
    return new Promise((resolve, reject) => {
      colaboradorAPI
        .getById(payload)
        .then(response => {
          const colaborador = response.data.data;
          commit(types.REPLACE_CURRENT_COLABORADOR, { colaborador });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateColaborador({ commit }, payload) {
    return new Promise((resolve, reject) => {
      colaboradorAPI
        .put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Colaborador",
            message: "El colaborador ha sido actualizado con éxito."
          });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFamily({ commit }, payload) {
    commit(types.REPLACE_LOADING_CARGA_FAMILIAR, { status: true });

    return new Promise((resolve, reject) => {
      colaboradorAPI
        .getFamily(payload)
        .then(response => {
          const cargaFamiliar = response.data.data
          commit(types.REPLACE_LOADING_CARGA_FAMILIAR, { status: false });
          commit(types.REPLACE_CARGA_FAMILIAR, { cargaFamiliar });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CARGA_FAMILIAR, { status: false });
          reject(error);
        });
    });
  },
  getMovilidad({ commit }, payload) {
    commit(types.REPLACE_LOADING_MOVILIDADES, { status: true });

    return new Promise((resolve, reject) => {
      colaboradorAPI
        .getMovilidad(payload)
        .then(response => {
          const movilidades = response.data.data
          commit(types.REPLACE_LOADING_MOVILIDADES, { status: false });
          commit(types.REPLACE_MOVILIDADES, { movilidades });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_MOVILIDADES, { status: false });
          reject(error);
        });
    });
  },
  getTiposCarga({ commit }, payload) {
    commit(types.REPLACE_LOADING_TIPOS_CARGA, { status: true });

    return new Promise((resolve, reject) => {
      colaboradorAPI
        .getCarga(payload)
        .then(response => {
          const tiposCarga = response.data.data
          commit(types.REPLACE_LOADING_TIPOS_CARGA, { status: false });
          commit(types.REPLACE_TIPOS_CARGA, { tiposCarga });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TIPOS_CARGA, { status: false });
          reject(error);
        });
    });
  },
}

export const mutations = {
  [types.REPLACE_LOADING_COLABORADORES](state, { status }) {
    state.loadingColaboradores = status;
  },
  [types.REPLACE_COLABORADORES](state, { colaboradores }) {
    state.colaboradores = colaboradores;
  },
  [types.REPLACE_CURRENT_COLABORADOR](state, { colaborador }) {
    state.currentColaborador = colaborador;
  },
  [types.REPLACE_LOADING_CARGA_FAMILIAR](state, { status }) {
    state.loadingCargaFamiliar = status;
  },
  [types.REPLACE_CARGA_FAMILIAR](state, { cargaFamiliar }) {
    state.cargaFamiliar = cargaFamiliar;
  },
  [types.REPLACE_LOADING_TIPOS_CARGA](state, { status }) {
    state.loadingTiposCarga = status;
  },
  [types.REPLACE_TIPOS_CARGA](state, { tiposCarga }) {
    state.tiposCarga = tiposCarga;
  },
  [types.REPLACE_LOADING_MOVILIDADES](state, { status }) {
    state.loadingMovilidades = status;
  },
  [types.REPLACE_MOVILIDADES](state, { movilidades }) {
    state.movilidades = movilidades;
  },
};
