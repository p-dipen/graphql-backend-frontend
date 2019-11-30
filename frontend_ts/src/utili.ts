import { toast } from "react-toastify";
export const _error = async (error: any) => {
  toast.error(error.message);
};
export const _success = (msg: string) => {
  toast.success(msg);
};
