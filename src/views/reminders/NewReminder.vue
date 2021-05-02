<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>
            <ion-back-button default-href="/reminders/list"></ion-back-button>
          </ion-button>
        </ion-buttons>
        <ion-title>Nuevo recordatorio</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>Form</h1>
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
  IonTitle,
  IonContent,
  IonToolbar,
  IonBackButton
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NewReminder",
  components: {
    IonPage,
    IonHeader,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonToolbar,
    IonBackButton
  },
  methods: {
    openMenu() {
      menuController.open("menu");
    }
  }
});
</script>
