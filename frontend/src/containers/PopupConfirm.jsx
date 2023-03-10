import React from 'react';
import DialogConfirm from '../components/DialogConfirm/DialogConfirm';
import { Delete, SetBarrier, SetReserve } from '../services/postdata';

const PopupConfirm = ({
  parkId,
  popEnter,
  setPopEnter,
  popExit,
  popExitMessage,
  setPopExit,
  popReserve,
  setPopReserve,
  popCancel,
  setPopCancel
}) => {
  const handleOpenGate = () => {
    SetBarrier(parkId);
  };
  const handleExitGate = () => {
    SetBarrier(parkId);
  };
  const handleReserve = () => {
    SetReserve(parkId);
  };
  const handleCancel = () => {
    Delete(parkId);
  };

  return (
    <div>
      <DialogConfirm
        parkId={parkId}
        handleFunc={handleOpenGate}
        headMessage="Are you sure to enter?"
        message=""
        open={popEnter}
        setOpen={setPopEnter}
      />
      <DialogConfirm
        parkId={parkId}
        handleFunc={handleExitGate}
        headMessage="Are you sure to exit?"
        message={popExitMessage}
        open={popExit}
        setOpen={setPopExit}
      />
      <DialogConfirm
        parkId={parkId}
        handleFunc={handleReserve}
        headMessage="Are you sure to reserve this park?"
        message="You only have 30 minutes to be at parking area or else the reservation would be cancelled"
        open={popReserve}
        setOpen={setPopReserve}
      />
      <DialogConfirm
        parkId={parkId}
        handleFunc={handleCancel}
        headMessage="Are you sure to cancel?"
        message="Fee: 25 Baht"
        open={popCancel}
        setOpen={setPopCancel}
      />
    </div>
  );
};

export default PopupConfirm;
