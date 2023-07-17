import { useSnackbar } from "notistack";

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (message, type) =>
    enqueueSnackbar(message, {
      variant: type,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      }
    });
};

export default useNotification;
