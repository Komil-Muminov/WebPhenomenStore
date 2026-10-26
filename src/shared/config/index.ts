export const AppRoutes = {
  HOME: "/",
  MENU: "/menu",
  SHOP: "/shop",
  CONTACT: "/contact",
} as const;

export type TAppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export const ApiRoutes = {
  SMOOTHIES_SEARCH: "/smoothies/search",
  SMOOTHIE_CREATE: "/smoothies/create",
  SMOOTHIE_UPDATE: "/smoothies/update/:id",
  SMOOTHIE_DELETE: "/smoothies/delete/:id",
} as const;

export type TApiRoutes = (typeof ApiRoutes)[keyof typeof ApiRoutes];

export const QUERY_KEYS = {
  SMOOTHIES: "SMOOTHIES",
} as const;

export type TQueryKeys = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
