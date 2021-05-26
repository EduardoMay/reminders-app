<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/priorities/list"></ion-back-button>
        </ion-buttons>
        <ion-title>Nueva prioridad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <span>Formulario</span>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent
} from "@ionic/vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormPriority",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent
  },
  setup() {
    const router = useRouter();

    return {
      router
    };
  }
});
</script>
