import React from "react";
import deleteImg from "../../assets/delete.png";

const SelectedCard = ({ player, removePlayer }) => {
  const handleRemove = () => {
    removePlayer(player);
  };

  return (
    <div className="border-2 border-gray-300 p-3 flex justify-between items-center rounded-xl mb-4">
      <div className="flex items-center ">
        <img
          src={player.player_image}
          alt=""
          className="h-[50px] w-[50px] rounded-xl"
        />

        <div className="ml-2">
          <h1>{player.player_name}</h1>
          <p className="text-xs ">{player.playing_role}</p>
        </div>
      </div>
      <div onClick={handleRemove}>
        <img src={deleteImg} alt="" />
      </div>
    </div>
  );
};

export default SelectedCard;
