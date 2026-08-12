import { useNavigate } from "react-router";
import HorizantalIcon from "../../../assets/horizontal-transparent-darkUI.png";

function TopNav() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-40 bg-surface/80 backdrop-blur-md border-b border-surface-container-high h-14 flex justify-between items-center px-margin-page">
      <div className="flex items-center gap-stack-compact">
        <img src={HorizantalIcon} alt="Workly Logo" className="h-8 w-auto" />
      </div>

      <div className="hidden md:flex items-center gap-gutter font-label-md text-label-md text-on-surface-variant">
        <a className="hover:text-primary transition-colors" href="#features">
          Features
        </a>
        <a className="hover:text-primary transition-colors" href="#pricing">
          Pricing
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Documentation
        </a>
      </div>

      <div className="flex items-center gap-stack-compact">
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-on-primary font-label-md text-label-md px-container-padding py-unit rounded flex items-center gap-unit hover:bg-primary-fixed transition-colors"
        >
          Login
        </button>
      </div>
    </nav>
  );
}

export default TopNav;
