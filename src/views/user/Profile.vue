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

    <ion-content>
      <ion-list>
        <ion-list-header>
          Información
        </ion-list-header>

        <ion-item>
          <ion-label>
            <h3>Nombre</h3>
            <p>{{ user.email }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Correo</h3>
            <p>{{ user.email }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel
} from "@ionic/vue";
import { mapActions, mapGetters, useStore } from "vuex";

export default defineComponent({
  name: "Profile",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel
  },
  data() {
    return {
      user: { email: "", name: "No definido" }
    };
  },
  setup() {
    const store = useStore();

    return { store };
  },
  methods: {
    ...mapActions(["profile"])
  },
  computed: {
    ...mapGetters(["getIdUser"])
  },
  async mounted() {
    const { user } = await this.profile({ id: this.getIdUser });

    this.user = user;
  }
});
</script>
