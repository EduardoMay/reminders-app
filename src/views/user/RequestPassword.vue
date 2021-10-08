<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/user/login"></ion-back-button>
        </ion-buttons>
        <ion-title>Recupearar contraseña</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div>
        <ion-item class="ion-margin-top">
          <ion-label position="floating">Correo</ion-label>
          <ion-input
            id="email"
            type="email"
            v-model="user.email"
            v-on:keyup.enter="requestPassword()"
          ></ion-input>
        </ion-item>

        <div class="ion-text-center">
          <ion-button
            expand="full"
            class="ion-margin-top"
            @click="requestPassword()"
          >
            Recupearar
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  toastController
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import User from '@/services/models/User';

export default defineComponent({
  name: 'RequestPassword',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonInput,
    IonLabel,
    IonItem,
    IonButton
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const user = new User();

    return {
      router,
      arrowBack,
      store,
      id: computed(() => route.params.id),
      user
    };
  },
  methods: {
    async requestPassword() {
      if (!this.user.validateEmail())
        return this.openToast(this.user.messageError);

      const [error, message] = await this.store.dispatch(
        'requestPassword',
        this.user.email
      );

      if (error) return this.openToast(message);
      this.openToast(message);

      this.router.back();
    },
    async openToast(title: string): Promise<any> {
      const toast = await toastController.create({
        message: title,
        duration: 1200
      });
      return toast.present();
    }
  }
});
</script>
