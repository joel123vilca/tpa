<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!$can('list', 'Users')" />
    <template v-else>
      <v-card-title class="white cyan--text headline">
        Mi Perfil
        <v-spacer />
        <v-spacer />
        <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'sgcUsersList' } },
          { name: 'Mi Perfil' },
          { name: 'Datos Generales' }
        ]"
      />
      </v-card-title>
      <div class="text-center">
        <button
          class="list-buttons"
        >
          <h3 class="title-button">
            Datos Generales
          </h3>
        </button>
        <button
          class="list-buttons"
        >
          <h3 class="title-button">
            Desarrollo
            Organizacional
          </h3>
        </button>
        <button
          class="list-buttons"
        >
          <h3 class="title-button">
            Capacitación
          </h3>
        </button>
        <button
          class="list-buttons"
        >
          <h3 class="title-button">
            Hoja de vida
          </h3>
        </button>
      </div>
      <v-card>
        <v-toolbar color="grey darken-4" dark card>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-spacer />
          <v-btn :to="{ name: 'sgcUsersCreate' }" color="success">
            Agregar Usuario
          </v-btn>
        </v-toolbar>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex sm6>
              <v-btn
                v-if="selected.length > 0"
                small
                color="error"
                dark
                @click="openModalDeleteUser(selected)"
                >Eliminar Seleccionados</v-btn
              >
            </v-flex>
            <v-flex v-if="users.length" sm6>
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingUsers"
                box
                append-icon="search"
                label="Buscar"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                v-model="selected"
                :headers="[
                  { text: '', value: '' },
                  { text: 'Nombres', value: 'name' },
                  { text: 'Correo electrónico', value: 'email' },
                  { text: 'Tipo', value: 'typeUser' },
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :single-select="singleSelect"
                :items="users"
                :search="searchUsers"
                :loading="loadingUsers"
                item-key="id"
                show-select
                class="elevation-1"
              >
                <tr slot="items" slot-scope="props">
                  <td class="px-3">
                    <v-checkbox v-model="selected" :value="props.item.id"></v-checkbox>
                  </td>
                  <td class="px-3">
                    {{ props.item.name }}
                  </td>
                  <td class="px-3">
                    {{ props.item.email }}
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.typeUser.name === 'Administrador'"
                      small
                      color="primary"
                      text-color="white"
                    >
                      {{ props.item.typeUser.name }}
                    </v-chip>
                    <v-chip v-else-if="props.item.typeUser.name === 'Usuario'" small>
                      {{ props.item.typeUser.name }}
                    </v-chip>
                  </td>
                  <td class="text-xs-center px-3">
                    <template v-if="$can('update', 'Users')">
                      <v-btn
                        class="ma-0"
                        :to="{ name: 'sgcUsersEdit', params: { id: props.item.id } }"
                        small
                        icon
                        flat
                        color="info"
                      >
                        <v-icon small>
                          edit
                        </v-icon>
                      </v-btn>
                    </template>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <ModalDeleteUser :selected="selected" />
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  middleware: "auth",
  metaInfo() {
    return { title: "Listado de Usuarios" };
  },

  components: {
    NotPermission: () => import("@/views/errors/NotPermission"),
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    ModalDeleteUser: () => import("@/views/users/ModalDeleteUser")
  },

  data() {
    return {
      searchUsers: "",
      singleSelect: false,
      selected: [],
    };
  },

  computed: {
    ...mapState({
      users: state => state.users.users,
      loadingUsers: state => state.users.loadingUsers
    })
  },

  watch: {},

  created() {
    if (!this.$can("list", "Users")) return false;
    this.getUsers();
  },

  methods: {
    ...mapActions({
      getUsers: "users/getUsers",
      replaceShowModalDeleteUser: "users/replaceShowModalDeleteUser",
      replaceCurrentUser: 'users/replaceCurrentUser',
      deleteUser: 'users/deleteUser',
      replaceUsers: 'users/replaceUsers',
    }),

    openModalDeleteUser() {
      this.replaceShowModalDeleteUser({ status: true});
    },
  },
};
</script>
<style scoped>
.list-buttons{
  color:white;
  background: #283848;
  line-height: 1.1;
  text-align: center;
  font-size: 20px;
  padding: 8px 0 0 10px;
  vertical-align: middle;
  width: 230px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 25px;
}
.title-button{
  font-family: inherit;
}
.list-buttons:hover {
    color: white !important;
    background: #44b5ba !important;
  }
</style>
