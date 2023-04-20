import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role') ?? 'user');

    return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
};

const logout = () => {
    localStorage.removeItem('role');
    window.location.href = '/auth';
};

export default AuthContext;
export { AuthProvider, logout };
