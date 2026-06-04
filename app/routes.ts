import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("favourites", "routes/favourites.tsx"),
    route("nannies", "routes/nannies.tsx"),
  ]),
] satisfies RouteConfig;
