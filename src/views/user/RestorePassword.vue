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
          <ion-label position="floating">Nueva contraseña</ion-label>
          <ion-input
            id="password"
            type="text"
            v-model="user.password"
            v-on:keyup.enter="requestPassword()"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-label position="floating">Repetir nueva contraseña</ion-label>
          <ion-input
            id="replyPassword"
            type="text"
            v-model="user.replyPassword"
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
import { mapActions, useStore } from 'vuex';
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

    const { token } = route.query;

    user.loadToken = token + '';

    return {
      router,
      arrowBack,
      store,
      id: computed(() => route.params.id),
      user
    };
  },
  methods: {
    ...mapActions(['restorePassword']),
    async requestPassword() {
      if (!this.user.validatePassword())
        return this.openToast(this.user.messageError);

      const [error, message] = await this.restorePassword(
        this.user.restorePasswordData
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
