import { createRouter, createWebHistory } from "vue-router";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout.vue";

// Pages
import MainPage from "./pages/MainPage/MainPage.vue";
import AuthPage from "./pages/AuthPage/AuthPage.vue";
import SuccessPage from "./pages/SuccessPage/SuccessPage.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: MainPage,
      },
      {
        path: "/auth",
        component: AuthPage,
      },
      {
        path: "/success",
        component: SuccessPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
