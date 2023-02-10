import React, { useState } from 'react';
import './App.css';
import AppButton from './components/AppButton/AppButton';
import LoginPopup from './components/LoginPopup';
import SignupPopup from './components/SignupPopup';
import GridCard from './containers/GridCard';
import HeadBar from './containers/HeadBar';
import PopupConfirm from './containers/PopupConfirm';

function App() {
  const [popEnter, setPopEnter] = useState(false);
  const [popExit, setPopExit] = useState(false);
  const [popReserve, setPopReserve] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [parkId, setParkId] = useState(-1);

  return (
    <main>
      <HeadBar isLogin={isLogin} setLogin={setLogin} />
      <PopupConfirm
        park_id={parkId}
        popEnter={popEnter}
        setPopEnter={setPopEnter}
        popExit={popExit}
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
        popReserve={popReserve}
        setPopReserve={setPopReserve}
        setParkId={setParkId}
      />
      <SignupPopup />
      <LoginPopup />
      <AppButton /> {/** Test reserve button */}
    </main>
  );
}
export default App;
