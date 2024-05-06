import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl, token } from "../../constants";
import toast from "react-hot-toast";

interface TaskProp {
  id: string;
  title: string;
  description: string;
  status: "pending" | "processing" | "completed";
  important: boolean;
}

export const useFetchTasks = () => {
  if (!token) return;
  const query = useQuery({
    queryKey: ["fetch-task"],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseUrl}/task`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data as {
        tasks: TaskProp[];
      };

      return data.tasks;
    },
  });
  return { userLoginQuery: query, tasks: query.data };
};
export const useFetchImpTasks = () => {
  if (!token) return;
  const query = useQuery({
    queryKey: ["fetch-imp-task"],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseUrl}/task/important`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data as {
        task: TaskProp[];
      };
      return data;
    },
  });
  return { taskQuery: query, tasks: query.data?.task };
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-task"],
    mutationFn: async (body: Partial<TaskProp>) => {
      if (!token) return;
      toast.loading("adding", { id: "add-task" });
      const data = (
        await axios.post(`${baseUrl}/task/create`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data as {
        task: TaskProp;
      };

      return data.task;
    },
    onSuccess: () => {
      toast.success("added", { id: "add-task" });
      queryClient.invalidateQueries({
        queryKey: ["fetch-task"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-imp-task"],
      });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message ? message : "Error", { id: "add-task" });
    },
  });

  return { taskMutation: mutation, data: mutation.data };
};
export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["updating-status"],
    mutationFn: async (body: Partial<TaskProp>) => {
      if (!token) return;
      toast.loading("Updating", { id: "updating-status" });
      const data = (
        await axios.put(`${baseUrl}/task/update-status`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data as {
        task: TaskProp;
      };

      return data.task;
    },
    onSuccess: () => {
      toast.success("updated", { id: "updating-status" });
      queryClient.invalidateQueries({
        queryKey: ["fetch-task"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-imp-task"],
      });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message ? message : "Error", { id: "updating-status" });
    },
  });

  return { statusMutation: mutation, task: mutation.data };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: async (body: Partial<TaskProp>) => {
      if (!token) return;
      toast.loading("deleting", { id: "delete-task" });
      const data = (
        await axios.delete(`${baseUrl}/task/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: body,
        })
      ).data as {
        task: TaskProp;
      };

      return data.task;
    },
    onSuccess: () => {
      toast.success("deleted", { id: "delete-task" });
      queryClient.invalidateQueries({
        queryKey: ["fetch-task"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-imp-task"],
      });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message ? message : "Error", { id: "delete-task" });
    },
  });

  return { deleteTaskMutation: mutation, data: mutation.data };
};
