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
      <list-reminders></list-reminders>

      <button-float></button-float>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  menuController,
  IonPage,
  IonContent,
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import { menu } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import ButtonFloat from "@/views/layouts/ButtonFloat.vue";
import ListReminders from "@/components/reminders/ListReminders.vue";

export default defineComponent({
  name: "Reminders",
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonToolbar,
    ButtonFloat,
    ListReminders
  },
  setup() {
    const router = useRouter();

    return {
      menu,
      router
    };
  },
  methods: {
    openMenu(): void {
      menuController.open("menu");
    }
  }
});
</script>
