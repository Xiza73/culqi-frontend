import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import Login from "../pages/Login.vue";
// @ts-ignore
import Pay from "../pages/Pay.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Pay,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.name !== "Login" && !localStorage.getItem("token")) {
    next({ name: "Login" });
  } else {
    next();
  }
});

router.beforeEach((to, _, next) => {
  if (to.name === "Login" && localStorage.getItem("token")) {
    next({ name: "Payment" });
  } else {
    next();
  }
});

export default router;
