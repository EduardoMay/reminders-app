<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/user/login"></ion-back-button>
        </ion-buttons>
        <ion-title>Registro</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div>
        <ion-item class="ion-margin-top">
          <ion-label position="floating">Nombre</ion-label>
          <ion-input
            id="name"
            type="text"
            v-model="user.name"
            v-on:keyup.enter="register()"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-label position="floating">Correo</ion-label>
          <ion-input
            id="email"
            type="email"
            v-model="user.email"
            v-on:keyup.enter="register()"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input
            id="password"
            type="password"
            v-model="user.password"
            v-on:keyup.enter="register()"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-label position="floating">Repite la contraseña</ion-label>
          <ion-input
            id="password"
            type="password"
            v-model="user.replyPassword"
            v-on:keyup.enter="register()"
          ></ion-input>
        </ion-item>

        <div class="ion-text-center">
          <ion-button expand="full" class="ion-margin-top" @click="register()">
            Registrarse
          </ion-button>
          <ion-button
            color="light"
            expand="full"
            class="ion-margin-top"
            id="buttonForm"
            @click="() => router.push('/user/login')"
          >
            Iniciar sesión
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
  name: 'LoginUser',
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
    async register() {
      if (!this.user.validateRegister())
        return this.openToast(this.user.messageError);

      const [error, message] = await this.store.dispatch(
        'registerUser',
        this.user.user
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
