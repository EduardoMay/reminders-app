<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismissModal()" slot="icon-only">
            <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Registrarse</ion-title>
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

        <ion-button
          expand="full"
          class="ion-margin-top"
          id="buttonForm"
          @click="register()"
        >
          Registrarse
        </ion-button>
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
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  toastController,
  modalController,
  IonIcon
} from "@ionic/vue";
import { arrowBack } from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { User } from "@/interfaces/User";
import RegisterUser from "@/views/user/Register.vue";

export default defineComponent({
  name: "RegisterUser",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon
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
      arrowBack,
      router,
      formCode: computed(() => route.name === "Code"),
      store,
      id: computed(() => route.params.id)
    };
  },
  methods: {
    register() {
      const emailPatter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.email === "" || this.password === "")
        return this.openToast("Los campos son obligatorios");

      if (this.password !== this.replyPassword)
        return this.openToast("Las contraseñas no son iguales");

      if (!emailPatter.test(this.email))
        return this.openToast("Ingresa un correo valido");

      const user: User = { email: "" };

      user.email = this.email;
      user.password = this.password;

      console.log(true);
    },
    async dismissModal() {
      await modalController.dismiss({
        component: RegisterUser
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
