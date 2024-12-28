import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting edited successfully!!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      //specifying which query to invalidate(refetch)
      // reset(); // we cant access reset function here so we did it inside the createCabinform  comopnent editcabin  function.
      //also its nice to reset here then inside onSubmit functions since we want to reset
      // the data only when we haev sucessfully created a new cabin
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isUpdating };
}

//usually what we do is we call the reset() function on the onSucess call back but since we can't use that function here
//we call that reset function inside the function where actually the mutation is taking place.
//take a look at how reset and where the reset function is being used on the CreateCabinForm.jsx
