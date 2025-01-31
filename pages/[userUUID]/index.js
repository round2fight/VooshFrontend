// pages/index.js
import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import List from "@/components/List";
import { useRouter } from "next/router";
import Navbar from "@/components/NavBar";
import Modal from "@/components/Modal";
import CreateTaskModal from "@/components/CreateModal";
import { SessionContext } from "@/components/SessionContext";
import {
  useCreateTask,
  useDeleteTask,
  useGetTasks,
  useUpdateTask,
} from "@/hooks/task";
import { DndContext } from "@dnd-kit/core";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import ViewTaskModal from "@/components/ViewTaskModal";
import EditTaskModal from "@/components/EditTaskModal";

const HomePage = () => {
  const { user, isAuthenticated } = useContext(SessionContext);
  const router = useRouter();

  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const { getTasks } = useGetTasks();
  const { createTask } = useCreateTask();
  const { updateTasks } = useUpdateTask();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      getTasks(
        (response) => {
          console.log("Get all tasks", response);
          console.log(response.data);
          setCards(response.data);
        },
        (error) => {
          console.log("Error fetching task:", error);
        }
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setList1(cards.filter((card) => card.status === 0));
    setList2(cards.filter((card) => card.status === 1));
    setList3(cards.filter((card) => card.status === 2));
  }, [cards]);

  const updateCardStatus = async (cardUUID, newStatus) => {
    console.log("updateCardStatus", cardUUID, newStatus);

    updateTasks(
      { status: newStatus },
      cardUUID,
      (response) => {
        console.log("Update task", response);
        // router.reload();
      },
      (error) => {
        console.log("Error fetching task:", error);
      }
    );
  };

  function handleAddTask(title, description, status) {
    console.log("handleAddTask", title, description, status);
    createTask(
      { title: title, description: description, status: status },
      (response) => {
        console.log("Create task", response);
        router.reload();
      },
      (error) => {
        console.log("Error fetching task:", error);
        router.reload();
      }
    );
  }

  const moveCard = useCallback(
    (cardUUID, targetListId) => {
      const card = cards.find((card) => card.uuid === cardUUID);
      const newStatus = String(targetListId); // Status corresponds to list ID

      // Update the local state
      setList1((prev) => prev.filter((card) => card.uuid !== cardUUID));
      setList2((prev) => prev.filter((card) => card.uuid !== cardUUID));
      setList3((prev) => prev.filter((card) => card.uuid !== cardUUID));

      if (newStatus === String(0)) {
        setList1((prev) => [...prev, { ...card, status: newStatus }]);
      } else if (newStatus === String(1)) {
        setList2((prev) => [...prev, { ...card, status: newStatus }]);
      } else if (newStatus === String(2)) {
        setList3((prev) => [...prev, { ...card, status: newStatus }]);
      }

      // Update the server
      updateCardStatus(cardUUID, newStatus);
    },
    [cards]
  );

  useEffect(() => {
    async function enums() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
        return;
      }
      try {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/enums`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    enums();
  }, [router]);

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenEdit, setIsOpenEDit] = useState(false);

  const { deleteTask } = useDeleteTask();
  function handleDelete(taskUUID) {
    deleteTask(
      taskUUID,
      (response) => {
        console.log("Delete task", response);
        router.reload();
      },
      (error) => {
        console.log("Error fetching task:", error, taskUUID);
        // router.reload();
      }
    );
  }

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
        // router.reload();
      }
    );
  }
  const [target, setTarget] = useState(null);
  const [action, setAction] = useState(null);

  function handleTriggerAction(card, action) {
    if (!!action && !!target) {
      if (action === "delete") {
        setIsOpenDelete(true);
      } else if (action === "view") {
        setIsOpenView(true);
      } else if (action === "edit") {
        setIsOpenEDit(true);
      }
    }
  }

  return (
    <div className=" bg-nyanza h-screen w-full">
      <div className="flex justify-start px-3 py-6">
        <CreateTaskModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          onSubmit={(e) => {
            console.log(e);
            handleAddTask(e.title, e.description, String(e.status));
          }}
        ></CreateTaskModal>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className=" bg-midnightGreen text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-lapisLazuli focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          + Add Task
        </button>
      </div>
      {!!target && !!action && action === "delete" && (
        <DeleteTaskModal
          task={target}
          isOpen={isOpenDelete}
          onClose={() => {
            setIsOpenDelete(false);
          }}
          onSubmit={(e) => {
            console.log("Call Delete Task");
            setIsOpenDelete(false);
            handleDelete(target.uuid);
          }}
        />
      )}
      {!!target && !!action && action === "view" && (
        <ViewTaskModal
          task={target}
          isOpen={isOpenView}
          onClose={() => {
            setIsOpenView(false);
          }}
        />
      )}
      {!!target && !!action && action === "edit" && (
        <EditTaskModal
          title={target.title}
          description={target.description}
          status={target.status}
          task={target}
          isOpen={isOpenEdit}
          onClose={() => {
            setIsOpenEDit(false);
          }}
          onSubmit={(e) => {
            console.log("Call Edit Task");
            handleEDit(target.uuid, e.newTitle, e.newDescription, e.newStatus);
            setIsOpenEDit(false);
          }}
        />
      )}
      {cards.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 ">
          <List
            id={0}
            cards={list1}
            moveCard={moveCard}
            setTarget={(card, action) => {
              setTarget(card);
              setAction(action);
              handleTriggerAction(card, action);
            }}
            title="TODO"
          />
          <List
            id={1}
            cards={list2}
            moveCard={moveCard}
            setTarget={(card, action) => {
              setTarget(card);
              setAction(action);
              handleTriggerAction(card, action);
            }}
            title="IN PROGRESS"
          />
          <List
            id={2}
            cards={list3}
            moveCard={moveCard}
            setTarget={(card, action) => {
              setTarget(card);
              setAction(action);
              handleTriggerAction(card, action);
            }}
            title="DONE"
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
