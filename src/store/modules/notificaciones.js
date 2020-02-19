import * as types from "../mutation-types";
import notificacionAPI from "@/api/notificacion";

export const state = {
  notificaciones: [],
  loadingNotificaciones: false,
};

export const actions = {
  getNotificaciones({ commit }, payload) {
    commit(types.REPLACE_LOADING_NOTIFICACIONES, { status: true });
    return new Promise((resolve, reject) => {
      notificacionAPI
        .get(payload)
        .then(response => {
          const notificaciones = response.data.data;

          commit(types.REPLACE_LOADING_NOTIFICACIONES, { status: false });
          commit(types.REPLACE_NOTIFICACIONES, { notificaciones });

          resolve(response);
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_NOTIFICACIONES, { status: false });
          reject(error);
        });
    });
  },
}

export const mutations = {
  [types.REPLACE_LOADING_NOTIFICACIONES](state, { status }) {
    state.loadingNotificaciones = status;
  },
  [types.REPLACE_NOTIFICACIONES](state, { notificaciones }) {
    state.notificaciones = notificaciones;
  },
}
