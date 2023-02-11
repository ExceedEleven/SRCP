import React, { useState } from 'react';
import LoginPopup from '../components/LoginPopup';
import SignupPopup from '../components/SignupPopup';
import GridCard from '../containers/GridCard';
import HeadBar from '../containers/HeadBar';
import PopupConfirm from '../containers/PopupConfirm';

function Main() {
  const [popEnter, setPopEnter] = useState(false);
  const [popExit, setPopExit] = useState(false);
  const [popExitMessage, setPopExitMessage] = useState('');
  const [popReserve, setPopReserve] = useState(false);
  const [popLogin, setPopLogin] = useState(false);
  const [popSignUp, setPopSignUp] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [parkId, setParkId] = useState(-1);
  const [userName, setUserName] = useState('');
  return (
    <main>
      <HeadBar
        isLogin={isLogin}
        setLogin={setLogin}
        setPopLogin={setPopLogin}
        setPopSignUp={setPopSignUp}
        userName={userName}
      />
      <PopupConfirm
        parkId={parkId}
        popEnter={popEnter}
        setPopEnter={setPopEnter}
        popExit={popExit}
        popExitMessage={popExitMessage}
        setPopExit={setPopExit}
        popReserve={popReserve}
        setPopReserve={setPopReserve}
      />
      <GridCard
        login={isLogin}
        popEnter={popEnter}
        setPopEnter={setPopEnter}
        popExit={popExit}
        setPopExit={setPopExit}
        setPopExitMessage={setPopExitMessage}
        popReserve={popReserve}
        setPopReserve={setPopReserve}
        parkId={parkId}
        setParkId={setParkId}
      />
      <SignupPopup setOpen={setPopSignUp} open={popSignUp} />
      <LoginPopup
        setOpen={setPopLogin}
        open={popLogin}
        setLogin={setLogin}
        setUserName={setUserName}
      />
    </main>
  );
}
export default Main;
