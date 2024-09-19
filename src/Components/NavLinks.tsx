import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/Links";

// Define the type for the props
interface NavLinksProps {
  toggleSidebar?: () => void;
}
interface LinkType {
    id: number;
    text: string;
    path: string;
    icon: ReactNode;  
  }
const NavLinks: React.FC<NavLinksProps> = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link:LinkType) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
