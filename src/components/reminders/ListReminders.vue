<template>
  <ion-list v-if="reminders">
    <ion-item v-for="reminder in reminders" :key="reminder._id">
      <ion-label>
        {{ reminder.title }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { menuController, IonList, IonItem, IonLabel } from "@ionic/vue";
import { menu } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ReminderTypes } from "@/types/ReminderTypes";

export default defineComponent({
  name: "ListReminders",
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
      menuController.open("menu");
    }
  }
});
</script>
