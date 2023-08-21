import React, { useEffect } from "react";
import "../../Common/Style/ViewProperty.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ViewProperty() {
  const [propertyList, setPropertyList] = useState([]);

  const getCount = async () => {
    const propertyCountQuerySnapshot = await getDocs(
      query(
        collection(db, "properties"),
        where("landlord_id", "==", sessionStorage.getItem("lid"))
      )
    );
    if (propertyCountQuerySnapshot.docs.length > 0) {
      const data = propertyCountQuerySnapshot.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      setPropertyList(data);
    }
  };

  useEffect(() => {
    getCount();
  }, [propertyList]);

  const handleDelete = async (propertyId) => {
    await deleteDoc(doc(db, "properties", propertyId));
    setPropertyList((prevPropertyList) =>
      prevPropertyList.filter((property) => property.property_id !== propertyId)
    );
  };

  const handleEdit = async (propertyId) => {};

  return (
    <table className="property-table">
      <thead>
        <tr>
          <th> Name</th>
          <th> Price</th>
          <th> Rooms</th>
          <th> Bathrooms</th>
          <th> Kitchen</th>
          <th> Furnished</th>
          <th> Place</th>
          <th> Action</th>
        </tr>
      </thead>
      <tbody>
        {propertyList.map((item, key) => (
          <tr key={key}>
            <td>{item.property_name}</td>
            <td>£{item.property_price}</td>
            <td>{item.property_rooms}</td>
            <td>{item.property_bathrooms}</td>
            <td>{item.property_kitchen}</td>
            <td>{item.property_furnished ? "Yes" : "No"}</td>
            <td>{item.property_place}</td>
            <td>
              <button
                className="deleteButton"
                onClick={() => handleDelete(item.propertyId)}
              >
                Delete
              </button>
              &nbsp;
              <button className="deleteButton">
                <Link to={`/Landlord/UpdateProperty/${item.propertyId}`}>
                  Edit
                </Link>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
