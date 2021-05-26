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

    <ion-content :fullscreen="true" class="ion-padding">
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
import { useRouter } from "vue-router";
import FormPriority from "@/components/priorities/FormPriority.vue";

export default defineComponent({
  name: "CreatePriority",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    FormPriority
  },
  setup() {
    const router = useRouter();

    return {
      router
    };
  }
});
</script>
