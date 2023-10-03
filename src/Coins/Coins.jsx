import "./Coins.css";
import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TablePagination,
  CircularProgress
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1";

const Coins = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios(API_URL)
      .then((response) => {
        setCryptoData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = cryptoData.filter((crypto) => {
    const { name, symbol } = crypto;
    const searchTerm = searchText.toLowerCase();
    return (
      name.toLowerCase().includes(searchTerm) ||
      symbol.toLowerCase().includes(searchTerm)
    );
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
    {loading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
        >
        <CircularProgress color="primary" size={80} />
      </div>
      ) : (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Cryptocurrency"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "16px" }}
            id="search-field"
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="table-header">
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Price (USD)</TableCell>
                  <TableCell>Market Cap (USD)</TableCell>
                  <TableCell>24h Change (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((crypto) => (
                  <TableRow key={crypto.id} className="table-row">
                    <TableCell>
                      <img
                        alt="coin"
                        style={{ width: "40px", marginRight: "5px" }}
                        src={crypto.image}
                      />
                      <Link to= {`coins/${crypto.id}`} > {crypto.name} </Link>
                    </TableCell>
                    <TableCell>{crypto.symbol}</TableCell>
                    <TableCell>${crypto.current_price.toFixed(2)}</TableCell>
                    <TableCell>${crypto.market_cap.toLocaleString()}</TableCell>
                    <TableCell
                      style={{
                        color:
                          crypto.price_change_percentage_24h >= 0
                            ? "green"
                            : "red"
                      }}
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="pagination"
            />
          </TableContainer>
        </>
    )}
    </>
  );
};

export default Coins;
