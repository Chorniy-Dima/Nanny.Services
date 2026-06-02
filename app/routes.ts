import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("favourites", "routes/favourites.tsx"),
  route("nannies", "routes/nannies.tsx"),
] satisfies RouteConfig;
