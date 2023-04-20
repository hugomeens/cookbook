import { useContext } from "react";
import AuthContext from "./auth-provider";

const useAuth = () => useContext(AuthContext);

export default useAuth;