import { getConfig } from "./config";

export function isNonSessionPage(router) {
  // Get the auth config
  let authConfig = getConfig();

  // We always bypass index.js
  if (router.asPath === "/") {
    return true;
  }

  // Now we check dynamically
  let match = false;
  authConfig.nonSessionPages.forEach((path) => {
    if (router.asPath.startsWith("/" + path)) {
      match = true;
    }
  });
  return match;
}
