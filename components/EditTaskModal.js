import React, { useState, useEffect } from "react";

const EditTaskModal = ({
  title,
  description,
  status,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("0");

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
    setNewStatus(status);
  }, [title, description, status]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ newTitle, newDescription, newStatus });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border border-gray-300 text-gray-700 p-2 rounded-lg w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-gray-300 text-gray-700 p-2 rounded-lg w-full"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border border-gray-300 text-gray-700 p-2 rounded-lg w-full "
            >
              <option className="text-gray-700" value="0">
                TODO
              </option>
              <option className="text-gray-700" value="1">
                IN PROGRESS
              </option>
              <option className="text-gray-700" value="2">
                DONE
              </option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
