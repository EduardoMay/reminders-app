<template>
  <ion-list v-if="priorities.length > 0">
    <ion-item v-for="priority in priorities" :key="priority._id">
      <ion-label>
        {{ priority.title }}
      </ion-label>
      <ion-icon
        :icon="create"
        color="medium"
        slot="end"
        @click="() => router.push('edit')"
      />
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel, IonIcon } from "@ionic/vue";
import { menu, create } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ListPriorities",
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      menu,
      create,
      router,
      store,
      priorities: computed(() => store.state.PrioritiesModule.priorities)
    };
  }
});
</script>
