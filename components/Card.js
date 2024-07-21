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
const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { uuid: card.uuid },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenEdit, setIsOpenEDit] = useState(false);
  const router = useRouter();

  const { updateTasks } = useUpdateTask();

  const { deleteTask } = useDeleteTask();

  function handleDelete(taskUUID) {
    deleteTask(
      taskUUID,
      (response) => {
        console.log("Delete task", response);
        // router.reload();
      },
      (error) => {
        console.log("Error fetching task:", error);
        // router.reload();
      }
    );
  }

  function handleView() {}

  function handleEDit(taskUUID, title, description, status) {
    updateTasks(
      { title: title, description: description, status: status },
      taskUUID,
      (response) => {
        console.log("Update task", response);
        router.reload();
      },
      (error) => {
        console.log("Error fetching task:", error);
        router.reload();
      }
    );
  }

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
        <DeleteTaskModal
          task={card}
          isOpen={isOpenDelete}
          onClose={() => {
            setIsOpenDelete(false);
          }}
          onSubmit={(e) => {
            console.log("Call Delete Task");
            setIsOpenDelete(false);
            handleDelete(card.uuid);
          }}
        />
        <ViewTaskModal
          task={card}
          isOpen={isOpenView}
          onClose={() => {
            setIsOpenView(false);
          }}
        />
        <EditTaskModal
          title={card.title}
          description={card.description}
          status={card.status}
          task={card}
          isOpen={isOpenEdit}
          onClose={() => {
            setIsOpenEDit(false);
          }}
          onSubmit={(e) => {
            console.log("Call Edit Task");
            handleEDit(card.uuid, e.newTitle, e.newDescription, e.newStatus);
            setIsOpenEDit(false);
          }}
        />
        <button
          onClick={() => {
            setIsOpenDelete(true);
          }}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Delete
        </button>
        <button
          onClick={() => {
            setIsOpenView(true);
          }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          View
        </button>
        <button
          onClick={() => {
            setIsOpenEDit(true);
          }}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
