<template>
  <form @submit.prevent="createPriority()">
    <ion-item class="ion-margin-top">
      <ion-label position="floating">Titulo</ion-label>
      <ion-input id="title" type="text" v-model="title"></ion-input>
    </ion-item>

    <ion-item class="ion-margin-top">
      <ion-label>Color</ion-label>
      <ion-input
        id="color"
        type="color"
        v-model="color"
        :value="color"
      ></ion-input>
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
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Priority } from "@/interfaces/Priority";
import { PrioritiesTypes } from "@/types/PrioritiesTypes";

export default defineComponent({
  name: "FormPriorities",
  components: { IonItem, IonLabel, IonInput, IonButton },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const nameRoute = route.name;
    const { value } = computed(() => store.getters.getPriority);
    const { id_user, title, color, _id } = value;

    if (value.title === "") router.push("list");

    return {
      menu,
      router,
      store,
      nameRoute,
      id: _id,
      id_user,
      title,
      color
    };
  },
  methods: {
    async createPriority() {
      if (this.title === "") return this.openToast("Llena el campo titulo");
      if (this.color === "") return this.openToast("Selecciona un color");

      const priority: Priority = {
        id_user: "",
        title: this.title,
        color: this.color
      };

      if (this.nameRoute === "EditPriority") {
        priority._id = this.id;
        priority.id_user = this.id_user;

        // TODO Validar que sea haya editado la Priority

        this.store.dispatch(PrioritiesTypes.SAVE_REMINDERS, priority);

        return;
      } else {
        const { message, error } = await this.store.dispatch(
          PrioritiesTypes.SAVE_REMINDERS,
          priority
        );

        this.openToast(message);

        if (!error) this.router.push("list");
      }
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
