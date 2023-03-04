import { useEffect, useRef } from "react";
import Button from "../Button";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
  isOpen: boolean;
  onSetIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  footer?: boolean;
  transparentBg?: boolean;
  back?: boolean;
  closable?: boolean;
  welcome?: boolean; // @ todo refactor this
  contentContainerClassName?: string;
  modalWidth?: string;
  className?: string;
  backFunction?: any;
  contentPadding?: string;
  height?: number;
  padding?: string;
  closeSideEffect?: () => any;
  containerWidth?: string;
  bgWhite?: boolean;
  center?: string;
  shareTop?: string;
}

const Modal: React.FC<Props> = ({
  isOpen,
  onSetIsOpen,
  closeSideEffect,
  title,
  content,
  footer,
  back,
  closable,
  welcome,
  padding,
  modalWidth = "",
  contentPadding = "",
  backFunction,
  containerWidth,
  bgWhite,
  children,
  center = "flex justify-center",
  transparentBg = false,
  shareTop = "",
}): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && ref.current.contains(e.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", checkIfClickedOutside);
    } else {
      document.body.style.overflow = null;
      document.removeEventListener("click", checkIfClickedOutside);
    }

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isOpen]);

  function closeModal() {
    onSetIsOpen(false);
    closeSideEffect && closeSideEffect();
  }

  const addContentWrapper = (component) => {
    return (
      <div
        /*className={`flex w-full flex-col ${
                      contentPadding ?? "px-5 md:px-12 py-9"
                    }`}*/
        className={`flex w-full flex-col px-5 ${
          contentPadding || "md:px-20 py-8"
        }  md:overflow-hidden h-full `}
      >
        {component}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-[100px] md:top-[200px] p-6 z-[100] inset-0 overflow-auto w-full h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] flex justify-center ${center} ${shareTop}`}
        >
          <div
            className={`flex items-center h-fit ${
              containerWidth ?? "w-[calc(100%)]"
            }  justify-center p-0 text-center sm:block sm:p-0`}
          >
            <div
              className="fixed inset-0 backdrop-blur-sm"
              aria-hidden="true"
              ref={ref}
            />
            <div
              className={`overflow-auto h-full flex mx-auto sm:mt-[60px] mt-0 align-bottom rounded-lg transform transition-all sm:align-middle ${
                transparentBg ? "bg-transparent" : "bg-white bg-fill shadow-xl"
              } ${
                modalWidth
                  ? modalWidth
                  : welcome
                  ? "sm:max-w-[73%]"
                  : "sm:max-w-4xl"
              } w-full`}
            >
              <div
                className={`flex flex-col justify-center items-center w-full ${
                  padding ? padding : "pb-4"
                }`}
              >
                <div className="flex w-full justify-end p-1.5 md:p-3">
                  {closable && (
                    <Button
                      icon={<CancelIcon />}
                      circular
                      className="ml-auto"
                      color="alternative"
                      clickHandler={closeModal}
                    />
                  )}
                </div>
                {content && addContentWrapper(content)}
                {children && addContentWrapper(children)}
                {footer && <>{footer}</>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
