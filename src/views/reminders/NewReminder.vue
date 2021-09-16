<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>
            <ion-back-button default-href="/reminders"></ion-back-button>
          </ion-button>
        </ion-buttons>
        <ion-title>Nuevo recordatorio</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Titulo</ion-label>
        <ion-input
          type="text"
          v-model="title"
          v-on:keyup.enter="formForm()"
        ></ion-input>
      </ion-item>

      <ion-item class="ion-margin-top">
        <ion-label position="floating">Descripción</ion-label>
        <ion-input
          type="text"
          v-model="description"
          v-on:keyup.enter="formForm()"
        ></ion-input>
      </ion-item>

      <ion-item class="ion-margin-top">
        <ion-label>Fecha</ion-label>
        <ion-datetime
          v-model="dateReminder"
          placeholder="Seleccionar"
          cancel-text="Cancelar"
          done-text="Seleccionar"
          month-short-names="ene, feb, mar, abr, may, jun, jul, ago, sept, oct, nov, dic"
        ></ion-datetime>
      </ion-item>

      <ion-button
        expand="full"
        class="ion-margin-top"
        id="buttonForm"
        @click="formForm()"
      >
        Guardar
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonBackButton,
  IonButtons,
  toastController
} from '@ionic/vue';
import { ReminderInterface } from '@/interfaces/Reminder';
import { useStore } from 'vuex';
import { ReminderTypes } from '@/types/ReminderTypes';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NewReminder',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonBackButton,
    IonButtons
  },
  data() {
    return {
      title: '',
      description: '',
      dateReminder: ''
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    return { store, router };
  },
  methods: {
    formForm() {
      if (
        this.title === '' ||
        this.description === '' ||
        this.dateReminder === ''
      )
        return this.openToast('Favor de llenar todos los campos');

      const newReminder: ReminderInterface = {
        id_user: this.store.state.UsersModule.user._id,
        title: this.title,
        description: this.description,
        date_reminder: this.dateReminder,
        priority: {
          id_user: '',
          title: '',
          color: ''
        },
        tags: []
      };

      this.store
        .dispatch(ReminderTypes.SAVE_REMINDER, { newReminder })
        .then((status) => {
          if (!status)
            return this.openToast(
              'Ocurrió un error al guardar, vuelva a intentar'
            );

          this.openToast('Se guardo correctamente');

          this.router.replace('/reminders');
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
