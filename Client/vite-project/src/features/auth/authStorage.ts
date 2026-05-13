import type { AuthState } from './authSlice';

const AUTH_STORAGE_KEY = 'auth';

const getRoleFromUsername = (username: string): 'Admin' | 'User' =>
  username.trim().toLowerCase() === 'admin' ? 'Admin' : 'User';

export const loadAuthState = (): AuthState | undefined => {
  // This guard keeps the helper safe if the code ever runs outside the browser.
  if (typeof window === 'undefined') {
    return undefined;
  }

  const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuth) {
    return undefined;
  }

  try {
    const parsedAuth = JSON.parse(storedAuth) as AuthState;

    // Ignore incomplete or logged-out snapshots and fall back to the slice defaults.
    if (!parsedAuth.user || !parsedAuth.isAuthenticated) {
      return undefined;
    }

    return {
      ...parsedAuth,
      user: {
        ...parsedAuth.user,
        role: parsedAuth.user.role ?? getRoleFromUsername(parsedAuth.user.username),
      },
    };
  } catch {
    return undefined;
  }
};

export const saveAuthState = (authState: AuthState) => {
  // The store is the source of truth; storage only mirrors meaningful logged-in state.
  if (typeof window === 'undefined') {
    return;
  }

  if (!authState.user || !authState.isAuthenticated) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
};
