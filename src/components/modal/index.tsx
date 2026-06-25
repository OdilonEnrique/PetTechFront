import type { ReactNode } from "react";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  size?: "normal" | "small" | "large";
};

export function Modal({ onClose, children, size = "normal" }: ModalProps) {
  return (
    <div
      className="modal-overlay"
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
