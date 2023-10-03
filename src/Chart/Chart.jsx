import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const ChartComponent = ({ arr = [], currency, days }) => {
  const prices = [];
  const dates = [];
  arr && arr.length> 0 && arr.forEach((item) => { 
      if (days === '24h') dates.push(new Date(item[0]).toLocaleTimeString());
      else dates.push(new Date(item[0]).toLocaleString());
      prices.push(item[1]);
  })
   
  return (
    <Line options={{ responsive: "true" }}
      data = {
      {
      labels: dates,
     datasets: [{
       label: `Price in $`,
       data: prices,
       borderColor: "rgb(0 123 255)",
       backgroundColor:"rgb(0 123 255)",
      }]
      }}></Line>
  )
}

export default ChartComponent