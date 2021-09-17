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
          v-model="reminder.title"
          v-on:keyup.enter="reminderForm()"
        ></ion-input>
      </ion-item>

      <ion-item class="ion-margin-top">
        <ion-label position="floating">Descripción</ion-label>
        <ion-input
          type="text"
          v-model="reminder.description"
          v-on:keyup.enter="reminderForm()"
        ></ion-input>
      </ion-item>

      <ion-item class="ion-margin-top">
        <ion-label>Fecha</ion-label>
        <ion-input v-model="reminder.dateReminder" type="date"></ion-input>
      </ion-item>

      <ion-button
        expand="full"
        class="ion-margin-top"
        id="buttonForm"
        @click="reminderForm()"
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
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonBackButton,
  IonButtons,
  toastController
} from '@ionic/vue';
import { mapActions, useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Reminder from '@/services/models/Reminder';

export default defineComponent({
  name: 'NewReminder',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonBackButton,
    IonButtons
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const reminder = new Reminder();

    return { store, router, reminder };
  },
  methods: {
    ...mapActions(['saveReminder']),
    async reminderForm() {
      if (this.reminder.validateNew())
        return this.openToast('Favor de llenar todos los campos');

      const res = await this.saveReminder(this.reminder);

      if (res) {
        this.openToast('Se guardo correctamente');

        this.router.replace('/reminders');
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
