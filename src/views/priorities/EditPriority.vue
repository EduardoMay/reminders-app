<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/priorities/list"></ion-back-button>
        </ion-buttons>
        <ion-title>Editar Prioridad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
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

export default defineComponent({
  name: "EditPriority",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent
  }
});
</script>
