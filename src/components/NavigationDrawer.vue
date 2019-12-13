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
          active-class="#44b5ba"
          class="scoped-list-tile mb-1"
          :to="item.to"
          :disabled="!item.to"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
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
            action: 'local_activity',
            title: 'Attractions',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'restaurant',
            title: 'Dining',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
            ],
          },
          {
            action: 'school',
            title: 'Education',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'directions_run',
            title: 'Family',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'healing',
            title: 'Health',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'content_cut',
            title: 'Office',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'local_offer',
            title: 'Promotions',
            items: [
              { title: 'List Item' },
            ],
          },
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
.scoped-list-tile {
  overflow: hidden !important;

  &:hover {
    color: white !important;
    background: #44b5ba !important;
  }
}
</style>
