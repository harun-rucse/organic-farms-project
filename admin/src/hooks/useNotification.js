import { useSnackbar } from 'notistack';

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (message, type) =>
    enqueueSnackbar(message, {
      variant: type,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
};

export default useNotification;
