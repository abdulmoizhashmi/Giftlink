import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('giftlink_user') || 'null'));
  const save = (payload) => { setUser(payload.user); localStorage.setItem('giftlink_user', JSON.stringify(payload.user)); localStorage.setItem('giftlink_token', payload.token); };
  const logout = () => { setUser(null); localStorage.removeItem('giftlink_user'); localStorage.removeItem('giftlink_token'); };
  const value = useMemo(() => ({ user, setUser, save, logout, isAuthenticated: !!user }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }
