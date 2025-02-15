import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById } from "@/lib/actions/user.action";
import { useUserStore } from "@/store/userStore";

export const useUserQuery = (userId: string | null) => {
  const { setCurrentUser } = useUserStore();
  
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      const user = await getUserById(userId);
      setCurrentUser(user);
      return user;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
};