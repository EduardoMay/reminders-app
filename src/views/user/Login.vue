<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start" v-if="formCode">
          <ion-back-button default-href="/user/login"></ion-back-button>
        </ion-buttons>
        <ion-title>Iniciar Sesión</ion-title>
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
            v-on:keyup.enter="login()"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input
            id="password"
            type="password"
            v-model="user.password"
            v-on:keyup.enter="login()"
          ></ion-input>
        </ion-item>

        <div class="ion-text-center">
          <ion-button
            expand="full"
            class="ion-margin-top"
            id="buttonForm"
            @click="login()"
          >
            Iniciar sesión
          </ion-button>
          <ion-button
            color="light"
            expand="full"
            class="ion-margin-top"
            @click="() => router.push('/user/register')"
          >
            Registrarse
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
      formCode: computed(() => route.name === 'Code'),
      store,
      user
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    async login() {
      if (this.user.validateLogin())
        return this.openToast('Ingrese correo y contraseña');

      if (!this.user.validateEmail())
        return this.openToast('Ingresa un correo valido');

      const res = await this.loginUser(this.user);
      if (!res) return this.openToast('Correo y contraseña son incorrectos');

      this.router.replace(`/reminders`);
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
