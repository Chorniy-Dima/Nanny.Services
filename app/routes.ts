import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("favorites", "routes/favorites.tsx"),
    route("nannies", "routes/nannies.tsx"),
  ]),
] satisfies RouteConfig;
