<template>
  <v-dialog v-model="showModalDeleteUser" width="480px" persistent lazy scrollable>
    <v-card>
      <v-toolbar color="error" card dark>
        <v-toolbar-title>Eliminar usuario</v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click="replaceShowModalDeleteUser({ status: false })">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p>¿Está seguro de Eliminar los {{ selected.length }} usuarios seleccionados ?</p>
      </v-card-text>
      <v-divider />
      <div class="my-3 text-xs-center">
        <v-btn
          :disabled="processingDelete"
          :loading="processingDelete"
          color="error"
          @click="deleteUsers()"
        >
          Eliminar
        </v-btn>
        <v-btn :disabled="processingDelete" @click="replaceShowModalDeleteUser({ status: false })">
          Cancelar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      processingDelete: false
    };
  },
  props: {
    selected: Array
  },
  computed: {
    ...mapState({
      showModalDeleteUser: state => state.users.showModalDeleteUser,
      currentUsers: state => state.users.currentUsers
    })
  },

  watch: {
    showModalDeleteUser(newValue, oldValue) {
      if (!newValue) {
        this.replaceCurrentUser({ users: null });
        return false;
      }
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalDeleteUser: "users/replaceShowModalDeleteUser",
      replaceCurrentUser: "users/replaceCurrentUser",
      deleteUser: "users/deleteUser",
      getUsers: "users/getUsers"
    }),
    deleteUsers() {
      this.processingDelete = true;
      this.deleteUser({ users: this.selected })
        .then(response => {
          this.processingDelete = false;
          this.replaceShowModalDeleteUser({ status: false });
          this.getUsers();
        })
        .catch(() => {
          this.processingDelete = false;
        });
    }
  }
};
</script>
