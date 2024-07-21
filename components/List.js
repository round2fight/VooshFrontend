// components/List.js
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import Card from "./Card";

const List = ({ id, cards, moveCard, title, setTarget }) => {
  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
      console.log(item);
      moveCard(item.uuid, id); // id corresponds to new status
    },
  }));

  return (
    <div className="w-96 min-h-96 flex flex-col items-center">
      <div className="w-full flex justify-center border-blue-500 p-2 m-1 bg-lapisLazuli rounded-lg text-white">
        {title}
      </div>
      <div
        ref={drop}
        className="list w-full min-h-[400px] flex flex-col items-center gap-3 border border-gray-400 p-2 m-1 bg-lapisLazuli rounded-lg "
      >
        {cards.map((card) => (
          <Card key={card.uuid} card={card} setTarget={setTarget} />
        ))}
      </div>
    </div>
  );
};

export default List;
