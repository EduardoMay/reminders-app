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

    <ion-content class="ion-padding">
      <form-priority></form-priority>
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
import FormPriority from "@/components/priorities/FormPriority.vue";

export default defineComponent({
  name: "EditPriority",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    FormPriority
  }
});
</script>
