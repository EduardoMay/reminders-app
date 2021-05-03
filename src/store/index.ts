import { createStore } from "vuex";

// Modules vuex
import { UsersModule } from "./modules/users";
import { RemindersModules } from "./modules/reminders";

export const store = createStore({
  modules: {
    UsersModule,
    RemindersModules
  }
});
