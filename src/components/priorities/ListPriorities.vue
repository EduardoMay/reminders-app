<template>
  <ion-list v-if="priorities.length > 0">
    <ion-item
      v-for="priority in priorities"
      :key="priority._id"
      @click="presentActionSheet(priority)"
    >
      <ion-label>
        {{ priority.title }}
      </ion-label>
      <ion-icon
        :icon="create"
        color="medium"
        slot="end"
        @click="() => editPriority(priority)"
      />
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  actionSheetController
} from "@ionic/vue";
import { menu, create, trash } from "ionicons/icons";
import { mapMutations, useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Priority } from "@/interfaces/Priority";

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
  },
  methods: {
    ...mapMutations(["setPriority"]),
    editPriority(priority: Priority): void {
      this.setPriority(priority);
      this.router.push("edit");
    },
    async presentActionSheet(priority: Priority): Promise<void> {
      const actionSheet = await actionSheetController.create({
        header: "Albums",
        cssClass: "my-custom-class",
        buttons: [
          {
            text: "Eliminar",
            role: "destructive",
            icon: trash,
            handler: () => {
              console.log("Delete clicked", priority._id);
            }
          },
          {
            text: "Editar",
            icon: create,
            handler: () => {
              this.editPriority(priority);
              console.log("Share clicked", priority);
            }
          }
        ]
      });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
      console.log("onDidDismiss resolved with role", role);
    }
  }
});
</script>
