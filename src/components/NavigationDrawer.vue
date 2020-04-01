<template>
  <v-navigation-drawer
    v-if="authenticated"
    v-model="primaryDrawer.model"
    :permanent="primaryDrawer.type === 'permanent'"
    :temporary="primaryDrawer.type === 'temporary'"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    fixed
    app
    dark
    class="drawer"
    style="background-color: #337ab7; color: white"
  >
  <div  style="background-color: white; color:#44b5ba; height: 60px; font-weight: 600; padding:25px; letter-spacing: 1px; font-size:16px;">Panel Administrador</div>
        <v-list>
          <template>
        <v-list-tile
          v-for="(item) in items"
          :key="item.title"
          exact
          ripple
          active-class="accent"
          class="scoped-list-tile mb-1"
          :to="item.to"
          :disabled="!item.to"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

          <template>
          <v-list-tile
               exact
              ripple
              active-class="accent"
              class="scoped-list-tile mb-1"
              @click="logout({ router: $router })"
            >
          <v-list-tile-action @click="logout({ router: $router })">
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Cerrar sesión</v-list-tile-content>
        </v-list-tile>
          </template>
        </v-list>
  </v-navigation-drawer>
</template>


<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      items: [
        {
          title: 'Colaboradores',
          icon: 'people',
          to: { name: "listacolaboradores" }
        },
        {
          title: 'Tag / Etiquetas',
          icon: 'dehaze',
          to: { name: "listatags" }
        },
        {
          title: 'Nivel Jerárquico',
          icon: 'share',
          to: { name: "listaniveljerarquico" },
        },
        {
          title: 'Areas',
          icon: 'web',
          to: { name: "listaArea" }
        },
        {
          title: 'Cargos',
          icon: 'folder_shared',
          to: { name: "listacargo" }
        },
        {
          title: 'Cursos / Capacitaciones',
          icon: 'book',
          to: { name: "ListCourse" }
        },
        {
          title: 'Notificaciones',
          icon: 'notifications',
          to: { name: "listaNotificaciones" }
        },
        {
          title: 'Consultas',
          icon: 'email',
          to: { name: "Consultas" }
        },
        {
          title: 'Administradores',
          icon: 'portrait',
          to: { name: "listAdministradores" }
        },
      ],
    };
  },
  computed: {
    ...mapState({
      primaryDrawer: state => state.layout.primaryDrawer,
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
  background-color: #337ab7 !important;
  color: white !important;
}
.scoped-list-tile {
  overflow: hidden !important;
}
.scoped-list-tile:hover {
    color: white !important;
    background: #44b5ba !important;
  }
</style>
