
import {  useSelector } from "react-redux";

export const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? element : "not allowd";
};
