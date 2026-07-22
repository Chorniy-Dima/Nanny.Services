import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Close from "../assets/icons/close.svg?react";
import { useRef } from "react";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  const mouseDownTarget = useRef<EventTarget | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseDownTarget.current = e.target;
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target === event.currentTarget &&
      mouseDownTarget.current === event.currentTarget
    ) {
      onClose();
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      setMounted(false);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);
  if (!mounted) return null;

  return createPortal(
    <div
      className="w-screen h-screen inset-0 bg-black-50 fixed z-50 flex items-center justify-center"
      aria-modal="true"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="w-141.5 min-h-97.5 max-h-190 overflow-y-auto no-scrollbar bg-white rounded-[30px] relative shadow-xl p-14">
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
