import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";

interface notifyInterface {
  position?: "top-right" | "bottom-left";
  delay?: number;
  progressBar?: boolean;
  type?: "default" | "success" | "warning" | "error";
  label?: string;
  text?: string;
}

export const ToastNotification = ({
  position = "top-right",
  delay = 3000,
  progressBar = false,
  type = "default",
  label,
  text,
}: notifyInterface) => {
  const toastButtonBack = {
    default: "text-light-200 bg-light-400",
    success: "text-success-100 bg-success-300",
    warning: "text-warning-100 bg-warning-200",
    error: "text-error-100 bg-error-300",
  };

  const toastText = {
    default: "text-light-200",
    success: "text-success-100",
    warning: "text-warning-100",
    error: "text-error-200",
  };

  const CloseButton = ({ closeToast }) => (
    <div
      onClick={closeToast}
      className={`${toastButtonBack[type]} rounded-full h-6 w-6 flex justify-center items-center hover:opacity-70 -mr-2 -mt-1`}
    >
      <CancelIcon />
    </div>
  );

  const textContainer = () => {
    return (
      <>
        {label && text ? (
          <div className="flex flex-col">
            <h2
              className={`${toastText[type]} font-rubik text-sm font-bold pb-2 leading-4`}
            >
              {label}
            </h2>
            <p
              className={`${toastText[type]} font-noto text-sm font-medium leading-5`}
            >
              {text}
            </p>
          </div>
        ) : label ? (
          <div className="flex flex-col">
            <h2
              className={`${toastText[type]} font-rubik text-sm font-bold leading-4`}
            >
              {label}
            </h2>
          </div>
        ) : text ? (
          <div className="flex flex-col">
            <p className={`${toastText[type]} font-noto text-sm leading-5`}>
              {text}
            </p>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  return toast(textContainer(), {
    position: position,
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    type: type,
    closeButton: CloseButton,
  });
};

// For each types, just with label and text options
export const NotifyMessage = (
  type?: "success" | "warning" | "error",
  label?: string,
  text?: string
) => {
  ToastNotification({
    type: type ? type : "default",
    label: label,
    text: text,
  });
};
