import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMember, deleteMember, updateMember } from "../../api";
import { MemberInfoType } from "../../lib/types";

type updateMemberMutationProps = {
  id: number;
  newData: MemberInfoType;
};

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

export function useUpdateMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newData }: updateMemberMutationProps) =>
      updateMember(id, newData),
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
