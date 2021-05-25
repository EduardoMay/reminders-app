import { createStore } from "vuex";

// Modules vuex
import { UsersModule } from "./modules/users";
import { RemindersModules } from "./modules/reminders";
import { PrioritiesModule } from "./modules/priorities";

export const store = createStore({
  modules: {
    UsersModule,
    RemindersModules,
    PrioritiesModule
  }
});
