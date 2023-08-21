import { useNavigate } from "react-router-dom";
import "../../../Common/Style/Favourite.css";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [id, setID] = useState([]);
  const favoritesRef = collection(db, "favorites");
  const navigate = useNavigate();
  const viewProperty = (propertyId) => {
    navigate(`/User/ViewMore/${propertyId}`);
  };

  const removeFavorite = async (event, favoriteId) => {
    event.stopPropagation();
    try {
      const docRef = doc(favoritesRef, favoriteId);
      await deleteDoc(docRef);
      getData();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const favorites = [];
    const userId = sessionStorage.getItem("uid");
    const querySnapshot = await getDocs(
      query(favoritesRef, where("user_id", "==", userId))
    );

    const favoriteData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      propertyId: doc.data().property_id,
    }));

    setID(favoriteData.map((data) => data.propertyId));

    for (const data of favoriteData) {
      const propertyDocRef = doc(db, "properties", data.propertyId);
      const propertySnapshot = await getDoc(propertyDocRef);

      if (propertySnapshot.exists()) {
        const propertyData = {
          id: propertySnapshot.id,
          favoriteId: data.id,
          ...propertySnapshot.data(),
        };
        favorites.push(propertyData);
      }
    }

    setFavorites(favorites);
  };

  return (
    <>
      {favorites.map((item, key) => (
        <div
          className="searchItem"
          key={key}
          onClick={() => viewProperty(id[key])}
        >
          <img src={item.property_photos[0]} alt="" className="siImg" />
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
              <span className="siPrice">${item.property_price}</span>
              <button
                className="removeButton"
                onClick={(event) => removeFavorite(event, item.favoriteId)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Favourite;
