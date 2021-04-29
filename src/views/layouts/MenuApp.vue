<template>
  <!-- TODO use vuex for validate property "disabled" -->
  <ion-menu
    side="start"
    content-id="main-content"
    menu-id="menu"
    disabled="true"
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
          <ion-label>
            item 1
          </ion-label>
        </ion-item>
      </ion-list>
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
} from "@ionic/vue";
import { home, heart, create, bookmark } from "ionicons/icons";

export default {
  name: "Menu",
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
    return {
      heart,
      home,
      create,
      bookmark
    };
  },
  methods: {
    openEnd() {
      menuController.close("start");
    }
  }
};
</script>
