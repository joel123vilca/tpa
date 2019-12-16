<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :permanent="primaryDrawer.type === 'permanent'"
    :temporary="primaryDrawer.type === 'temporary'"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    fixed
    app
    class="drawer"
  >
    <img style="height:60px;width:300px;" :src="require('@/assets/logo.png')"/>
     <v-layout row>
    <v-flex xs12 sm12>
        <v-list>
          <v-list-group
            v-for="item in sidebarItems"
            :key="item.name"
            v-model="item.active"
            no-action
          >
            <template v-slot:activator class="scoped-list-tile" color="white">
              <v-list-tile class="scoped-list-tile">
                <v-list-tile-content class="scoped-list-tile">
                  <v-list-tile-title class="white--text">{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.name"
              class="scoped-list-tile"
              :to="subItem.to"
            >
              <v-list-tile-content>
                <v-list-tile-title class="white--text">{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
    </v-flex>
  </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
       items: [
          {
            title: 'Perfil',
            items: [
              { title: 'Datos Generales' },
              { title: 'Desarrollo Organizacional' },
              { title: 'Capacitaciòn' },
            ],
          },
          {
            title: 'Gerencia Personas',
            items: [
              { title: 'Adm. De Personas' },
              { title: 'DO y Capacitaciòn' },
              { title: 'Bienestar' },
              { title: 'Comunicaciones' },
              { title: 'RSE' },
            ],
          },
          {
            title: 'Colaboradores',
            items: [
              { title: 'Ranking TPA' },
            ],
          },
          {
            title: 'Cerrar Sesion',
            items: [
              { title: 'List Item' },
            ],
          }
        ],
    };
  },
  computed: {
    ...mapState({
      primaryDrawer: state => state.layout.primaryDrawer
    }),

    ...mapGetters({
      authenticated: "auth/check",
      user: "auth/user",
      sidebarItems: "layout/sidebarItems"
    })
  },

  methods: {
    ...mapActions({
      replacePrimaryDrawer: "layout/replacePrimaryDrawer",
      logout: "auth/logout"
    }),

    replacePrimaryDrawerMini() {
      let primaryDrawer = this.primaryDrawer;
      primaryDrawer.mini = !primaryDrawer.mini;

      this.replacePrimaryDrawer({ primaryDrawer });
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer{
  background-color: #283848 !important;
  color: white !important;
}
.menu-expand{
  background-color: #283848 !important;
  color: white !important;
}
.scoped-list-tile {
  overflow: hidden !important;

  &:hover {
    color: white !important;
    background: #44b5ba !important;
  }
}
</style>
