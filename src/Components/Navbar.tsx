import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { RootState } from "../store";
import { toggleSidebar,logoutUser } from "../features/user/userSlice";

const Navbar: React.FC = () => {
  const { user } = useAppSelector((store: RootState) => store.user);
  const dispatch = useAppDispatch();

  const [showLogout, setShowLogout] = useState(false);

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
      </div>
      <div className="btn-container">
        <button
          type="button"
          className="btn"
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaUserCircle />
          {user?.name}
          <FaCaretDown />
        </button>
        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
          <button
            onClick={()=>{dispatch(logoutUser())}}
            className="dropdown-btn"
          >
            logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
