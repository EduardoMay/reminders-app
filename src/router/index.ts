import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import ListReminders from "@/views/reminders/ListReminders.vue";
import Login from "@/views/user/Login.vue";
import UserService from "@/services/UserService";

const user = new UserService();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/user"
  },
  {
    path: "/user",
    component: Login,
    children: [
      {
        path: "",
        redirect: "/user/login"
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/user/Login.vue")
      }
    ],
    beforeEnter: async (to, from, next) => {
      if (to.name !== "ListReminders" && (await user.verifyToken()))
        next({ name: "ListReminders" });
      else next();
    }
  },
  {
    path: "/reminders/list",
    name: "ListReminders",
    component: () => import("@/views/reminders/ListReminders.vue")
  },
  {
    path: "/reminders/grid",
    name: "GridReminders",
    component: () => import("@/views/reminders/GridReminders.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/reminders/list"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.name !== "Login" && !(await user.verifyToken()))
    next({ name: "Login" });
  else next();
});

export default router;
