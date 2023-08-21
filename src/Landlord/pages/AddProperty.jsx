import React, { useState } from "react";
import { v4 } from "uuid";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../Common/Style/styles.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const AddPropertyForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [pincode, setPincode] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState([]);
  const [rooms, setRooms] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [price, setPrice] = useState("");
  const [rentType, setRentType] = useState("weekly");
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [landlordId, setLandlordId] = useState(sessionStorage.getItem("lid"));
  const [status, setStatus] = useState(false);

  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLatitude, setSelectedLatitude] = useState("51.509865");
  const [selectedLongitude, setSelectedLongitude] = useState("-0.118092");

  const propertyCollectionRef = collection(db, "properties");
  const [isLoading, setIsLoading] = useState(false);

  const handleMapClick = () => {
    setShowMapModal(true);
  };

  const handleModalClose = () => {
    setShowMapModal(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const errors = [];

    if (!name) {
      errors.push("Name is required.");
    }

    if (!place) {
      errors.push("Place is required.");
    }

    if (!pincode) {
      errors.push("Pincode is required ");
    }

    if (!details) {
      errors.push("Details are required.");
    }

    if (photos.length === 0) {
      errors.push("At least one photo is required.");
    }

    if (!rooms || !Number.isInteger(parseInt(rooms))) {
      errors.push("Number of rooms is required and must be an integer.");
    }

    if (!kitchen || !Number.isInteger(parseInt(kitchen))) {
      errors.push("Number of kitchen is required and must be an integer.");
    }

    if (!bathrooms || !Number.isInteger(parseInt(bathrooms))) {
      errors.push("Number of bathrooms is required and must be an integer.");
    }

    if (!price || isNaN(parseFloat(price))) {
      errors.push("Price is required and must be a number.");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      setFormSuccess(false);
      setIsLoading(false);
      return;
    }

    const imageUrls = [];
    for (const photo of photos) {
      const imageRef = ref(storage, `propertyPhoto/${v4()}`);
      await uploadBytes(imageRef, photo);
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }

    await addDoc(propertyCollectionRef, {
      landlord_id: landlordId,
      property_name: name,
      property_place: place.toLowerCase(),
      property_pincode: pincode,
      property_latitude: selectedLatitude,
      property_longitude: selectedLongitude,
      property_details: details,
      property_photos: imageUrls,
      property_rooms: rooms,
      property_kitchen: kitchen,
      property_bathrooms: bathrooms,
      property_price: price,
      property_furnished: furnished,
      property_renttype: rentType,
      property_status: 0,
      timestamp: serverTimestamp(),
    });

    setIsLoading(false);
    setFormErrors([]);
    setFormSuccess(true);

    toast.success("Added successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/Landlord");
  };

  const handlePhotoChange = (event) => {
    const files = event.target.files;
    const selectedPhotos = Array.from(files);
    setPhotos(selectedPhotos);
  };

  const changePosition = (event) => {
    const { latlng } = event;
    const { lat, lng } = latlng;
    setSelectedLatitude(lat);
    setSelectedLongitude(lng);
    setStatus(true);
  };

  const MapComponent = () => {
    useMapEvents({
      click: changePosition,
    });

    return <Marker position={[selectedLatitude, selectedLongitude]} />;
  };

  return (
    <div className="form-container">
      <Modal isOpen={showMapModal} onRequestClose={handleModalClose}>
        <div className="modal-header">
          <h3>Map</h3>
          <button onClick={handleModalClose}>Close</button>
        </div>
        <div className="modal-body">
          <MapContainer
            center={[selectedLatitude, selectedLongitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[selectedLatitude, selectedLongitude]} />
            <MapComponent
              latitude={selectedLatitude}
              longitude={selectedLongitude}
            />
          </MapContainer>
        </div>
      </Modal>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Place:</label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label>Pincode:</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Map:</label>
            <button type="button" onClick={handleMapClick}>
              {status ? "Location Selected" : "Select Location"}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Details:</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Photo:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Rooms:</label>
            <input
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              required
              step="1"
            />
          </div>
          <div className="col">
            <label>Kitchen:</label>
            <input
              type="number"
              value={kitchen}
              onChange={(e) => setKitchen(e.target.value)}
              required
              step="1"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Bathrooms:</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              required
              step="1"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              step="0.01"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Furnished:</label>
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
          <div className="col">
            <label>Rent Type:</label>
            <label>
              <input
                type="radio"
                checked={rentType === "weekly"}
                onChange={() => setRentType("weekly")}
              />{" "}
              Weekly
            </label>
            <label>
              <input
                type="radio"
                checked={rentType === "monthly"}
                onChange={() => setRentType("monthly")}
              />{" "}
              Monthly
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
      {formErrors.length > 0 && (
        <div className="error-message">
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {/* {formSuccess && (
        <div className="success-message">
          Form submitted successfully!
        </div>
      )} */}
    </div>
  );
};

export default AddPropertyForm;
