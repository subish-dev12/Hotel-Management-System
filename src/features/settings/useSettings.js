import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, error, settings };
}

// export default function useSettings() {
//   const queryClient = useQueryClient();
//   const { mutate: updateSettings, isLoading: isSetting } = useMutation({
//     mutationFn: getSettings,
//     onSuccess: () => {
//       toast.success("setttings updated successfully");
//       queryClient.invalidateQueries({ querykey: ["settings"] });
//     },
//     onError: (err) => toast.error(`There was an error: ${err.message}`),
//   });
//   return { updateSettings, isSetting };
// }
