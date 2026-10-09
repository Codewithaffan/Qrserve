import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** `false` during SSR and hydration, `true` afterwards. Avoids setState-in-effect for portals. */
export function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
