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
  actionSheetController,
  toastController
} from '@ionic/vue';
import { menu, create, trash, close } from 'ionicons/icons';
import { mapActions, mapMutations, useStore } from 'vuex';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { PriorityInterface } from '@/interfaces/Priority';

export default defineComponent({
  name: 'ListPriorities',
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
    ...mapMutations(['setPriority']),
    ...mapActions(['deletePriority']),
    editPriority(priority: PriorityInterface): void {
      this.setPriority(priority);
      this.router.push('edit');
    },
    async openToast(title: string): Promise<any> {
      const toast = await toastController.create({
        message: title,
        duration: 1200
      });
      return toast.present();
    },
    async presentActionSheet(priority: PriorityInterface): Promise<void> {
      const actionSheet = await actionSheetController.create({
        header: 'Albums',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Eliminar',
            icon: trash,
            handler: async () => {
              const message = await this.deletePriority(priority);

              this.openToast(message);
            }
          },
          {
            text: 'Editar',
            icon: create,
            handler: () => {
              this.editPriority(priority);
            }
          },
          {
            text: 'Cancelar',
            icon: close,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  }
});
</script>
