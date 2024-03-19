

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Button } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Individual Sport");

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let apiUrl = "";
      if (selectedOption === "Individual Sport") {
        apiUrl = "http://localhost:8083/registrations/alldata";
      } else if (selectedOption === "Team Event") {
        apiUrl = "http://localhost:8083/teams";
      }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const handleDelete = (id) => {
  //   fetch(`http://localhost:8083/teams/deleteteam/13`, {
  //     method: 'DELETE'
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const updatedData = data.filter(item => item.id !== id);
  //     setData(updatedData);
  //     console.log('Data deleted successfully');
  //     fetchData();
  //     window.location.reload();
  //   })
  //   .catch(error => console.error('Error deleting data:', error));
  // };

  const handleDelete = (id) => {
    let apiUrl = "";
    if (selectedOption === "Individual Sport") {
      apiUrl = `http://localhost:8083/registrations/delete/${id}`;
    } else if (selectedOption === "Team Event") {
      apiUrl = `http://localhost:8083/teams/deleteteam/${id}`;
    }
    
    fetch(apiUrl, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
      console.log('Data deleted successfully');
      toast.delete("Data deleted Successfully")
      
    })
    .catch(error => console.error('Error deleting data:', error));
  };
  

  return (
    <>
      <h3 className="titles">Dashboard</h3>
      <RadioGroup
        row
        aria-label="option"
        name="option"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <FormControlLabel
          value="Individual Sport"
          control={<Radio />}
          label="Individual Sport"
        />
        <FormControlLabel
          value="Team Event"
          control={<Radio />}
          label="Team Event"
        />
      </RadioGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {selectedOption === "Individual Sport" ? (
                <>
                  <StyledTableCell>Serial Number</StyledTableCell>
                  <StyledTableCell align="right">SAP ID</StyledTableCell>
                  <StyledTableCell align="right">Sport</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </>
              ) : (
                <>
                  <StyledTableCell>Team Name</StyledTableCell>
                  <StyledTableCell align="right">Captain SAP ID</StyledTableCell>
                  <StyledTableCell align="right">Captain Name</StyledTableCell>
                  <StyledTableCell align="right">Sport</StyledTableCell>
                  <StyledTableCell align="right">Location</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <StyledTableRow key={item.id}>
                  {selectedOption === "Individual Sport" ? (
                    <>
                      <StyledTableCell>{item.id}</StyledTableCell>
                      <StyledTableCell align="right">{item.sapid}</StyledTableCell>
                      <StyledTableCell align="right">{item.sport}</StyledTableCell>
                      <StyledTableCell align="right">{item.name}</StyledTableCell>
                      <StyledTableCell align="right"><Button onClick={() => handleDelete(item.id)}>Delete</Button></StyledTableCell>
                    </>
                  ) : (
                    <>
                      <StyledTableCell>{item.teamName}</StyledTableCell>
                      <StyledTableCell align="right">{item.captainSapId}</StyledTableCell>
                      <StyledTableCell align="right">{item.captainName}</StyledTableCell>
                      <StyledTableCell align="right">{item.sport}</StyledTableCell>
                      <StyledTableCell align="right">{item.location}</StyledTableCell>
                      <StyledTableCell align="right"><Button onClick={() => handleDelete(item.id)}>Delete</Button></StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </>
  );
};

export default Admin;







