import React from "react";
import SelectedCard from "../SelectedCard/SelectedCard";

const SelectedPlayers = ({ purchasedPlayers, removePlayer }) => {
  return (
    <div className="max-w-[1200px] mx-auto mt-4">
      {purchasedPlayers.length !== 0 ? (
        purchasedPlayers.map((player) => (
          <SelectedCard
            removePlayer={removePlayer}
            player={player}
          ></SelectedCard>
        ))
      ) : (
        <h2 className="text-center font-bold text-3xl mt-50 mb-20">
          No player is selected !
        </h2>
      )}
    </div>
  );
};

export default SelectedPlayers;
