// Fake JWT implementation for the sake of simplicity

export const generateToken = (user) => {
  // Simple JWT-like token generation
  const payload = {
    id: user.id,
    email: user.email,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  
  return btoa(JSON.stringify(payload));
};

export const verifyToken = (token) => {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};