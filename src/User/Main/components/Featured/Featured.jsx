import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://wallpaperaccess.com/full/1201680.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>London Bridge</h1>
          <h2>United Kingdom</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://wallpaperaccess.com/full/114077.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>The Village </h1>
          <h2>London</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://wallpaperaccess.com/full/1201714.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Clock Tower</h1>
          <h2>London </h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
