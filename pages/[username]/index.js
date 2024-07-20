// pages/index.js
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import List from "@/components/List";
import { useRouter } from "next/router";
import Navbar from "@/components/NavBar";
import Modal from "@/components/Modal";
import CreateTaskModal from "@/components/CreateModal";
import { SessionContext } from "@/components/SessionContext";

const initialCards = [
  {
    id: 1,
    text: "Card 1",
    title: "Do Dishes",
    description: "The 2 plates",
    createdAt: "12/10/2024",
    status: 0,
    uuid: "123213",
  },
  {
    id: 2,
    text: "Card 2",
    title: "Do Sprinting",
    description: "The 2 laps",
    createdAt: "12/10/2024",
    status: 0,
    uuid: "12321asd3",
  },
  {
    id: 3,
    text: "Card 3",
    title: "Do jumping",
    description: "The 2 skips",
    createdAt: "12/10/2024",
    status: 1,
    uuid: "1232efcsdc1asd3",
  },
];

const HomePage = () => {
  const { user, isAuthenticated } = useContext(SessionContext);
  const router = useRouter();

  const [list1, setList1] = useState(
    initialCards.filter((card) => card.status === 0)
  );
  const [list2, setList2] = useState(
    initialCards.filter((card) => card.status === 1)
  );
  const [list3, setList3] = useState(
    initialCards.filter((card) => card.status === 2)
  );

  useEffect(() => {
    async function getAllTasks() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/task", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Get all tasks", response);
      } catch (error) {
        console.log(error);
        router.push("/sign-in");
      }
    }

    if (isAuthenticated) {
      getAllTasks();
    }
  }, [isAuthenticated, router]);

  const updateCardStatus = async (cardUUID, newStatus) => {
    async function UpdateTask(taskUUID, newStatus) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
        return;
      }
      try {
        const response = await axios.put(
          `http://localhost:3000/task/${taskUUID}`,
          { status: newStatus },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("UpdateTask", response);
      } catch (error) {
        console.log(error);
        router.push("/sign-in");
      }
    }

    console.log("updateCardStatus", cardUUID, newStatus);
  };

  const moveCard = (cardUUID, targetListId) => {
    const card = initialCards.find((card) => card.uuid === cardUUID);
    const newStatus = targetListId; // Status corresponds to list ID

    // Update the local state
    setList1((prev) => prev.filter((card) => card.uuid !== cardUUID));
    setList2((prev) => prev.filter((card) => card.uuid !== cardUUID));
    setList3((prev) => prev.filter((card) => card.uuid !== cardUUID));

    if (newStatus === 0) {
      setList1((prev) => [...prev, { ...card, status: newStatus }]);
    } else if (newStatus === 1) {
      setList2((prev) => [...prev, { ...card, status: newStatus }]);
    } else if (newStatus === 2) {
      setList3((prev) => [...prev, { ...card, status: newStatus }]);
    }

    // Update the server
    updateCardStatus(cardUUID, newStatus);
  };

  useEffect(() => {
    async function enums() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
        return;
      }
      try {
        let response = await axios.get("http://localhost:3000/enums", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    enums();
  }, [router]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-start px-3 py-6">
        <CreateTaskModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          onSubmit={(e) => {
            console.log(e);
          }}
        ></CreateTaskModal>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className=" bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          + Add Task
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 ">
        <List id={0} cards={list1} moveCard={moveCard} title="TODO" />
        <List id={1} cards={list2} moveCard={moveCard} title="IN PROGRESS" />
        <List id={2} cards={list3} moveCard={moveCard} title="DONE" />
      </div>
    </div>
  );
};

export default HomePage;
