<template>
  <ion-list v-if="reminders && reminders.length > 0">
    <ion-item
      v-for="reminder in reminders"
      :key="reminder._id"
      @click="viewReminder(reminder)"
    >
      <ion-label>
        {{ reminder.title }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { menuController, IonList, IonItem, IonLabel } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import { mapMutations, useStore } from 'vuex';
import { computed, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ReminderTypes } from '@/types/ReminderTypes';
import { ReminderInterface } from '@/interfaces/Reminder';

export default defineComponent({
  name: 'ListReminders',
  components: {
    IonList,
    IonItem,
    IonLabel
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    onMounted(async () => {
      await store.dispatch(ReminderTypes.GET_REMINDERS, {
        idUser: store.state.UsersModule.user._id
      });
    });

    return {
      menu,
      router,
      store,
      reminders: computed(() => store.state.RemindersModules.reminders)
    };
  },
  methods: {
    openMenu(): void {
      menuController.open('menu');
    },
    viewReminder(reminder: ReminderInterface): void {
      this.getReminder(reminder);
      this.router.push('/reminders/view');
    },
    ...mapMutations(['getReminder'])
  }
});
</script>
