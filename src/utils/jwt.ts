// TypeScript types for user and token payload
interface User {
  id: string;
  email: string;
}

interface TokenPayload {
  id: string;
  email: string;
  exp: number;
}

// Fake JWT implementation for the sake of simplicity

export const generateToken = (user: User): string => {
  // Simple JWT-like token generation
  const payload: TokenPayload = {
    id: user.id,
    email: user.email,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  return btoa(JSON.stringify(payload));
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const payload: TokenPayload = JSON.parse(atob(token));
    if (payload.exp <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};
