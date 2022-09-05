import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReportView from "../views/ReportView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        transition: "fade",
      },
    },
    {
      path: "/send-report",
      name: "send-report",
      component: ReportView,
      meta: {
        transition: "fade",
      },
    },
  ],
});

export default router;
