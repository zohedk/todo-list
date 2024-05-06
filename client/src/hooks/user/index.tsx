import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, token } from "../../constants";
import { toast } from "react-hot-toast";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const useFetchUser = () => {
  const query = useQuery({
    queryKey: ["fetch-user"],
    queryFn: async () => {
      if (!token) return;
      const data = (
        await axios.get(`${baseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data as { user: User };
      return data;
    },
  });
  return { userLoginQuery: query, user: query.data?.user };
};

export const useUserLogin = (body: Partial<User>) => {
  const query = useQuery({
    queryKey: ["user-login"],
    queryFn: async () => {
      toast.loading("loging", { id: "user-login" });
      const data = (await axios.post(`${baseUrl}/user/login`, body)).data;
      const token = data.token;
      localStorage.setItem("organizer_user_token", token);
      return data;
    },
    enabled: false,
  });
  return { userLoginQuery: query, user: query.data };
};

export const useUserSignup = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: ["user-signup"],
    mutationFn: async (body: Partial<User>) => {
      toast.loading("Signing Up", { id: "user-signup" });
      const data = (await axios.post(`${baseUrl}/user/signup`, body)).data;
      const token = data.token;
      localStorage.setItem("organizer_user_token", token);
      return data;
    },
    onSuccess: () => {
      toast.success("successfull", { id: "user-signup" });
      queryClient.invalidateQueries({ queryKey: ["fetch-user"] });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message ? message : "Error", { id: "user-signup" });
    },
  });

  return { userSignupMutation: query, user: query.data };
};
