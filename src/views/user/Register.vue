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
          <ion-label position="floating">Correo</ion-label>
          <ion-input
            id="email"
            type="email"
            v-model="email"
            v-on:keyup.enter="register()"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input
            id="password"
            type="password"
            v-model="password"
            v-on:keyup.enter="register()"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-label position="floating">Repite la contraseña</ion-label>
          <ion-input
            id="password"
            type="password"
            v-model="replyPassword"
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
      store,
      id: computed(() => route.params.id)
    };
  },
  methods: {
    async register() {
      const emailPatter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailPatter.test(this.email))
        return this.openToast("Ingresa un correo valido");

      if (this.email === "" || this.password === "")
        return this.openToast("Los campos son obligatorios");

      if (this.password !== this.replyPassword)
        return this.openToast("Las contraseñas no son iguales");

      const user: User = { email: "" };

      user.email = this.email;
      user.password = this.password;

      const message = await this.store.dispatch(UserTypes.REGISTER, user);

      if (message === "Registered user")
        return this.openToast("El email que ingresaste ya ha sido registrado");

      if (message === "Data incomplete")
        return this.openToast("La contraseña de tener mínimo 5 caracteres");

      this.openToast("Te has registrado correctamente");

      this.router.push("/user/login");
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
