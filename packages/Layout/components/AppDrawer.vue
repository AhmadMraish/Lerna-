<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    id="appDrawer"
    fixed
    app
    v-model="drawer"
    width="260"
  >
    <v-toolbar class="drawer-color" height="125%" style=" background-color: #009688!important;">
      <img  class= "logo" src="../static/Wish-Emblem.png" height="60" width="80" alt="Agents On Cloud" />
      <v-toolbar-title class="ml-0 pl-3">
        <span   class="hidden-sm-and-down logo-test">I Wish</span>
      </v-toolbar-title>
    </v-toolbar>
    <vue-perfect-scrollbar
      class="drawer-menu--scroll"
      :settings="scrollSettings"
    >
      <v-list dense expand>
        <template v-for="(item, i) in menus">
          <!--group with subitems-->
          <v-list-group
            v-if="item.items"
            :key="item.name"
            :group="item.group"
            :prepend-icon="item.icon"
            no-action="no-action"
          >
            <v-list-item slot="activator" ripple="ripple">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <template v-for="(subItem, i) in item.items">
              <!--sub group-->
              <v-list-group
                v-if="subItem.items"
                :key="subItem.name"
                :group="subItem.group"
                sub-group="sub-group"
              >
                <v-list-item slot="activator" ripple="ripple">
                  <v-list-item-content>
                    <v-list-item-title >{{ subItem.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(grand, i) in subItem.children"
                  :key="i"
                  :to="grand.href ? grand.href : null"
            @click="drawer = false"

                  ripple="ripple"

                >
                  <v-list-item-content>
                    <v-list-item-title >{{ grand.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <!--child item-->
              <v-list-item
                v-else
                :key="i"
            @click="drawer = false"

                :to="subItem.href ? subItem.href : null"
                :disabled="subItem.disabled"
                :target="subItem.target"
                ripple="ripple"

              >
                <v-list-item-content>
                  <v-list-item-title 
                    ><span>{{ subItem.title }}</span></v-list-item-title
                  >
                </v-list-item-content>
                <v-list-item-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">{{
                    subItem.action
                  }}</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-group>
          <v-subheader v-else-if="item.header" :key="i">{{
            item.header
          }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="i"></v-divider>
          <!--top-level link-->
          <v-list-item
            v-else
            :to="item.href ? item.href : null"
            ripple="ripple"
            :disabled="item.disabled"
            @click="drawer = false"

            :target="item.target"
            rel="noopener"
            :key="item.name"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </vue-perfect-scrollbar>

    <!-- </VuePerfectScrollbar> -->
  </v-navigation-drawer>
</template>
<script>
import menu from "../static/menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "app-drawer",
  components: {
    VuePerfectScrollbar,
  },
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    mini: false,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160,
    },
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(val) {
        this.$store.dispatch("drawer", val);
      },
    },
    computeGroupActive() {
      return true;
    },
    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav;
    },
  },
  methods: {
    genChildTarget(item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component,
        };
      }
      return { name: `${item.group}/${subItem.name}` };
    },
  },
};
</script>

<style lang="css" >
/* use this if they asked you to add a scrollbar to the dashboard */
.v-list-item--active {
  border-width: 1px;
  border-style: solid;
  color: rgb(0, 255, 136);
  border-radius: 8px;
  border-color: rgb(0, 255, 136);
}
.drawer-color {
  background-color: #009688!important;

}
.logo-test{
  color: white !important;
}

.v-navigation-drawer__content {
  overflow-y: hidden;
}

/* light scroll bar  */

#appDrawer {
  overflow: hidden;
}
#appDrawer .drawer-menu--scroll {
  height: calc(100vh - 48px);
  overflow: auto;
}
.logo{
  height:"40%"; 
  width:"40%"; 
}
</style>
