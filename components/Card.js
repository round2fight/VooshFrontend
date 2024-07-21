// components/Card.js
import { ItemTypes } from "../constants";
import { useDrag } from "react-dnd";
import Modal from "./Modal";
import DeleteTaskModal from "./DeleteTaskModal";
import { useState } from "react";
import { useRouter } from "next/router";
import ViewTaskModal from "./ViewTaskModal";
import EditTaskModal from "./EditTaskModal";
import { useDeleteTask, useUpdateTask } from "@/hooks/task";
const Card = ({ card, setTarget }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { uuid: card.uuid },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const router = useRouter();

  return (
    <div
      ref={drag}
      className="flex flex-col justify-center w-full rounded-xl overflow-hidden shadow-xl p-4 bg-nyanza"
    >
      <div className="text-gray-700 font-bold text-lg ">{card.title}</div>
      <p className="text-gray-700 flex justify-start text-base">
        {card.description}
      </p>{" "}
      <p className="flex justify-start text-gray-700 text-base">
        Created on {card.createdAt}
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setTarget(card, "delete");
          }}
          className="bg-brightPinkCrayola text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Delete
        </button>
        <button
          onClick={() => {
            setTarget(card, "edit");
          }}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setTarget(card, "view");
          }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
