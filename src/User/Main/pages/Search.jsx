import "../../../Common/Style/search.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../../Common/Style/Item.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
const Search = () => {
  const location = useLocation();
  const [place, setPlace] = useState(location.state.destination.toLowerCase());
  const [propertyList, setPropertyList] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [rent, setRent] = useState("");
  const navigate = useNavigate();
  const viewProperty = (propertyId) => {
    navigate(`/User/ViewMore/${propertyId}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const searchQuery = place.toLowerCase();

      const lowercaseQuerySnapshot = await getDocs(
        query(
          collection(db, "properties"),
          where("property_place", ">=", searchQuery),
          where("property_place", "<=", searchQuery + "\uf8ff"),
          where("property_status", "==", 1)
        )
      );

      const capitalizedQuerySnapshot = await getDocs(
        query(
          collection(db, "properties"),
          where("property_place", ">=", capitalizeFirstLetter(searchQuery)),
          where(
            "property_place",
            "<=",
            capitalizeFirstLetter(searchQuery) + "\uf8ff"
          ),
          where("property_status", "==", 1)
        )
      );

      const uppercaseQuerySnapshot = await getDocs(
        query(
          collection(db, "properties"),
          where("property_place", ">=", searchQuery.toUpperCase()),
          where("property_place", "<=", searchQuery.toUpperCase() + "\uf8ff"),
          where("property_status", "==", 1)
        )
      );

      const lowercaseData = lowercaseQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const uppercaseData = uppercaseQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const capitalizedData = capitalizedQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const data = [...lowercaseData, ...capitalizedData, ...uppercaseData];

      setPropertyList(data);
    };

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    fetchData();
  }, [place]);
  const searchRooms = async () => {
    let queryRef = collection(db, "properties");
    if (place !== "") {
      queryRef = query(queryRef, where("property_place", "==", place));
    }
    if (minPrice !== "") {
      queryRef = query(queryRef, where("property_price", ">=", minPrice));
    }
    if (maxPrice !== "") {
      queryRef = query(queryRef, where("property_price", "<=", maxPrice));
    }
    if (rooms !== "") {
      queryRef = query(queryRef, where("property_rooms", "==", rooms));
    }
    if (bathrooms !== "") {
      queryRef = query(queryRef, where("property_bathrooms", "==", bathrooms));
    }
    if (kitchen !== "") {
      queryRef = query(queryRef, where("property_kitchen", "==", kitchen));
    }
    if (furnished !== "") {
      queryRef = query(queryRef, where("property_furnished", "==", furnished));
    }
    if (rent !== "") {
      queryRef = query(queryRef, where("property_renttype", "==", rent));
    }

    queryRef = query(queryRef, where("property_status", "==", 1));
    const houseQuerySnapshot = await getDocs(queryRef);
    const data = houseQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPropertyList(data);
  };
  return (
    <div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Location</label>
              <input
                value={place}
                type="text"
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Rooms</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    onChange={(e) => setRooms(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Bathrooms</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    onChange={(e) => setBathrooms(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Kitchen</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    onChange={(e) => setKitchen(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Farnished</span>
                  <label>
                    <input
                      type="radio"
                      checked={furnished}
                      onChange={() => setFurnished(true)}
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={!furnished}
                      onChange={() => setFurnished(false)}
                    />{" "}
                    No
                  </label>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Rent</span>
                  <input
                    type="radio"
                    name="Rent"
                    value={"monthly"}
                    onChange={(e) => setRent(e.target.value)}
                  />
                  Monthly
                  <input
                    type="radio"
                    name="Rent"
                    value={"weekly"}
                    onChange={(e) => setRent(e.target.value)}
                  />
                  Weekly
                </div>
              </div>
            </div>
            <button onClick={searchRooms}>Search</button>
          </div>
          <div className="listResult">
            {propertyList.length === 0 ? (
              <div className="searchItem">
                <h3>No Properties Found</h3>
              </div>
            ) : (
              propertyList.map((item, key) => (
                <div
                  className="searchItem"
                  onClick={() => viewProperty(item.id)}
                  key={key}
                >
                  {item.property_photos && item.property_photos.length > 0 && (
                    <img src={item.property_photos[0]} className="siImg" />
                  )}
                  <div className="siDesc">
                    <h1 className="siTitle">{item.property_name}</h1>
                    <span className="siSubtitle">{item.property_place}</span>
                    <span className="siFeatures">
                      • {item.property_rooms} rooms • {item.property_bathrooms}{" "}
                      bathrooms • {item.property_kitchen} Kitchen
                    </span>
                  </div>
                  <div className="siDetails">
                    <div className="siDetailTexts">
                      <span className="siPrice">£{item.property_price}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
