import "../../Common/Style/header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

const Header = () => {
  return (
    <div className="header">
      <div
        className="headerContainer"
      >
        <div className="headerList"></div>

        <h1 className="headerTitle">
          Rent your property, unlock its potential.
        </h1>
        <p className="headerDesc">
        Owning a property is an opportunity to let your investment bloom. Renting it out is an avenue to share its warmth, turning houses into homes for those seeking shelter. 
        </p>
      </div>
    </div>
  );
};

export default Header;
