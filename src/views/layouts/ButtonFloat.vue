<template>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button @click="() => router.push('/reminders/new')">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { IonIcon, IonFab, IonFabButton } from "@ionic/vue";
import { add } from "ionicons/icons";
import { useRouter } from "vue-router";

export default {
  name: "NewReminders",
  components: { IonIcon, IonFab, IonFabButton },
  setup() {
    const router = useRouter();

    return {
      add,
      router
    };
  }
};
</script>
