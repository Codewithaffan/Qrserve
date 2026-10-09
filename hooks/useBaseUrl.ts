import { useSyncExternalStore } from "react";

const FALLBACK = process.env.NEXT_PUBLIC_APP_URL ?? "https://qrserve.app";

/**
 * Base URL encoded into table QR codes.
 * Uses the current origin in the browser so demo QR codes actually open this app.
 */
export function useBaseUrl() {
  return useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => FALLBACK,
  );
}
