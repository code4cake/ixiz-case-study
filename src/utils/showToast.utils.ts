import { toast, type ToastOptions, type ToastType } from "react-hot-toast";

interface ShowToastProps {
  type: ToastType;
  message: string;
  options?: ToastOptions;
}

export function showToast({ message, options, type }: ShowToastProps) {
  switch (type) {
    case "success":
      toast.success(message, { ...options });
      break;
    case "error":
      toast.error(message, { ...options });
      break;
    case "loading":
      toast.loading(message, { ...options });
      break;
    case "custom":
      toast.custom(message, { ...options });
      break;
  }
}
