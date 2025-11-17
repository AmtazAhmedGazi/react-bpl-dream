import { Suspense, useState } from "react";
import "./App.css";
import AvailablePlayers from "./components/AvailablePlayers/AvailablePlayers";
import Navbar from "./components/Navbar/Navbar";
import SelectedPlayers from "./components/SelectedPlayers/SelectedPlayers";
import { ToastContainer } from "react-toastify";

const fetchPlayers = async () => {
  const res = await fetch("/players.json");
  return res.json();
};

const playersPromise = fetchPlayers();

function App() {
  const [toggle, setToggle] = useState(true);
  const [availableBalance, setAvailableBalance] = useState(6000000);
  const [purchasedPlayers, setPurchasedPlayers] = useState([]);

  const removePlayer = (p) => {
    const filterData = purchasedPlayers.filter(
      (ply) => ply.player_name !== p.player_name
    );
    setPurchasedPlayers(filterData);
    setAvailableBalance(
      availableBalance +
        parseInt(p.price.split("USD").join("").split(",").join(""))
    );
  };
  return (
    <>
      <Navbar availableBalance={availableBalance}></Navbar>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <h1 className="font-bold text-2xl">
          {toggle === true
            ? "Available Players"
            : `Selected Player (${purchasedPlayers.length}/6)`}
        </h1>
        <div className="font-bold">
          <button
            onClick={() => setToggle(true)}
            className={`px-4 py-3 border border-gray-400 rounded-l-2xl border-r-0 ${
              toggle === true ? "bg-[#E7FE29]" : ""
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setToggle(false)}
            className={`px-4 py-3 border border-gray-400 rounded-r-2xl border-l-0 ${
              toggle === false ? "bg-[#E7FE29]" : ""
            }`}
          >
            Selected <span>({purchasedPlayers.length})</span>
          </button>
        </div>
      </div>
      {toggle === true ? (
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-xl"></span>
          }
        >
          <AvailablePlayers
            availableBalance={availableBalance}
            setAvailableBalance={setAvailableBalance}
            playersPromise={playersPromise}
            purchasedPlayers={purchasedPlayers}
            setPurchasedPlayers={setPurchasedPlayers}
          ></AvailablePlayers>
        </Suspense>
      ) : (
        <SelectedPlayers
          removePlayer={removePlayer}
          purchasedPlayers={purchasedPlayers}
        ></SelectedPlayers>
      )}
      {!toggle ? (
        <button
          onClick={() => setToggle(true)}
          className="btn bg-[#E7FE29] mt-10 font-semibold"
        >
          Add More Player
        </button>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
}

export default App;
