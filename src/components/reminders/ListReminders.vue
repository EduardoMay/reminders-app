<template>
  <ion-list>
    <ion-item>
      <ion-label>
        Component
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Mega Man X</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>The Legend of Zelda</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Pac-Man</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Super Mario World</ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { menuController, IonList, IonItem, IonLabel } from "@ionic/vue";
import { menu } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ListReminders",
  components: {
    IonList,
    IonItem,
    IonLabel
  },
  setup() {
    const router = useRouter();

    return {
      menu,
      router
    };
  },
  methods: {
    openMenu(): void {
      menuController.open("menu");
    }
  }
});
</script>
