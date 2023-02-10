import { Card, CardContent } from '@mui/material';
import React from 'react';

function Status_style(status) {
  console.log(status);
  if (status == 'empty') {
    return 'grey';
  } else {
    if (status != 'reserved') {
      return 'red';
    } else {
      return 'yellow';
    }
  }
}

function Available(login) {
  if (!login) {
    <h1>Available</h1>;
  } else {
    <h1>Test</h1>;
  }
}

function Reserved(login) {}

function Status({ status, login }) {
  if (status == 'empty') {
    return Available(login);
  } else {
    if (status != 'reserved') {
      return <h1>Unavailble</h1>;
    } else {
      if (!login) {
        return <h1>Reserved</h1>;
      } else if (true) {
        return <h1>Test</h1>;
      }
    }
  }
}

export const AppCard = ({ park, login }) => {
  return (
    <div>
      <h2>Parking {park.park_id + 1}</h2>
      <Card sx={{ height: 400, width: 500 }} style={{ backgroundColor: Status_style(park.state) }}>
        <CardContent>
          <Status status={park.state} login={login} />
        </CardContent>
      </Card>
    </div>
  );
};
export default AppCard;
