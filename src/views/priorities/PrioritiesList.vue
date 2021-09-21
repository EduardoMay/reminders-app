<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/reminders"></ion-back-button>
        </ion-buttons>
        <ion-title>Lista de prioridades</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="() => router.push('/priorities/create')">
            <ion-icon :icon="create" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <list-priorities></list-priorities>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonTitle,
  IonButton,
  IonIcon
} from '@ionic/vue';
import { create } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import ListPriorities from '@/components/priorities/ListPriorities.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PrioritiesList',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonTitle,
    IonButton,
    IonIcon,
    ListPriorities
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    store.dispatch('getReminders');

    return {
      create,
      router
    };
  }
});
</script>
