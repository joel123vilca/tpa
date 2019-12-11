<template>
  <div>
    <v-toolbar
      v-if="authenticated"
      height="54"
      :clipped-left="primaryDrawer.clipped"
      app
      class="toolbar"
      center
    >
      <v-toolbar-side-icon
        v-if="authenticated && primaryDrawer.type !== 'permanent'"
        @click.stop="replacePrimaryDrawerModel"
      />

      <v-spacer />
      <v-spacer />
        <template v-if="authenticated">
           <v-menu
          bottom
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/users"
          >
            <v-badge
              color="success"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">add_alert</v-icon>
            </v-badge>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
          <v-menu offset-y>
      <template v-slot:activator="{ on }">
          <v-avatar size="36px" v-on="on">
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
      </template>
      <v-list>
        <v-list-tile
          v-if="authenticated"
          exact
          ripple
          active-class="accent"
          class="scoped-list-tile mb-1"
        >
          <v-list-tile-content>Perfil</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="authenticated"
          exact
          ripple
          active-class="accent"
          class="scoped-list-tile mb-1"
          @click="logout({ router: $router })"
        >
          <v-list-tile-content>Cerrar sesión</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
        </template>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {},

  data() {
    return {
      notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
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
      userIsClient: "auth/userIsClient"
    })
  },

  methods: {
    ...mapActions({
      replacePrimaryDrawer: "layout/replacePrimaryDrawer",
      logout: "auth/logout"
    }),

    replacePrimaryDrawerModel() {
      let primaryDrawer = this.primaryDrawer;
      primaryDrawer.model = !primaryDrawer.model;

      this.replacePrimaryDrawer({ primaryDrawer });
    }
  }
};
</script>

<style scoped lang="scss">
.toolbar{
  background-color: #44b5ba;
}
.scoped-toolbar-title {
  display: flex;
  filter: opacity(70%);
  align-items: center;
  padding-right: 1.4rem;
}

.scoped-toolbar-items {
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;

  .scoped-toolbar-item {
    height: 100% !important;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-weight: 100;
    text-transform: capitalize;
    font-size: 1.25rem;

    &:hover::before {
      background-color: transparent !important;
      // background: lighten(black, 1%) !important;
    }

    &.hover:hover {
      border-radius: 6px;
      background: #74ba1a !important;
      color: white;
    }
  }
}

.scoped-btn-active {
  background: #74ba1a !important;
}
</style>
