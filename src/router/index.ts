import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import ListReminders from "@/views/reminders/ListReminders.vue";
import Login from "@/views/user/Login.vue";

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
    ]
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

export default router;
