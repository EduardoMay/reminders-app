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
            v-model="email"
            v-on:keyup.enter="login()"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input
            id="password"
            type="password"
            v-model="password"
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
import { computed, defineComponent } from "vue";
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
} from "@ionic/vue";
import { arrowBack } from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserTypes } from "@/types/UserTypes";
import { User } from "@/interfaces/User";

export default defineComponent({
  name: "LoginUser",
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
  data() {
    return {
      email: "",
      password: "",
      replyPassword: ""
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    return {
      router,
      arrowBack,
      formCode: computed(() => route.name === "Code"),
      store,
      id: computed(() => route.params.id)
    };
  },
  methods: {
    login() {
      const emailPatter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.email === "" || this.password === "")
        return this.openToast("Los campos son obligatorios");

      if (!emailPatter.test(this.email))
        return this.openToast("Ingresa un correo valido");

      const user: User = { email: "" };

      user.email = this.email;
      user.password = this.password;

      this.store.dispatch(UserTypes.LOGIN, { user }).then((status) => {
        if (!status)
          return this.openToast("Correo y contraseña son incorrectos");

        this.router.replace(`/reminders`);
      });
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
