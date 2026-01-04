import pxLogo from "/v1.svg";
import "./Welcome.css";
import { Link } from "react-router";

// @veronika update this page to be more PX-sy, add a small description and links to the task

const LinkComp = () => {
  return (
    <Link to="/resultViz" target="_blank" rel="noreferrer">
      {"/resultViz"}
    </Link>
  );
};

const Welcome: React.FC = () => {
  return (
    <>
      <div className="card">
        <p className="read-the-docs">
          Navigate to <LinkComp /> to start!
        </p>
      </div>
    </>
  );
};

export default Welcome;
