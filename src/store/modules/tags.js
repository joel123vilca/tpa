import * as types from "../mutation-types";
import tagAPI from "@/api/tag";

export const state = {
  tags: [],
  loadingTags: false,
  currentTag: null,
  showModalDeleteTag: false,
};

export const actions = {
  getTags({ commit }, payload) {
    commit(types.REPLACE_LOADING_TAGS, { status: true });
    return new Promise((resolve, reject) => {
      tagAPI
        .get(payload)
        .then(response => {
          const tags = response.data.data;
          commit(types.REPLACE_LOADING_TAGS, { status: false });
          commit(types.REPLACE_TAGS, { tags });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TAGS, { status: false });
          reject(error);
        });
    });
  },

  getTag({ commit }, payload) {
    return new Promise((resolve, reject) => {
      tagAPI
        .getById(payload)
        .then(response => {
          const tag = response.data.data;

          commit(types.REPLACE_CURRENT_TAG, { tag });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteTag({ commit }, payload) {
    return new Promise((resolve, reject) => {
      tagAPI
        .delete(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Tag",
            message: "El Tag han sido eliminado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  replaceCurrentTag({ commit }, payload) {
    commit(types.REPLACE_CURRENT_TAG, payload);
  },
  replaceShowModalDeleteTag({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_TAG, payload);
  },
  updateTag({ commit }, payload) {
    return new Promise((resolve, reject) => {
      tagAPI
        .put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "Tag",
            message: "El tag ha sido actualizado con éxito."
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  createTag({ commit }, payload) {
    return new Promise((resolve, reject) => {
      tagAPI
        .post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: "TAG",
            message: "El tag ha sido creado con éxito."
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
  [types.REPLACE_LOADING_TAGS](state, { status }) {
    state.loadingTags = status;
  },
  [types.REPLACE_TAGS](state, { tags }) {
    state.tags = tags;
  },
  [types.REPLACE_CURRENT_TAG](state, { tag }) {
    state.currentTag = tag;
  },
  [types.REPLACE_SHOW_MODAL_DELETE_TAG](state, { status }) {
    state.showModalDeleteTag = status;
  }
};
