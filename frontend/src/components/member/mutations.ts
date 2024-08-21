import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMember, deleteMember } from "../../api";
import { MemberInfoType } from "../../lib/types";

export function useAddMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberInfo: MemberInfoType) => addMember(memberInfo),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["members"] });
      }
    },
  });
}

export function useDeleteMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMember(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["members"] });
      }
    },
  });
}
