import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Close from "../assets/icons/close.svg?react";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  const [mounted, setMounetd] = useState(false);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    setMounetd(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      setMounetd(false);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="w-screen h-screen inset-0 bg-black-50 fixed z-50 flex items-center justify-center"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="w-141.5 min-h-97.5 bg-white rounded-[30px] p-16 relative shadow-xl">
        <button
          className="absolute top-5 right-5 cursor-pointer outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          <Close />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
