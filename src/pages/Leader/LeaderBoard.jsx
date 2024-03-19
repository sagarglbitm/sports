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

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState("All");

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:8080/performance/getPer");
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }
      const data = await response.json();
      setLeaderboardData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setLoading(false);
    }
  };

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const filteredData = selectedSport === "All" ? leaderboardData : leaderboardData.filter((row) => row.sportName === selectedSport);

  return (
    <>
      <h3 className="titles">Leader Board</h3>
      <RadioGroup
        row
        aria-label="sport"
        name="sport"
        value={selectedSport}
        onChange={handleSportChange}
      >
        <FormControlLabel
          value="All"
          control={<Radio />}
          label="All"
        />
        <FormControlLabel
          value="Football"
          control={<Radio />}
          label="Football"
        />
        <FormControlLabel
          value="cricket"
          control={<Radio />}
          label="cricket"
        />
        <FormControlLabel
          value="chess"
          control={<Radio />}
          label="Chess"
        />
        <FormControlLabel
          value="BasketBall"
          control={<Radio />}
          label="BasketBall"
        />
        <FormControlLabel
          value="tennis"
          control={<Radio />}
          label="tennis"
        />
        <FormControlLabel
          value="tabletennis"
          control={<Radio />}
          label="tabletennis"
        />
      </RadioGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Team Name</StyledTableCell>
              <StyledTableCell align="right">Sport Name</StyledTableCell>
              <StyledTableCell align="right">Rank</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.teamName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.sportName}</StyledTableCell>
                  <StyledTableCell align="right">{row.sportRank}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LeaderBoard;
