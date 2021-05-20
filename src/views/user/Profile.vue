<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/reminders"></ion-back-button>
        </ion-buttons>
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle
} from "@ionic/vue";
import { useStore } from "vuex";
import { UserTypes } from "@/types/UserTypes";

export default defineComponent({
  name: "Profile",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.UsersModule.user);
    console.log(store.state.UsersModule.user);
    // store.dispatch(UserTypes.PROFILE, { id: user.id });

    console.log("Perfil");
    return {};
  }
});
</script>
