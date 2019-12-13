import * as types from "../mutation-types";

export const state = {
  dark: false,
  primaryDrawer: {
    model: false,
    type: "default",
    clipped: false,
    floating: false,
    mini: false
  },
  footer: {
    inset: true
  }
};

export const getters = {
  sidebarItems: (state, getters, rootState, rootGetters) => {
    let items = [];

    if (rootGetters["auth/userIsClient"]) {
      items.push({
        name: "Personal",
        to: { name: "sgcUsersList" }
      },
      {
        name:"Perfil",
        to:{name:"sgcUserList"}
      },
      {
        name:"Gerencia Personas",
        to:{name:"sgcUserList"}
      },
      {
        name:"Colaboradores",
        to:{name:"sgcUserList"}
      },
      {
        name:"Cerrar Sesión",
        to:{name:"sgcUserList"}
      }
      );

      return items;
    }

    if (rootGetters["auth/userIsAdmin"]) {
      items.push(
        {
          name: "Personal",
          to: { name: "sgcUsersList" },
        },
        {
          name:"Perfil",
          to:{name:"sgcUserList"}
        }
      );
      return items;
    }

    return items;
  }
};

export const actions = {
  replacePrimaryDrawer({ commit }, payload) {
    commit(types.REPLACE_PRIMARY_DRAWER, payload);
  }
};

export const mutations = {
  [types.REPLACE_PRIMARY_DRAWER](state, { primaryDrawer }) {
    if (primaryDrawer.model) {
      state.primaryDrawer.model = primaryDrawer.model;
    }
    if (primaryDrawer.type) {
      state.primaryDrawer.type = primaryDrawer.type;
    }
    if (primaryDrawer.clipped) {
      state.primaryDrawer.clipped = primaryDrawer.clipped;
    }
    if (primaryDrawer.floating) {
      state.primaryDrawer.floating = primaryDrawer.floating;
    }
    if (primaryDrawer.mini) {
      state.primaryDrawer.mini = primaryDrawer.mini;
    }
  }
};
