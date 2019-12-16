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
      items.push(
        {
          name: "Perfil",
          items: [
            {
              name: "Datos Generales",
              to: { name: "perfil" }
            },
            {
              name: "Desarrollo Organizacional",
              to: { name: "sgcUsersList" }
            },
            {
              name: "Capacitacion",
              to: { name: "sgcUsersList" }
            },
          ],
        },
        {
          name: "Gerencia Personas",
          items: [
            {
              name: "Adm. de Personas",
              to: { name: "sgcUsersList" }
            },
            {
              name: "DO y Capacitacion",
              to: { name: "sgcUsersList" }
            },
            {
              name: "Bienestar",
              to: { name: "sgcUsersList" }
            },
            {
              name: "Comunicaciones",
              to: { name: "sgcUsersList" }
            },
            {
              name: "RSE",
              to: { name: "sgcUsersList" }
            },
          ],
        },
        {
          name: "Colaboradores",
          items: [
            {
              name: "Ranking TPA",
              to: { name: "colaboradores" }
            },
          ],
        },
        {
          name: "Cerrar Sesion",
        },
      );

      return items;
    }

    if (rootGetters["auth/userIsAdmin"]) {
      items.push(
        {
          name: "Personal",
          items:[
            {
              name:"Perfil",
              to:{name:"sgcUserList"}
            }
          ]

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
