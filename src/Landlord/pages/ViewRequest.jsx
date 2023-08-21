import React, { useEffect, useState } from "react";
import "../../Common/Style/ViewProperty.css";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

export default function ViewRequests() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchLandlordProperties();
  }, []);

  const fetchLandlordProperties = async () => {
    const landlordId = sessionStorage.getItem("lid");

    try {
      const propertiesSnapshot = await getDocs(
        query(
          collection(db, "properties"),
          where("landlord_id", "==", landlordId)
        )
      );

      const propertyIds = propertiesSnapshot.docs.map(
        (propertyDoc) => propertyDoc.id
      );

      if (propertyIds.length === 0) {
        console.warn("No properties found for the landlord.");
        return;
      }

      const requestsSnapshot = await getDocs(
        query(
          collection(db, "requests"),
          where("property_id", "in", propertyIds)
        )
      );

      const propertiesWithRequests = [];

      await Promise.all(
        propertiesSnapshot.docs.map(async (propertyDoc) => {
          const propertyData = propertyDoc.data();
          const requestId = requestsSnapshot.docs.find(
            (requestDoc) => requestDoc.data().property_id === propertyDoc.id
          )?.id;

          if (requestId) {
            const requestSenderUserId = requestsSnapshot.docs
              .find((requestDoc) => requestDoc.id === requestId)
              ?.data().user_id;

            if (requestSenderUserId) {
              const userQuerySnapshot = await getDocs(
                query(
                  collection(db, "users"),
                  where("user_id", "==", requestSenderUserId)
                )
              );
              if (!userQuerySnapshot.empty) {
                const userData = userQuerySnapshot.docs[0].data();
                propertiesWithRequests.push({
                  id: propertyDoc.id,
                  property_name: propertyData.property_name,
                  user_name: userData ? userData.user_name : "N/A",
                  user_contact: userData ? userData.user_contact : "N/A",
                  user_email: userData ? userData.user_email : "N/A",
                });
              }
            }
          }
        })
      );

      setProperties(propertiesWithRequests);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      await deleteDoc(doc(db, "properties", propertyId));
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== propertyId)
      );
      toast.success("Deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <table className="property-table">
      <thead>
        <tr>
          <th>SL No</th>
          <th>Property</th>
          <th>User</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property, index) => (
          <tr key={property.id}>
            <td>{index + 1}</td>
            <td>{property.property_name}</td>
            <td>{property.user_name}</td>
            <td>{property.user_contact}</td>
            <td>{property.user_email}</td>
            <td>
              <button onClick={() => handleDelete(property.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
