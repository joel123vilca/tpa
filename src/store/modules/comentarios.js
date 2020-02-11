import * as types from "../mutation-types";
import comentarioAPI from "@/api/comentario";

export const state = {
  comentarios: [],
  loadingComentarios: false,
  currentComentario: null,
  showModalDeleteComentario: false,
  tipoComentarios: [],
  loadingTipoComentarios: false,
};

export const actions = {
  getComentarios({ commit }, payload) {
    commit(types.REPLACE_LOADING_COMENTARIOS, { status: true });
    return new Promise((resolve, reject) => {
      comentarioAPI
        .get(payload)
        .then(response => {
          const comentarios = response.data.data;
          commit(types.REPLACE_LOADING_COMENTARIOS, { status: false });
          commit(types.REPLACE_COMENTARIOS, { comentarios });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_COMENTARIOS, { status: false });
          reject(error);
        });
    });
  },
  getTipoComentarios({ commit }, payload) {
    commit(types.REPLACE_LOADING_TIPO_COMENTARIOS, { status: true });
    return new Promise((resolve, reject) => {
      comentarioAPI
        .getTipoComentarios(payload)
        .then(response => {
          const tipoComentarios = response.data.data;
          commit(types.REPLACE_LOADING_TIPO_COMENTARIOS, { status: false });
          commit(types.REPLACE_TIPO_COMENTARIOS, { tipoComentarios });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TIPO_COMENTARIOS, { status: false });
          reject(error);
        });
    });
  },

  getComentario({ commit }, payload) {
    return new Promise((resolve, reject) => {
      comentarioAPI
        .getById(payload)
        .then(response => {
          const comentario = response.data.data;

          commit(types.REPLACE_CURRENT_COMENTARIO, { comentario });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteComentario({ commit }, payload) {
    return new Promise((resolve, reject) => {
      comentarioAPI
        .delete(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "TPA",
            message: "El comentario han sido eliminado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  replaceCurrentComentario({ commit }, payload) {
    commit(types.REPLACE_CURRENT_COMENTARIO, payload);
  },
  replaceShowModalDeleteComentario({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_COMENTARIO, payload);
  },
  updateComentario({ commit }, payload) {
    return new Promise((resolve, reject) => {
      comentarioAPI
        .put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "TPA",
            message: "El comentario ha sido actualizado con éxito."
          });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  createComentario({ commit }, payload) {
    return new Promise((resolve, reject) => {
      comentarioAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "TPA",
            message: "El comentario ha sido creado con éxito."
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
  [types.REPLACE_LOADING_COMENTARIOS](state, { status }) {
    state.loadingComentarios = status;
  },
  [types.REPLACE_COMENTARIOS](state, { comentarios }) {
    state.comentarios = comentarios;
  },
  [types.REPLACE_CURRENT_COMENTARIO](state, { comentario }) {
    state.currentComentario = comentario;
  },
  [types.REPLACE_SHOW_MODAL_DELETE_COMENTARIO](state, { status }) {
    state.showModalDeleteComentario = status;
  },
  [types.REPLACE_LOADING_TIPO_COMENTARIOS](state, { status }) {
    state.loadingTipoComentarios = status;
  },
  [types.REPLACE_TIPO_COMENTARIOS](state, { tipoComentarios }) {
    state.tipoComentarios = tipoComentarios;
  },
};

