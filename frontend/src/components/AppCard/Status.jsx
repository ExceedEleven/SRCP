import React from 'react';
import Available from './Available';
import Reserved from './Reserved';
function Status({
  park,
  login,
  data,
  popEnter,
  popExit,
  popReserve,
  setPopEnter,
  setPopExit,
  setPopExitMessage,
  setPopReserve,
  setParkId,
  setPopCancel
}) {
  if (park.state == 'empty') {
    return (
      <Available
        login={login}
        park={park}
        data={data}
        setPopReserve={setPopReserve}
        setParkId={setParkId}
      />
    );
  } else {
    if (park.state == 'parked' && (!login || park.park_id != data.park_id)) {
      return <h1>Unavailable</h1>;
    } else {
      return (
        <div>
          <Reserved
            login={login}
            park={park}
            data={data}
            setPopEnter={setPopEnter}
            setPopExit={setPopExit}
            setParkId={setParkId}
            setPopExitMessage={setPopExitMessage}
            setPopCancel={setPopCancel}
          />
        </div>
      );
    }
  }
}

export default Status;
