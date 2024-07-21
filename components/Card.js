// components/Card.js
import { ItemTypes } from "../constants";
import { useDrag } from "react-dnd";
import Modal from "./Modal";

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { uuid: card.uuid },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="flex flex-col justify-center w-full rounded-xl overflow-hidden shadow-xl p-4 bg-gray-400"
    >
      <div className="text-gray-700 font-bold text-lg ">{card.title}</div>
      <p className="text-gray-700 flex justify-start text-base">
        {card.description}
      </p>{" "}
      <p className="flex justify-start text-gray-700 text-base">
        Created on {card.createdAt}
      </p>
      <div className="flex justify-end gap-2">
        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Delete
        </button>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          View
        </button>
        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
