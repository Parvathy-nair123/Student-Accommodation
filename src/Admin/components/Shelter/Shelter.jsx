import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./Shelter.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function BasicTable() {
  const [propertiesList, setPropertiesList] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    const propertiesSnapshot = await getDocs(
      query(collection(db, "properties"))
    );
    const data = propertiesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPropertiesList(data);
  };

  const handleViewMore = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const handleApprove = async (docId) => {
    const propertyRef = doc(db, "properties", docId);
    await updateDoc(propertyRef, {
      property_status: 1,
    });
    // Refresh the properties list
    getProperties();
    setSelectedProperty(null);
  };

  const handleDelete = async (docId) => {
    const propertyRef = doc(db, "properties", docId);
    await deleteDoc(propertyRef);
    // Refresh the properties list
    setSelectedProperty(null);
    getProperties();
  };

  return (
    <div className="Table">
      <h3>All Shelters</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table
          sx={{ minWidth: 650, overflowY: "scroll" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Place</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Rooms</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {propertiesList.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.property_name}</TableCell>
                <TableCell align="left">{row.property_place}</TableCell>
                <TableCell align="left">
                  <span className="status">{row.property_price}</span>
                </TableCell>
                <TableCell align="left">
                  <span className="status">{row.property_rooms}</span>
                </TableCell>
                <TableCell align="left" className="Details">
                  <button
                    className="view-more-button"
                    onClick={() => handleViewMore(row)}
                  >
                    View More
                  </button>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={!!selectedProperty}
        onClose={handleCloseModal}
        sx={{
          margin: "10px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "scroll",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* Property Details */}
          {selectedProperty && (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                {selectedProperty.property_name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Location: {selectedProperty.property_place}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price: {selectedProperty.property_price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Rooms: {selectedProperty.property_rooms}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Furnished: {selectedProperty.property_furnished ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Kitchen: {selectedProperty.property_kitchen}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Details: {selectedProperty.property_details}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Property Photos
              </Typography>
              {selectedProperty.property_photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  width="120"
                  height="120"
                  alt={`Property Photo ${index + 1}`}
                />
              ))}

              {/* Approve and Delete Buttons */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                {selectedProperty.property_status == 1 ? (
                  ""
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApprove(selectedProperty.id)}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(selectedProperty.id)}
                >
                  Delete
                </Button>
              </Box>
            </>
          )}

          {/* Close Button */}
          <Button
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            X
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
