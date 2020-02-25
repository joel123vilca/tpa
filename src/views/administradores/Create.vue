<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs
        :routes="[{ name: 'Inicio'}, { name: 'Nuevo administrador' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Crear Administrador</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateAdministrador"
              >
                <v-container fluid grid-list-lg>
                  <v-text-field
                    v-model="form.nombre"
                    :disabled="processingForm"
                    label="Nombres"
                    outline
                    :rules="rules.nombre"
                    :error="!!formErrors.nombre"
                    :error-messages="formErrors.nombre"
                    @keyup="
                      () => {
                        formErrors.nombre = undefined;
                        delete formErrors.nombre;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.username"
                    :disabled="processingForm"
                    label="Usuario"
                    outline
                    :rules="rules.username"
                    :error="!!formErrors.username"
                    :error-messages="formErrors.username"
                    @keyup="
                      () => {
                        formErrors.username = undefined;
                        delete formErrors.username;
                      }
                    "
                  />
                  <v-layout row wrap>
                    <v-flex sm6 xs12>

                  <v-text-field
                    v-model="form.password"
                    :disabled="processingForm"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    label="Contraseña"
                    :type="show1 ? 'text' : 'password'"
                    outline
                    :rules="rules.password"
                    :error="!!formErrors.password"
                    :error-messages="formErrors.password"
                    @keyup="
                      () => {
                        formErrors.password = undefined;
                        delete formErrors.password;
                      }
                    "
                    @click:append="show1 = !show1"
                  />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                        v-model="form.estado"
                        :items="estados"
                        dense
                        outline
                        clearable
                        small-chips
                        label="Seleccionar Estado"
                        item-text="nombre"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.estado"
                        :error-messages="formErrors.estado"
                        @change="
                          () => {
                            formErrors.estado = undefined;
                            delete formErrors.estado;
                          }
                        "
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Guardar
                  </v-btn>
                  <v-btn @click="$router.push({ name: 'listAdministradores' })">
                    Cancelar
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  middleware: 'auth',
  metaInfo() {
    return { title: "Nuevo administrador" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      formErrors: {},
      show1: false,
      form: {
        username: '',
        nombre: '',
        password: '',
        estado: 1,
      },
      estados: [
        {id:0, nombre:'inactivo'},
        {id:1, nombre:'activo'}
      ],
      validForm: true,
      processingForm: false,

      rules: {
        nombre: [v => !!v || "El nombre es requerido"],
        username: [v => !!v || "El usuario es requerido"],
        password: [v => !!v || "La contraseña es requerido"],
        estado: [v => !!v || "El estado es requerido"],
      }
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      createAdministrador: "administradores/createAdministrador",
    }),

    submitCreateAdministrador() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.createAdministrador({ data: this.form })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listAdministradores" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
