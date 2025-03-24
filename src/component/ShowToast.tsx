
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShowToast = (message: string) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: false,
      className: 'custom-toast',
    });
  };
