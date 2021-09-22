<template>
  <ion-menu
    side="start"
    content-id="main-content"
    menu-id="menu"
    :disabled="active"
  >
    <ion-header>
      <ion-toolbar translucent>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label>Etiquetas</ion-label>
      </ion-item>
      <ion-list>
        <ion-item button @click="openEnd()">
          <ion-icon :icon="bookmark" slot="start"></ion-icon>
          <ion-label>item 1 {{ !active }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-item
        button
        @click="
          () => {
            openEnd();
            router.push('/priorities/list');
          }
        "
      >
        <ion-label>Prioridades</ion-label>
      </ion-item>

      <ion-item
        button
        @click="
          () => {
            openEnd();
            router.push('/user/profile');
          }
        "
      >
        <ion-label>Perfil</ion-label>
      </ion-item>
      <ion-item button @click="logout()">
        <ion-label>Cerrar sesión</ion-label>
      </ion-item>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import {
  menuController,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/vue';
import { home, heart, create, bookmark } from 'ionicons/icons';
import { useStore } from 'vuex';
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import isEmpty from 'is-empty';

export default defineComponent({
  name: 'Menu',
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const active = computed(() => {
      const user = store.getters.getUser;

      return isEmpty(user);
    });

    // Cuando recarga la aplicacion
    if (active.value) {
      onBeforeMount(async () => {
        await store.dispatch('relogin');
      });
    }

    return {
      heart,
      home,
      create,
      bookmark,
      active,
      store,
      router
    };
  },
  methods: {
    openEnd() {
      menuController.close('start');
    },
    async logout() {
      this.openEnd();

      await this.store.dispatch('logout');

      this.router.replace('/user/login');
    }
  }
});
</script>
