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
    <img style="height:65px;width:300px;" :src="require('@/assets/logo.png')"/>
    <v-list v-if="authenticated" class="mb-4">
      <v-list-tile
        v-if="primaryDrawer.mini"
        color="yellow"
        class="pa-0"
        @click.stop="replacePrimaryDrawerMini"
      >
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0">
      <template v-if="user">
        <v-list-tile
          v-for="(item, i) in sidebarItems"
          :key="i"
          exact
          ripple
          active-class="accent"
          class="scoped-list-tile mb-1"
          :to="item.to"
          :disabled="!item.to"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
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
.scoped-list-tile {
  overflow: hidden !important;

  &:hover {
    color: white !important;
    background: #44b5ba !important;
  }
}
</style>
