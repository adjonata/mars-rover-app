<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img
          alt="Marte Logo"
          class="shrink mr-2"
          contain
          :src="marteIcon"
          transition="scale-transition"
          width="40"
        />
        <span class="blue--text text--lighten-5 text-h6 pl-2">Mars Rover</span>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center mr-7">
        <v-btn
          small
          rounded
          depressed
          class='mx-1'
          elevation="2"
          color="blue-grey darken-3"
          v-for="(route, i) in $router.options.routes"
          :key="'route_' + i"
          :to="route.path"
        >
          {{ route.name }}
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <notifications group="notify" position="top center" />
  </v-app>
</template>

<script>
import marteIcon from "@/assets/marte-icon.png"

export default {
  name: "App",
  data() {
    return {
      marteIcon
    }
  },
};
</script>

<style lang="scss">
  @import './assets/css/global.scss';
  // @import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
