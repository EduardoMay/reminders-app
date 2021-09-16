<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/reminders"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ reminder.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="create" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div>
        <ion-text color="medium">
          <span>{{ reminder.createdAt }}</span>
        </ion-text>
      </div>
      <div class="ion-margin-top">
        {{ reminder.description }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonText,
  IonButton,
  IonIcon
} from '@ionic/vue';
import { arrowBack, create } from 'ionicons/icons';
import { useStore } from 'vuex';
import { ReminderInterface } from '@/interfaces/Reminder';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ViewReminder',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonText,
    IonButton,
    IonIcon
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const reminder: ReminderInterface = store.state.RemindersModules.reminder;

    console.log(reminder);

    if (reminder._id === '') {
      router.replace('/reminders');
    }

    return { arrowBack, create, reminder };
  }
});
</script>
