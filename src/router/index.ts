import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

// Componentes
import NotFound from "@/views/layouts/NotFound.vue";

// Services
import UserService from "@/services/UserService";

const user = new UserService();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/user/login"
  },
  {
    path: "/user/login",
    name: "LoginUser",
    component: () => import("@/views/user/Login.vue"),
    beforeEnter: async (to, from, next) => {
      if (to.name !== "Reminders" && (await user.verifyToken()))
        next({ name: "Reminders" });
      else next();
    }
  },
  {
    path: "/user/register",
    name: "RegisterUser",
    component: () => import("@/views/user/Register.vue"),
    beforeEnter: async (to, from, next) => {
      if (to.name !== "Reminders" && (await user.verifyToken()))
        next({ name: "Reminders" });
      else next();
    }
  },
  {
    path: "/reminders",
    name: "Reminders",
    component: () => import("@/views/reminders/Reminders.vue"),
    beforeEnter: async (to, from, next) => {
      if (to.name !== "LoginUser" && !(await user.verifyToken()))
        next({ name: "LoginUser" });
      else next();
    }
  },
  {
    path: "/reminders/new",
    name: "NewReminder",
    component: () => import("@/views/reminders/NewReminder.vue"),
    beforeEnter: async (to, from, next) => {
      if (to.name !== "LoginUser" && !(await user.verifyToken()))
        next({ name: "LoginUser" });
      else next();
    }
  },
  {
    path: "/user/profile",
    name: "ProfileUser",
    component: () => import("@/views/user/Profile.vue"),
    beforeEnter: async (to, from, next) => {
      if (to.name !== "LoginUser" && !(await user.verifyToken()))
        next({ name: "LoginUser" });
      else next();
    }
  },
  {
    path: "/priorities/list",
    name: "PrioritiesList",
    component: () => import("@/views/priorities/PrioritiesList.vue"),
    beforeEnter: async (to, from, next) => {
      if (to.name !== "LoginUser" && !(await user.verifyToken()))
        next({ name: "LoginUser" });
      else next();
    }
  },
  {
    path: "/priorities/create",
    name: "CreatePriority",
    component: () => import("@/views/priorities/CreatePriority.vue"),
    beforeEnter: async (to, from, next) => {
      if (to.name !== "LoginUser" && !(await user.verifyToken()))
        next({ name: "LoginUser" });
      else next();
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
