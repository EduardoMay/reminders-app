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
import { mapMutations, useStore } from 'vuex';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PriorityInterface } from '@/interfaces/Priority';
import { PrioritiesTypes } from '@/types/PrioritiesTypes';

export default defineComponent({
  name: 'FormPriorities',
  components: { IonItem, IonLabel, IonInput, IonButton },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const nameRoute = route.name;
    let { value: priorityBuffer } = computed(() => store.getters.getPriority);

    if (nameRoute === 'CreatePriority')
      priorityBuffer = { title: '', color: '', id_user: '' };

    const { id_user, title, color, _id } = priorityBuffer;

    if (priorityBuffer.title === '' && nameRoute === 'EditPriority')
      router.replace('list');

    return {
      menu,
      router,
      store,
      nameRoute,
      priorityBuffer,
      id: _id,
      id_user,
      title,
      color
    };
  },
  methods: {
    ...mapMutations(['setPriority']),
    async createPriority() {
      if (this.title === '') return this.openToast('Llena el campo titulo');
      if (this.color === '') return this.openToast('Selecciona un color');

      const priority: PriorityInterface = {
        id_user: '',
        title: this.title,
        color: this.color
      };

      if (this.nameRoute === 'EditPriority') {
        priority._id = this.id;
        priority.id_user = this.id_user;

        if (
          this.priorityBuffer.title === priority.title &&
          this.priorityBuffer.color === priority.color
        ) {
          this.router.replace('list');
          this.setPriority({});
          this.openToast('Se guardo correctamente');
          return;
        }

        const dataPriority = {
          data: priority
        };

        const error = await this.store.dispatch(
          PrioritiesTypes.UPDATE_PRIORITY,
          dataPriority
        );

        if (error)
          return this.openToast('Ha ocurrido un error vuelva a intentarlo');

        this.openToast('Se guardo correctamente');
        this.setPriority({});
        this.router.replace('list');
      } else {
        const { message, error } = await this.store.dispatch(
          PrioritiesTypes.SAVE_REMINDERS,
          priority
        );

        this.openToast(message);

        if (!error) this.router.replace('list');
      }

      this.store.dispatch(PrioritiesTypes.GET_PRIORITIES);
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
