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
    class="drawer"
    dark
  >

    <div  style="background-color: white; color:#44b5ba; height: 60px; font-weight: 600; padding:25px; letter-spacing: 1px; font-size:16px;">Panel Administrador</div>
     <v-layout row>
    <v-flex xs12 sm12>
        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            no-action
          >
            <template v-slot:activator class="scoped-list-tile" color="white">
              <v-list-tile class="scoped-list-tile">
                <v-list-tile-content class="scoped-list-tile">
                  <v-list-tile-title class="white--text">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              class="scoped-list-tile"
              :to="subItem.to"
            >
              <v-list-tile-content>
                <v-list-tile-title class="white--text">- {{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
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
            title: 'Colaboradores',
            items: [
              { title: 'Agregar Nuevo', to: { name: "crearcolaborador" } },
              { title: 'Listar Todos', to: { name: "listacolaboradores" } },
            ],
          },
          {
            title: 'Reportes',
            items: [
              { title: 'Adm. De Personas' ,
              to: { name: "listacolaboradores" }},
              { title: 'DO y Capacitaciòn' },
              { title: 'Bienestar' },
              { title: 'Comunicaciones' },
              { title: 'RSE' },
            ],
          },
          {
            title: 'Tag / Etiquetas',
            items: [
              { title: 'Agregar Nuevo', to: { name: "creartags" } },
              { title: 'Listar Todas', to: { name: "listatags" } },

            ],
          },
          {
            title: 'Nivel Jerárquico',
            items: [
              { title: 'Agregar Nuevo', to: { name: "creaniveljerarquico" } },
              { title: 'Listar Todas', to: { name: "listaniveljerarquico" } },
            ],
          },
          {
            title: 'Areas',
            items: [
              { title: 'Agregar Nuevo', to: { name: "crearArea" } },
              { title: 'Listar Todas', to: { name: "listaArea" } },
            ],
          },
          {
            title: 'Cargos',
            items: [
              { title: 'Agregar Nuevo', to: { name: "crearcargo" } },
              { title: 'Listar Todas', to: { name: "listacargo" } },
            ],
          },
          {
            title: 'Cursos / Capacitaciones',
            items: [
              { title: 'Agregar Nuevo', to: { name: "crearCurso" } },
              { title: 'Listar Todas', to: { name: "ListCourse" }},
              { title: 'Asignar curso', to: { name: "asignar" }},
            ],
          },
          {
            title: 'Configuraciones',
            items: [
              { title: 'Agregar Nuevo' },
              { title: 'Listar Todas' },
            ],
          },
          {
            title: 'Administradores',
            items: [
              { title: 'Agregar Nuevo', to: { name: "creaAdministrador" } },
              { title: 'Listar Todas', to: { name: "listAdministradores" } },
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
  background-color: #337ab7 !important;
  color: white !important;
}
.menu-expand{
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
