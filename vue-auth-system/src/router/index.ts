// src/router/index.ts - Simplified version that only includes existing files
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

// Simplified route definitions - only include files that exist
const routes: Array<RouteRecordRaw & { meta?: RouteMetaWithMiddleware }> = [
  // Root redirect
  {
    path: "/",
    redirect: "/portfolio",
  },

  // Keep your existing routes that work
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
        meta: { title: "Experience - profile5. Thae Shwe Sin" },
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
    ],
  },

  // Dashboard routes (protected)
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
        component: () =>
          import("@/pages/Dashboard/Education/EducationList.vue"),
        meta: { title: "Manage Education" },
      },
      {
        path: "education/create",
        name: "DashboardEducationCreate",
        component: () =>
          import("@/pages/Dashboard/Education/CreateEducation.vue"),
        meta: { title: "Add Education" },
      },
      {
        path: "education/edit/:id",
        name: "DashboardEducationEdit",
        component: () =>
          import("@/pages/Dashboard/Education/EditEducation.vue"),
        meta: { title: "Edit Education" },
      },
      // src/router/index.ts (excerpt for dashboard/settings)
      {
        path: "experience",
        name: "DashboardExperience",
        component: () =>
          import("@/pages/Dashboard/Experience/ExperienceList.vue"),
        meta: { title: "Manage Experience" },
      },
      {
        path: "experience/create",
        name: "DashboardExperienceCreate",
        component: () =>
          import("@/pages/Dashboard/Experience/ExperienceCreate.vue"),
      },
      {
        path: "/dashboard/settings/change-password",
        name: "ChangePassword",
        component: ChangePassword,
      },
      // ...other routes

      {
        path: "/dashboard/settings/information",
        name: "InformationView",
        component: () =>
          import("@/pages/Dashboard/Settings/InformationView.vue"),
      },
      {
        path: "experience/edit/:id",
        name: "DashboardExperienceEdit",
        component: () =>
          import("@/pages/Dashboard/Experience/EditExperience.vue"),
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
    ],
  },

  // 404 Not Found - now using the file we just created
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
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Global navigation guard
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    // Set page title
    if (to.meta?.title) {
      document.title = to.meta.title as string;
    }

    // Apply middlewares
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

// Types export for use in other files
export type { RouteMetaWithMiddleware };
