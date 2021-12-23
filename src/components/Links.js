import { Link } from "react-router-dom";
const Links = () => {
  return (
    <div id="links">
      <nav>
        <p className="path">
          <Link to="/home">Home</Link>
        </p>
        <p className="path">
          <Link to="/moviecomparisonquiz">Movie Comparison Quiz</Link>
        </p>
        <p className="path">
          <Link to="/usercomparisonquiz">Custom Comparison Quiz</Link>
        </p>
        <p className="path">
          <Link to="/usermovieslist">My List</Link>
        </p>
        <p className="path">
          <Link to="/addmovies">Add Movies to My List</Link>
        </p>
      </nav>
    </div>
  );
};

export default Links;
