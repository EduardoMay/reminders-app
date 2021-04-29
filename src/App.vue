<template>
  <ion-app>
    <menu-app></menu-app>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import MenuApp from "@/views/layouts/MenuApp.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    MenuApp
  }
});
</script>
