import type { ReactNode } from "react";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  size?: "normal" | "small" | "large";
  zIndex?: number;
};

export function Modal({ onClose, children, size = "normal", zIndex = 1000 }: ModalProps) {
  return (
    <div
      className="modal-overlay"
      style = {{zIndex}}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`modal-card modal-card-${size}`}>{children}</div>
    </div>
  );
}
