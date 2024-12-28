import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      //here we tell RQ what to do when the mutation is successfull
      //that is we get the query Client and invalidate(refresh) the queries on there
      //and the invalidateQueries  is performed using the useClient hook.
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"], //we use query key to tell rq which query to invalidate
      });
    },
    onError: (err) => toast.error(err.message), //the error message obtained here is thrown by the deleteCabin function inside the (apiCabins.js) file
  });

  return { isDeleting, deleteCabin };
}
