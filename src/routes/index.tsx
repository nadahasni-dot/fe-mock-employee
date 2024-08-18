import App from "@/App";
import BiodataDetail from "@/pages/biodata/BiodataDetail";
import DashboardAdmin from "@/pages/dashboard/DashboardAdmin";
import DashboardUser from "@/pages/dashboard/DashboardUser";
import Home from "@/pages/home/Home";
import SignIn from "@/pages/signin/SignIn";
import SignUp from "@/pages/signup/SignUp";
import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: SignIn,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUp,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: DashboardUser,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: DashboardAdmin,
});

const biodataDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/biodata/detail/$biodataId",
  component: BiodataDetail,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  signUpRoute,
  appRoute,
  adminRoute,
  biodataDetailRoute,
]);

export const router = createRouter({ routeTree });
