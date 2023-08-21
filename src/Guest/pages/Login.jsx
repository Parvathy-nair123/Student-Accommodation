import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [swithStatus, setSwithStatus] = useState(true);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin@123") {
      navigate("/Admin");
    } else {
      try {
        const loginDetails = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const loginId = loginDetails.user.uid;
        const userQuerySnapshot = await getDocs(
          query(collection(db, "users"), where("user_id", "==", loginId))
        );
        const landlordQuerySnapshot = await getDocs(
          query(
            collection(db, "landlords"),
            where("landlord_id", "==", loginId)
          )
        );
        const communityQuerySnapshot = await getDocs(
          query(
            collection(db, "communities"),
            where("community_id", "==", loginId)
          )
        );
        if (userQuerySnapshot.docs.length > 0) {
          sessionStorage.setItem(
            "uid",
            userQuerySnapshot.docs[0].data()["user_id"]
          );
          sessionStorage.setItem(
            "uname",
            userQuerySnapshot.docs[0].data()["user_name"]
          );
          navigate("/User");
        } else if (landlordQuerySnapshot.docs.length > 0) {
          sessionStorage.setItem(
            "lid",
            landlordQuerySnapshot.docs[0].data()["landlord_id"]
          );
          navigate("/Landlord");
        } else if (communityQuerySnapshot.docs.length > 0) {
          sessionStorage.setItem(
            "cid",
            communityQuerySnapshot.docs[0].data()["community_id"]
          );
          navigate("/Community");
        }
        setIsLoading(false);
      } catch (err) {
        if (err.message == "Firebase: Error (auth/user-not-found).") {
          alert("Invalid Credentials");
        } else {
          alert("Something went wrong try again later");
        }
        setIsLoading(false);
      }
    }

    onClose();
  };

  const forgotPassword = () => {
    setSwithStatus(false);
  };

  const sendLink = async () => {
    setIsLoadingPassword(true);
    await sendPasswordResetEmail(auth, email);
    alert("Link Sended to Your Email");
    setIsLoadingPassword(false);
    loginState();
  };

  const loginState = () => {
    setSwithStatus(true);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="login-modal">
      <div className="modal-container">
        <button onClick={onClose} className="close-button">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {swithStatus ? (
          <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="form-group">
                <label className="forgot-password" onClick={forgotPassword}>
                  Forgot Password
                </label>
              </div>
              <button type="submit">
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Forgot Password</h2>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="forgot-password" onClick={loginState}>
                Back to Login
              </label>
            </div>
            <button type="submit" onClick={sendLink}>
              {isLoadingPassword ? "Sending..." : "Send Link"}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
