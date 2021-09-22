<template>
  <ion-list v-if="state.priorities.length > 0">
    <ion-item
      v-for="priority in state.priorities"
      :key="priority._id"
      @click="presentActionSheet(priority._id)"
    >
      <ion-label>
        {{ priority.title }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import {
  IonList,
  IonItem,
  IonLabel,
  actionSheetController,
  toastController
} from '@ionic/vue';
import { menu, create, trash, close } from 'ionicons/icons';
import { mapActions, mapMutations, useStore } from 'vuex';
import { computed, defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { PriorityInterface } from '@/interfaces/Priority';

export default defineComponent({
  name: 'ListPriorities',
  components: {
    IonList,
    IonItem,
    IonLabel
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state: { priorities: PriorityInterface[] } = reactive({
      priorities: computed(() => store.getters.priorities)
    });

    return {
      menu,
      create,
      router,
      store,
      state
    };
  },
  methods: {
    ...mapMutations(['setSelected']),
    ...mapActions(['deletePriority', 'getPriorities']),
    editPriority(id: string): void {
      this.setSelected(id);
      this.router.push('edit');
    },
    async openToast(title: string): Promise<any> {
      const toast = await toastController.create({
        message: title,
        duration: 1200
      });
      return toast.present();
    },
    async presentActionSheet(id: string): Promise<void> {
      const actionSheet = await actionSheetController.create({
        header: 'Albums',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Eliminar',
            icon: trash,
            handler: async () => {
              const message = await this.deletePriority(id);

              if (message) return this.openToast(message);
            }
          },
          {
            text: 'Editar',
            icon: create,
            handler: () => {
              this.editPriority(id);
            }
          },
          {
            text: 'Cancelar',
            icon: close,
            role: 'cancel'
          }
        ]
      });
      await actionSheet.present();
    }
  },
  mounted() {
    this.getPriorities();
  }
});
</script>
