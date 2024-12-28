import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

//mutation for creating a new cabin

export function useCreateCabin() {
  const queryClient = useQueryClient(); //we get the instance of the queryClient with this hook
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createAndEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //specifying which query to invalidate(refetch)
      //   reset(); //resets back to empty
      //also its nice to reset here then inside onSubmit functions since we want to reset
      // the data only when we haev sucessfully created a new cabin
    },
    onError: (err) => toast.error(err.message),
  });
  return { createCabin, isCreating };
}
