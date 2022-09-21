import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReportView from "../views/ReportView.vue";
import ManagementView from "../views/ManagementView.vue";
import ResidentsView from "../views/ResidentsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: HomeView,
      meta: {
        transition: "fade",
      },
    },
    {
      path: "/relatorio",
      name: "send-report",
      component: ReportView,
      meta: {
        transition: "fade",
      },
    },
    {
      path: "/colaboradores",
      name: "colaboradores",
      component: () => import("../views/MembersView.vue"),
      meta: {
        transition: "fade",
      },
    },
    {
      path: "/gerenciamento",
      name: "gerenciamento",
      component: ManagementView,
      meta: {
        transition: "fade",
      },
    },
    {
      path: "/moradores",
      name: "moradores",
      component: ResidentsView,
      meta: {
        transition: "fade",
      },
    },
  ],
});

export default router;
