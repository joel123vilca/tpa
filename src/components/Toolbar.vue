<template>
  <div>
    <v-toolbar
      v-if="authenticated"
      height="60"
      :clipped-left="primaryDrawer.clipped"
      app
      color="#44b5ba"
      center
      dark
    >
      <v-toolbar-side-icon
        v-if="authenticated"
        @click.stop="replacePrimaryDrawerModel"
      />
      <v-spacer />
      <div style="height:40px;width:100px;" class="mx-auto">         <img style="height:40px;width:auto; border-radius:4px;" :src="require('@/assets/logo.png')"/>       </div>
      <v-spacer />
    </v-toolbar>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {
  },

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
        { header: 'Encuestas' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Encuesta Clima Laboral. (Pendiente)',
          subtitle: "Hace 2 Meses",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Encuesta Colaboradores 2018',
          subtitle: "Hace 2 dias",
        },
        { divider: true, inset: true },
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
.span-notification{
  background: #74ba1a !important;
  color:white;
  width: 110px;
  height: 25px;
  text-align: center;
  align-self: center;
}
</style>
