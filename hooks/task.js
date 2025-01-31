import { useRouter } from "next/router";
import axios from "axios";

export const useGetTasks = () => {
  const router = useRouter();

  const getTasks = async (onSuccess, onError) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/task`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      // router.push("/sign-in");
    }
  };

  return { getTasks };
};

export const useCreateTask = () => {
  const router = useRouter();

  const createTask = async (taskData, onSuccess, onError) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/task`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  return { createTask };
};

export const useUpdateTask = () => {
  const router = useRouter();

  const updateTasks = async (taskData, taskUUID, onSuccess, onError) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/task/${taskUUID}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      // router.push("/sign-in");
    }
  };

  return { updateTasks };
};

export const useDeleteTask = () => {
  const router = useRouter();

  const deleteTask = async (taskUUID, onSuccess, onError) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/task/${taskUUID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      // router.push("/sign-in");
    }
  };

  return { deleteTask };
};
