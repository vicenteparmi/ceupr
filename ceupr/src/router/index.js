import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReportView from "../views/ReportView.vue";
import ManagementView from "../views/ManagementView.vue";
import ResidentsView from "../views/ResidentsView.vue";
import DepartmentManageView from "../views/DepartmentManageView.vue";
import AccountsView from "../views/AccountsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  beforeEach(to, from, next) {
    window.document.title =
      to.meta && to.meta.title
        ? to.meta.title
        : "Casa do Estudante Universitário";
    next();
  },
  routes: [
    {
      path: "/",
      name: "inicio",
      component: HomeView,
      meta: {
        transition: "fade",
        title: "Casa do Estudante Universitário",
      },
    },
    {
      path: "/relatorio/:id",
      name: "report",
      component: ReportView,
      meta: {
        transition: "fade",
        title: "Relatório (CEU)",
      },
    },
    {
      path: "/colaboradores",
      name: "colaboradores",
      component: () => import("../views/MembersView.vue"),
      meta: {
        transition: "fade",
        title: "Colaboradores (CEU)",
      },
    },
    {
      path: "/gerenciamento",
      name: "gerenciamento",
      component: ManagementView,
      meta: {
        transition: "fade",
        title: "Gerenciamento (CEU)",
      },
    },
    {
      path: "/moradores",
      name: "moradores",
      component: ResidentsView,
      meta: {
        transition: "fade",
        title: "Moradores (CEU)",
      },
    },
    {
      path: "/departamentos",
      name: "departamentos",
      component: DepartmentManageView,
      meta: {
        transition: "fade",
        title: "Departamentos (CEU)",
      },
    },
    {
      path: "/contas",
      name: "contas",
      component: AccountsView,
      meta: {
        transition: "fade",
        title: "Contas (CEU)",
      },
    },
    {
      name: "member",
      path: "/colaboradores/:id",
      component: () => import("../views/MemberView.vue"),
      meta: {
        transition: "fade",
        title: "Colaborador (CEU)",
      },
    },
    {
      name: "settings",
      path: "/configuracoes",
      component: () => import("../views/SettingsView.vue"),
      meta: {
        transition: "fade",
        title: "Configurações (CEU)",
      },
    },
    {
      name: "revisar",
      path: "/revisar",
      component: () => import("../views/ReviewView.vue"),
      meta: {
        transition: "fade",
        title: "Relatórios (CEU)",
      },
    },
    {
      name: "post",
      path: "/postagens",
      component: () => import("../views/PostView.vue"),
      meta: {
        transition: "fade",
        title: "Postagens (CEU)",
      },
    },
    {
      name: "singlepost",
      path: "/post/:id",
      component: () => import("../views/SinglePostView.vue"),
      meta: {
        transition: "fade",
        title: "Publicação (CEU)",
      },
    },
    {
      name: "resident",
      path: "/moradores/:id",
      component: () => import("../views/ResidentView.vue"),
      meta: {
        transition: "fade",
        title: "Morador (CEU)",
      },
    },
    // Archived residents
    {
      name: "arquivo",
      path: "/arquivo",
      component: () => import("../views/ArchivedView.vue"),
      meta: {
        transition: "fade",
        title: "Arquivo (CEU)",
      },
    },
    {
      name: "archived_resident",
      path: "/arquivo/:id",
      component: () => import("../views/ArchivedResidentView.vue"),
      meta: {
        transition: "fade",
        title: "Arquivo (CEU)",
      },
    },
  ],
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    window.document.title = to.meta.title;
  }
});

export default router;
