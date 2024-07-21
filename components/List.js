// components/List.js
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import Card from "./Card";

const List = ({ id, cards, moveCard, title }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => {
      console.log(item);
      moveCard(item.uuid, id); // id corresponds to new status
    },
  }));

  return (
    <div className="min-w-96 min-h-96 flex flex-col items-center">
      <div className="w-full flex justify-center border-blue-500 p-2 m-1 bg-blue-500 rounded-lg text-white">
        {title}
      </div>
      <div
        ref={drop}
        className="list w-full min-h-[400px] flex flex-col items-center gap-3 border border-gray-400 p-2 m-1 bg-gray-200 rounded-lg "
      >
        {cards.map((card) => (
          <Card key={card.uuid} card={card} />
        ))}
      </div>
    </div>
  );
};

export default List;
