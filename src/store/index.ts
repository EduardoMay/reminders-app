import { createStore } from "vuex";

// Modules vuex
import { UsersModule } from "./modules/users";

export const store = createStore({
  modules: {
    UsersModule
  }
});
