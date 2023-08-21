import React, { useState } from "react";
import Modal from "react-modal";
import "./form.css";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Landlord({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [proof, setProof] = useState("");
  const [password, setPassword] = useState("");
  const landlordCollectionRef = collection(db, "landlords");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const uid = auth?.currentUser?.uid;
      let imageUrl = "";
      let proofUrl = "";
      const imageRef = ref(storage, `landlordPhoto/${uid}`);
      const proofRef = ref(storage, `landlordProof/${uid}`);

      await uploadBytes(imageRef, photo);
      await uploadBytes(proofRef, proof);

      const url = await getDownloadURL(imageRef);
      imageUrl = url;

      const url2 = await getDownloadURL(proofRef);
      proofUrl = url2;

      await addDoc(landlordCollectionRef, {
        landlord_id: uid,
        landlord_name: name,
        landlord_contact: contact,
        landlord_email: email,
        landlord_address: address,
        landlord_photo: imageUrl,
        landlord_proof: proofUrl
      });

      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="registration-modal landlord"
      >
        <h2>Landlord Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Photo:</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label>Proof:</label>
            <input
              type="file"
              onChange={(e) => setProof(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <button onClick={onClose} className="close-button"></button>
      </Modal>
    </div>
  );
}
