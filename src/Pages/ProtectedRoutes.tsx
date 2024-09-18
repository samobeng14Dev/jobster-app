import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { RootState } from "../store";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user } = useAppSelector((store: RootState) => store.user);

  if (!user) {
    return <Navigate to="/landing" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
