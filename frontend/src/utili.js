import { toast } from "react-toastify";
export const _error = async error => {
  toast.error(error.message);
};
export const _success = msg => {
  toast.success(msg);
};
