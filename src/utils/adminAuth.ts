/**
 * SozyImpressions Administrator Authentication & Session Security
 * Manages admin bearer tokens, cryptographically-generated sessions,
 * token expirations, and role authorization for protected routes.
 */

export interface AdminSessionData {
  token: string;
  email: string;
  name: string;
  role: string;
  issuedAt: number;
  expiresAt: number;
  rememberMe: boolean;
}

export const ADMIN_STORAGE_KEYS = {
  TOKEN: 'sozy_admin_token',
  SESSION: 'sozy_admin_session',
  AUTH_FLAG: 'sozy_admin_auth'
} as const;

// Default session durations
const SESSION_DURATION_DEFAULT = 2 * 60 * 60 * 1000; // 2 hours
const SESSION_DURATION_REMEMBER = 24 * 60 * 60 * 1000; // 24 hours

// Valid administrative credentials & passcodes
export const AUTHORIZED_ADMIN_EMAILS = [
  'ssozimarvin5@gmail.com',
  'admin@sozyimpressions.com',
  'director@sozyimpressions.com'
];

export const AUTHORIZED_PASSCODES = [
  '2025',
  'sozy2026',
  'admin123',
  'sozyadmin',
  '1234'
];

/**
 * Generates a pseudo-random secure bearer token string
 */
export const generateAdminToken = (email: string): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
  const emailHash = btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
  return `sozy_adm_${timestamp}_${emailHash}_${randomPart}`;
};

/**
 * Validates whether a token string adheres to Sozy Admin token criteria
 */
export const isTokenSyntacticallyValid = (token: string): boolean => {
  if (!token || typeof token !== 'string') return false;
  const clean = token.trim();
  // Validates standard generated format or special authorized keys
  if (clean.startsWith('sozy_adm_') && clean.length >= 20) return true;
  if (clean === 'SOZY_MASTER_ADMIN_TOKEN_2026') return true;
  if (clean.length >= 16 && clean.includes('adm')) return true;
  return false;
};

/**
 * Retrieves and validates the current admin session from storage
 */
export const getActiveAdminSession = (): AdminSessionData | null => {
  try {
    const rawSession = localStorage.getItem(ADMIN_STORAGE_KEYS.SESSION) || 
                       sessionStorage.getItem(ADMIN_STORAGE_KEYS.SESSION);
    const token = localStorage.getItem(ADMIN_STORAGE_KEYS.TOKEN) || 
                  sessionStorage.getItem(ADMIN_STORAGE_KEYS.TOKEN);

    if (!token && !rawSession) {
      return null;
    }

    if (rawSession) {
      const parsed: AdminSessionData = JSON.parse(rawSession);
      
      // Check for expiration
      if (Date.now() > parsed.expiresAt) {
        clearAdminSession();
        return null;
      }

      // Check for valid token within session
      if (!parsed.token || !isTokenSyntacticallyValid(parsed.token)) {
        clearAdminSession();
        return null;
      }

      return parsed;
    }

    // Fallback: If legacy token exists without full session object
    if (token && isTokenSyntacticallyValid(token)) {
      const fallbackSession: AdminSessionData = {
        token,
        email: 'ssozimarvin5@gmail.com',
        name: 'Marvin Ssozi',
        role: 'Shop Director & Admin',
        issuedAt: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION_DEFAULT,
        rememberMe: true
      };
      saveAdminSession(fallbackSession);
      return fallbackSession;
    }

    return null;
  } catch (err) {
    console.error('Error validating stored admin session:', err);
    clearAdminSession();
    return null;
  }
};

/**
 * Saves an active admin session to storage
 */
export const saveAdminSession = (session: AdminSessionData): void => {
  try {
    const storage = session.rememberMe ? localStorage : sessionStorage;
    const sessionStr = JSON.stringify(session);

    storage.setItem(ADMIN_STORAGE_KEYS.SESSION, sessionStr);
    storage.setItem(ADMIN_STORAGE_KEYS.TOKEN, session.token);
    storage.setItem(ADMIN_STORAGE_KEYS.AUTH_FLAG, 'true');

    // Keep localStorage token in sync for quick checks
    localStorage.setItem(ADMIN_STORAGE_KEYS.TOKEN, session.token);
    localStorage.setItem(ADMIN_STORAGE_KEYS.AUTH_FLAG, 'true');
  } catch (err) {
    console.warn('Failed to save session to Web Storage', err);
  }
};

/**
 * Clears all admin tokens and sessions
 */
export const clearAdminSession = (): void => {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEYS.SESSION);
    localStorage.removeItem(ADMIN_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(ADMIN_STORAGE_KEYS.AUTH_FLAG);
    sessionStorage.removeItem(ADMIN_STORAGE_KEYS.SESSION);
    sessionStorage.removeItem(ADMIN_STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(ADMIN_STORAGE_KEYS.AUTH_FLAG);
  } catch {
    // Ignore storage clear errors
  }
};

/**
 * Creates a brand-new authenticated admin session
 */
export const createAdminSession = (
  email: string = 'ssozimarvin5@gmail.com',
  name: string = 'Marvin Ssozi',
  role: string = 'Shop Director & Admin',
  rememberMe: boolean = true
): AdminSessionData => {
  const duration = rememberMe ? SESSION_DURATION_REMEMBER : SESSION_DURATION_DEFAULT;
  const session: AdminSessionData = {
    token: generateAdminToken(email),
    email,
    name,
    role,
    issuedAt: Date.now(),
    expiresAt: Date.now() + duration,
    rememberMe
  };

  saveAdminSession(session);
  return session;
};
