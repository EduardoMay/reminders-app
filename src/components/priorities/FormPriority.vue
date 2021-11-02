<template>
  <form @submit.prevent="createPriority()">
    <ion-item class="ion-margin-top">
      <ion-label position="floating">Titulo</ion-label>
      <ion-input id="title" type="text" v-model="priority.title"></ion-input>
    </ion-item>

    <ion-item class="ion-margin-top">
      <ion-label>Color</ion-label>
      <ion-input
        id="color"
        type="color"
        v-model="priority.color"
        :value="priority.color"
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
    <ion-button
      color="medium"
      expand="full"
      class="ion-margin-top"
      @click="() => router.replace('list')"
    >
      Cancelar
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
} from '@ionic/vue';
import { menu } from 'ionicons/icons';
import { mapActions, mapMutations, useStore } from 'vuex';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Priority from '@/services/models/Priority';
import { PriorityInterface } from '@/interfaces/Priority';

export default defineComponent({
  name: 'FormPriorities',
  components: { IonItem, IonLabel, IonInput, IonButton },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const priority = new Priority();
    const { value: idUser } = computed(() => store.getters.getIdUser);

    priority.idUser = idUser;

    const isEdit = route.name === 'EditPriority';

    if (isEdit) {
      const selected: PriorityInterface = store.getters.getPrioritySelected;

      if (selected) {
        priority.id = selected._id;
        priority.load(selected);
      } else router.replace('list');
    }

    return {
      menu,
      router,
      store,
      isEdit,
      priority
    };
  },
  methods: {
    ...mapActions(['savePriority', 'updatePriority']),
    ...mapMutations(['setPriority']),
    async createPriority() {
      let message;
      if (this.priority.validate())
        return this.openToast('Por favor llena todos los campos');

      if (!this.isEdit) {
        message = await this.savePriority(this.priority.data);
      } else {
        message = await this.updatePriority(this.priority.dataUpdate);
      }

      if (message) return this.openToast(message);

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
