import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route(
      ".well-known/appspecific/com.chrome.devtools.json",
      "routes/devtools-json.ts",
    ),
    route("favorites", "routes/favorites.tsx"),
    route("nannies", "routes/nannies.tsx"),
  ]),
] satisfies RouteConfig;
