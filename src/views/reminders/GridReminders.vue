<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="openMenu()">
            <ion-icon :icon="menu" slot="icon-only" />
          </ion-button>
        </ion-buttons>
        <ion-title>Recordatorios</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>Grid</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  menuController,
  IonPage,
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonToolbar
} from "@ionic/vue";
import { menu } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GridReminders",
  components: {
    IonPage,
    IonHeader,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonToolbar
  },
  setup() {
    console.log("GRID");
    return {
      menu
    };
  },
  methods: {
    openMenu() {
      menuController.open("menu");
    }
  }
});
</script>
