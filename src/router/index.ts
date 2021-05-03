import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

// Componentes
import NotFound from "@/views/layouts/NotFound.vue";
import Login from "@/views/user/Login.vue";

// Services
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
    name: "Login",
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
      if (to.name !== "Reminders" && (await user.verifyToken()))
        next({ name: "Reminders" });
      else next();
    }
  },
  {
    path: "/reminders",
    name: "Reminders",
    component: () => import("@/views/reminders/Reminders.vue")
  },
  {
    path: "/reminders/new",
    name: "NewReminder",
    component: () => import("@/views/reminders/NewReminder.vue")
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

router.beforeEach(async (to, from, next) => {
  if (to.name !== "Login" && !(await user.verifyToken()))
    next({ name: "Login" });
  else next();
});

export default router;
