import { useEffect, useRef } from "react";
import { Icon } from "../../icon/container-icon";
import "./modal.scss";

export const Modal = (prop) => {
  const {
    isOpen = false,
    onClose,
    children,
    backdropClose = false,
    closeIcon = true,
    toAddClass,
    title,
    subtitle,
    style={}
  } = prop;
  const modalRef = useRef();
  useEffect(() => {
    const Root = document.querySelector("body");
    if (isOpen) {
      Root.classList.add("overflow-hidden");
    }
    return () => {
      Root.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const CloseModal = () => {
    onClose();
  };
  const backDropClick = () => {
    if (!backdropClose) {
      modalRef.current.classList.add("scale");
      setTimeout(() => {
        modalRef.current.classList.remove("scale");
      }, 500);
    } else {
      onClose();
    }
  };

  if (isOpen) {
    return (
      <div className="modal-backdrop" onClick={backDropClick}>
        <div
          className={`${toAddClass ? toAddClass : ""} modal-content`}

          style={style}
          onClick={stopPropagation}
          ref={modalRef}
        >
          {closeIcon && (
            <Icon
              name="close"
              size={15}
              color="#ff6700"
              className="icon icon-close"
              id="close"
              onClick={CloseModal}
              ariaLabel="close icon"
            />
          )}
          <div className="modal-title mb-7 flex flex-col items-center">
          {title && <div className="modal-header">{title}</div>}
          {subtitle && <div className="modal-sub-header">{subtitle}</div>}
          </div>
          {children}
        </div>
      </div>
    );
  }
  return null;
};
