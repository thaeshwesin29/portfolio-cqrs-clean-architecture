// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from "vue-router";

// Middleware
import { authGuard } from "@/middleware/auth";
import { applyMiddleware } from "@/middleware";
import type { Middleware } from "@/middleware/types";
import ChangePassword from "@/pages/Dashboard/Settings/ChangePassword.vue";

// Types
interface RouteMetaWithMiddleware {
  middlewares?: Middleware[];
  requiresAuth?: boolean;
  title?: string;
  layout?: string;
}

// Routes
const routes: Array<RouteRecordRaw & { meta?: RouteMetaWithMiddleware }> = [
  {
    path: "/",
    redirect: "/portfolio",
  },

  // Public routes
  {
    path: "/home",
    name: "Home",
    component: () => import("@/pages/HomeView.vue"),
  },
  {
    path: "/home/login",
    name: "Login",
    component: () => import("@/pages/LoginView.vue"),
  },
  {
    path: "/home/register",
    name: "Register",
    component: () => import("@/pages/RegisterView.vue"),
  },
  {
    path: "/home/blogs",
    name: "BlogList",
    component: () => import("@/pages/BlogListView.vue"),
  },
  {
    path: "/create-blog",
    name: "CreateBlog",
    component: () => import("@/pages/CreateBlogView.vue"),
    meta: { middlewares: [authGuard], requiresAuth: true },
  },
  {
    path: "/edit-blog/:id",
    name: "EditBlog",
    component: () => import("@/pages/EditBlogView.vue"),
    meta: { middlewares: [authGuard], requiresAuth: true },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/pages/ForgotPasswordView.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/pages/ResetPasswordView.vue"),
  },
  {
    path: "/2fa",
    name: "TwoFactor",
    component: () => import("@/pages/TwoFactorView.vue"),
    meta: { middlewares: [authGuard], requiresAuth: true },
  },

  // Portfolio routes
  {
    path: "/portfolio",
    component: () => import("@/pages/Portfolio/PortfolioLayout.vue"),
    children: [
      {
        path: "",
        name: "PortfolioHome",
        component: () => import("@/pages/Portfolio/HomeView.vue"),
        meta: { title: "Thae Shwe Sin - Full Stack Developer" },
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/pages/Portfolio/AboutView.vue"),
        meta: { title: "About - Thae Shwe Sin" },
      },
      {
        path: "skills",
        name: "Skills",
        component: () => import("@/pages/Portfolio/SkillsView.vue"),
        meta: { title: "Skills - Thae Shwe Sin" },
      },
      {
        path: "education",
        name: "Education",
        component: () => import("@/pages/Portfolio/EducationView.vue"),
        meta: { title: "Education - Thae Shwe Sin" },
      },
      {
        path: "work",
        name: "Work",
        component: () => import("@/pages/Portfolio/WorkView.vue"),
        meta: { title: "Projects - Thae Shwe Sin" },
      },
      {
        path: "experience",
        name: "Experience",
        component: () => import("@/pages/Portfolio/ExperienceView.vue"),
        meta: { title: "Experience - Thae Shwe Sin" },
      },
      {
        path: "site-technologies",
        name: "SiteTechnologies",
        component: () => import("@/pages/Portfolio/SiteTechnologiesView.vue"),
        meta: { title: "Site Technologies - Thae Shwe Sin" },
      },
      {
        path: "hire-me",
        name: "HireMe",
        component: () => import("@/pages/Portfolio/HireMeView.vue"),
        meta: { title: "Hire Me - Thae Shwe Sin" },
      },

      // ✅ Search route under portfolio
      {
        path: "search",
        name: "SearchResults",
        component: () => import("@/pages/Dashboard/Search/SearchView.vue"),
        meta: { title: "Search Results" },
      },


    ],
  },

  // Dashboard routes
  {
    path: "/dashboard",
    component: () => import("@/pages/Dashboard/DashboardLayout.vue"),
    meta: { middlewares: [authGuard], requiresAuth: true },
    children: [
      {
        path: "",
        name: "DashboardHome",
        component: () => import("@/pages/Dashboard/DashboardHome.vue"),
        meta: { title: "Dashboard Overview" },
      },
      {
        path: "projects",
        name: "DashboardProjects",
        component: () => import("@/pages/Dashboard/Projects/ProjectList.vue"),
        meta: { title: "Manage Projects" },
      },
      {
        path: "projects/create",
        name: "DashboardProjectCreate",
        component: () => import("@/pages/Dashboard/Projects/CreateProject.vue"),
        meta: { title: "Create Project" },
      },
      {
        path: "projects/edit/:id",
        name: "DashboardProjectEdit",
        component: () => import("@/pages/Dashboard/Projects/EditProject.vue"),
        meta: { title: "Edit Project" },
        props: true,
      },
      {
        path: "education",
        name: "DashboardEducation",
        component: () => import("@/pages/Dashboard/Education/EducationList.vue"),
        meta: { title: "Manage Education" },
      },
      {
        path: "education/create",
        name: "DashboardEducationCreate",
        component: () => import("@/pages/Dashboard/Education/CreateEducation.vue"),
        meta: { title: "Add Education" },
      },
      {
        path: "education/edit/:id",
        name: "DashboardEducationEdit",
        component: () => import("@/pages/Dashboard/Education/EditEducation.vue"),
        meta: { title: "Edit Education" },
      },
      {
        path: "experience",
        name: "DashboardExperience",
        component: () => import("@/pages/Dashboard/Experience/ExperienceList.vue"),
        meta: { title: "Manage Experience" },
      },
      {
        path: "experience/create",
        name: "DashboardExperienceCreate",
        component: () => import("@/pages/Dashboard/Experience/ExperienceCreate.vue"),
      },
      {
        path: "experience/edit/:id",
        name: "DashboardExperienceEdit",
        component: () => import("@/pages/Dashboard/Experience/EditExperience.vue"),
        meta: { title: "Edit Experience" },
      },
      {
        path: "hire-me",
        name: "DashboardHireMe",
        component: () => import("@/pages/Dashboard/HireMe/HireMeList.vue"),
        meta: { title: "Hire Requests" },
      },
      {
        path: "settings/:tab?",
        name: "DashboardSettings",
        component: () => import("@/pages/Dashboard/Settings/SettingsPage.vue"),
        meta: { title: "Settings" },
      },
      {
        path: "settings/change-password",
        name: "ChangePassword",
        component: ChangePassword,
        meta: { title: "Change Password" },
      },
    ],
  },

  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFoundView.vue"),
    meta: { title: "404 - Page Not Found" },
  },
];

// Router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || "/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

// Global navigation guard
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.meta?.title) document.title = to.meta.title as string;

    const middlewareList = to.matched.flatMap(
      (r) => (r.meta as RouteMetaWithMiddleware)?.middlewares || []
    );
    if (middlewareList.length > 0) {
      applyMiddleware(middlewareList, to, from, next);
    } else {
      next();
    }
  }
);

export default router;
export type { RouteMetaWithMiddleware };
