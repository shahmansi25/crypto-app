import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Stack, Badge, Box, ListItem, Button, CircularProgress } from '@mui/material';
import ChartComponent from '../Chart/Chart';

const CoinDetails = () => {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState('24h');
  const navigate = useNavigate();
  const btns = ["24h", "7d", "14d", "60d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        break;
        case "7d":
        setDays("7d");
        break;
        case "14d":
        setDays("14d");
        break;
        case "1y":
        setDays("365d");
        break;
        case "60d":
        setDays("60d");
        break;
        case "max":
        setDays("max");
          break;
        default:
          setDays("24h");
          break;
    };
  }

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
      .then((response) => {
        setChartData(response.data.prices);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [id]);

  if (!cryptoData) {
    return (
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
    );
  }

  return (
    <Stack spacing={2}>
      <Button onClick={() => navigate(-1)} style= {{width:"15%"}} variant="outlined">Back</Button>
      <Typography fontWeight={"500"}>Last Updated on {new Date(cryptoData.market_data.last_updated).toLocaleString()}</Typography>
      <Stack>
        <img alt="crypto" src={cryptoData.image.large} style={{ width: "100px", height: "100px" }}></img>
         <ListItem >
          <Typography fontWeight={"700"} variant="subtitle1">{cryptoData.name}</Typography>
           <Badge style={{textAlign:"center", marginLeft:"25px"}} badgeContent={`#${cryptoData.market_cap_rank}`} color="primary" />
        </ListItem>
        <ListItem>
          <Typography fontWeight={"700"} variant="subtitle1">${cryptoData.market_data.current_price['usd']}</Typography>
        </ListItem>
     </Stack>
      <Box width="100%">
        <ChartComponent arr = {chartData} days= {days} currency = "$" />
        <Stack direction={"row"} padding= {"4"} overflow={'auto'}>
            {btns.map((i) => {
            return <Button variant= {days === i ?'contained' :'outlined'} key={i} onClick={() =>switchChartStats(i)}>{ i}</Button>
            })}
        </Stack>
      </Box>
      <Box width="100%">
        {cryptoData.market_data.max_supply && (
          <ListItem style={{justifyContent:"space-between"}}>
            <Typography fontWeight={"700"} variant="subtitle1">Max Supply:</Typography>
            <Typography variant="body2">{cryptoData.market_data.max_supply}</Typography>
          </ListItem>
        )}
        {cryptoData.market_data.circulating_supply && (
          <ListItem style={{justifyContent:"space-between"}}>
            <Typography fontWeight={"700"} variant="subtitle1">Circulating Supply:</Typography>
            <Typography variant="body2">{cryptoData.market_data.circulating_supply}</Typography>
          </ListItem>
        )}
        {cryptoData.market_data.market_cap['usd'] && (
          <ListItem style={{justifyContent:"space-between"}}>
            <Typography  fontWeight={"700"} variant="subtitle1">Market Cap:</Typography>
            <Typography variant="body2">{`$${cryptoData.market_data.market_cap['usd']}`}</Typography>
          </ListItem>
        )}
        {cryptoData.market_data.atl && (
          <ListItem style={{justifyContent:"space-between"}}>
            <Typography fontWeight={"700"} variant="subtitle1">All Time Low:</Typography>
            <Typography variant="body2">{`$${cryptoData.market_data.atl['usd']}`}</Typography>
          </ListItem>
        )}
        {cryptoData.market_data.ath && (
          <ListItem style={{justifyContent:"space-between"}}>
            <Typography fontWeight={"700"} variant="subtitle1">All Time High:</Typography>
            <Typography variant="body2">{`$${cryptoData.market_data.ath['usd']}`}</Typography>
          </ListItem>
        )}
      </Box>
    </Stack>
  );
};

export default CoinDetails;
