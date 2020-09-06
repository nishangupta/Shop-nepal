<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in appDrawer">
          <v-list-item v-if="item.heading" :key="item.text" link router :to="item.route">
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon: item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{item.text}}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child,i) in item.children" :key="i" link router :to="child.route">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{child.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{child.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link router :to="item.route">
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- static logout link -->
        </template>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary darken-1" dark app>
      <v-app-bar-nav-icon @click.stop="drawer =!drawer"></v-app-bar-nav-icon>
      <router-link to="/" class="white--text text-decoration-none">
        <v-toolbar-title style="width:300px" class="ml-0 pl-4">
          <span>Shop Nepal</span>
        </v-toolbar-title>
      </router-link>
      <v-text-field
        flat
        solo-inverted
        hide-details
        label="Search"
        class="hidden-md-and-down"
        v-model="searchInput"
      ></v-text-field>
      <v-btn text class="hidden-md-and-down" large>
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn fab text router to="/shop/cart">
        <v-badge :content="cartCount" color="secondary">
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn>

      <div class="hidden-md-and-down">
        <v-menu offset-y v-show="$vuetify.breakpoint.md">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" text v-on="on">
              <v-icon left>expand_more</v-icon>Account
            </v-btn>
          </template>
          <!-- account nav list -->
          <v-list>
            <v-list-item v-for="item in account_nav_list" :key="item.text" router :to="item.route">
              <v-list-item-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{item.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- logout button -->
            <v-list-item @click="logout" v-if="isLoggedIn">
              <v-list-item-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { fauth } from "@/fb";
import { mapActions } from "vuex";
export default {
  name: "Appbar",
  data() {
    return {
      drawer: null,
      searchInput: "",
      isLoggedIn: false,
      currentUser: false,

      appDrawer: [
        { icon: "shop", text: "Shop Nepal", route: "/" },
        { icon: "admin_panel_settings", text: "My Account", route: "/profile" },
        { icon: "dns", text: "Address book", route: "/address-book" },
        {
          icon: "payment",
          text: "My payment option",
          route: "/payment-option",
        },
        { icon: "receipt", text: "Vouchers", route: "/vouchers" },
        {
          icon: "expand_less",
          "icon-alt": "expand_more",
          text: "My orders",
          model: false,
          children: [
            { text: "Orders", route: "/orders" },
            { text: "My returns", route: "/returns" },
            { text: "My cancellations", route: "/cancelations" },
          ],
        },
        {
          icon: "expand_less",
          "icon-alt": "expand_more",
          text: "Products",
          model: false,
          children: [
            { text: "Manage product", route: "/product/manage-product" },
            { text: "Add Product", route: "/product/add-product" },
          ],
        },
        { icon: "settings", text: "Settings", route: "/settings" },
        { icon: "message", text: "Send feedback", route: "/message" },
        { icon: "live_help", text: "Help", route: "/help" },
      ],
      account_nav_list: [
        { icon: "account_box", text: "Manage your account", route: "/profile" },
        { icon: "border_all", text: "My orders", route: "/orders" },
        {
          icon: "favorite",
          text: "My wishlist & followed stores",
          route: "/wishlist",
        },
      ],
    };
  },
  created() {
    if (fauth.currentUser) {
      this.currentUser = fauth.currentUser;
      this.isLoggedIn = true;
    }
  },
  computed: {
    cartCount() {
      return this.$store.getters.cartItemCount;
    },
  },
  methods: {
    ...mapActions(["clearCart"]),
    logout() {
      fauth.signOut().then(() => {
        this.clearCart();
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
</style>