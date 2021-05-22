<template>
  <ion-list v-if="priorities.length > 0">
    <ion-item v-for="priority in priorities" :key="priority._id">
      <ion-label>
        {{ priority.title }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel } from "@ionic/vue";
import { menu } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ListPriorities",
  components: {
    IonList,
    IonItem,
    IonLabel
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      menu,
      router,
      store,
      priorities: computed(() => store.state.PrioritiesModule.priorities)
    };
  }
});
</script>
