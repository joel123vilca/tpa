import * as types from "../mutation-types";
import tagAPI from "@/api/tag";

export const state = {
  tags: [],
  loadingTags: false
};

export const actions = {
  getTags({ commit }, payload) {
    commit(types.REPLACE_LOADING_TAGS, { status: true });

    return new Promise((resolve, reject) => {
      tagAPI
        .get(payload)
        .then(response => {
          const tags = response.data.data
          commit(types.REPLACE_LOADING_TAGS, { status: false });
          commit(types.REPLACE_TAGS, { tags });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TAGS, { status: false });
          reject(error);
        });
    });
  }
};

export const mutations = {
  [types.REPLACE_LOADING_TAGS](state, { status }) {
    state.loadingTags = status;
  },
  [types.REPLACE_TAGS](state, { tags }) {
    state.tags = tags;
  }
};
