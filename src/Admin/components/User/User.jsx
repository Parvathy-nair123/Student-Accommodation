import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./User.css";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../config/firebase";


export default function BasicTable() {
  const [usersList, setusersList] = React.useState([]);

  React.useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const usersCountQuerySnapshot = await getDocs(
      query(collection(db, "users"))
    );
    if (usersCountQuerySnapshot.docs.length > 0) {
      const data = usersCountQuerySnapshot.docs.map((doc) => doc.data());
      setusersList(data);
    }
  };
  return (
    <div className="Table">
      <h3>Registered Users</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650,overflowY :"scroll" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {usersList.map((row, key) => (
              <TableRow
                key={key + 1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {key + 1}
                </TableCell>
                <TableCell align="left">{row.user_name}</TableCell>
                <TableCell align="left">{row.user_contact}</TableCell>
                <TableCell align="left">
                  <span className="status" >{row.user_email}</span>
                </TableCell>
                <TableCell align="left" className="Details">{row.user_address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
