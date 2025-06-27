// src/utils/navigation.js
let navigateFn = null;
let setLoadingFn = null;
let authContext = null;

export function initNavigation({ navigate, setLoading, auth }) {
  navigateFn = navigate;
  setLoadingFn = setLoading;
  authContext = auth;
}

export async function navigatePage(url) {
  if (!navigateFn || !setLoadingFn) {
    console.error("Navigation not initialized");
    return;
  }

  setLoadingFn(true);
  try {
    const fullURL = `/lucida-workspace/${url}`;
    navigateFn(fullURL);
  } catch (error) {
    console.error("Failed to navigate:", error);
  } finally {
    setTimeout(() => {
      setLoadingFn(false);
    }, 1000);
  }
}

export async function changeWorkspace(workspaceURL) {
  if (!navigateFn || !setLoadingFn || !authContext) {
    console.error("Navigation not properly initialized");
    return;
  }

  const { updateUserWorkspaceURL, currentUser } = authContext;

  setLoadingFn(true);
  try {
    await updateUserWorkspaceURL(workspaceURL);
    currentUser.workspaceURL = workspaceURL;
    navigateFn(`/${workspaceURL}`);
  } catch (error) {
    console.error("Failed to switch workspace:", error);
  } finally {
    setTimeout(() => {
      setLoadingFn(false);
    }, 1000);
  }
}
