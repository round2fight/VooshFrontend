import React from "react";

const ViewTaskModal = ({ task, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-black">Task Details</h2>
        <p className=" text-black text-xl font-bold ">Title:</p>
        <p className="mb-4 text-black text-lg ">{task.title}</p>

        <p className=" text-black text-xl font-bold ">Description:</p>
        <p className="mb-4 text-black text-lg ">{task.description}</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
