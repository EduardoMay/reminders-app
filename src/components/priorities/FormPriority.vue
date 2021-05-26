<template>
  <form @submit.prevent="createPriority()">
    <ion-item class="ion-margin-top">
      <ion-label position="floating">Titulo</ion-label>
      <ion-input id="title" type="text" v-model="title"></ion-input>
    </ion-item>

    <ion-item class="ion-margin-top">
      <ion-label>Color</ion-label>
      <ion-input id="color" type="color" v-model="color"></ion-input>
    </ion-item>

    <ion-button
      expand="full"
      class="ion-margin-top"
      id="buttonForm"
      @click="createPriority()"
    >
      Guardar
    </ion-button>
  </form>
</template>

<script lang="ts">
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  toastController
} from "@ionic/vue";
import { menu } from "ionicons/icons";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormPriorities",
  components: { IonItem, IonLabel, IonInput, IonButton },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      menu,
      router,
      store
    };
  },
  data() {
    return {
      title: "",
      color: ""
    };
  },
  methods: {
    createPriority() {
      if (this.title === "") return this.openToast("Llena el campo titulo");
      if (this.color === "") return this.openToast("Selecciona un color");
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
