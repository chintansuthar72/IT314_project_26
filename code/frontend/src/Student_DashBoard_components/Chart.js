import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {  CartesianGrid, Tooltip, Legend } from 'recharts';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];

export default function Chart() {
  const theme = useTheme();

  const [usedata, setData] = React.useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/albums")
    .then((res) => {
      console.log(res.data);
      let modData = [];
      res.data.forEach((item) => {
        modData.push(createData(item.title, item.userId));
      });
      setData(modData);
    })
  }, []);

  return (
    <React.Fragment>
      <Title>Progress</Title>
      <ResponsiveContainer>
        <LineChart
          data={usedata}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Marks (out of 100)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
