import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import links from "../utils/Links";
import { toggleSidebar } from "../features/user/userSlice";
import { useAppSelector, useAppDispatch } from "../reduxHooks";
import Logo from "./Logo";
import { RootState } from "../store";

const SmallSidebar: React.FC = () => {
  const { isSidebarOpen } = useAppSelector((store: RootState) => store.user);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
		{links.map((link) => {
			const { text, path, id, icon } = link;

			return (
				<NavLink
					to={path}
					className={({ isActive }) =>
						isActive ? "nav-link active" : "nav-link"
					}
					key={id}
					onClick={toggle}>
					<span className='icon'>{icon}</span>
					{text}
				</NavLink>
			);
		})}
	</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
