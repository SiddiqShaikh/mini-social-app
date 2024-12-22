"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

interface ModalProps {
  //   onSubmit: (data: { title: string; content: string; image: string }) => Promise<void>;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

export function Modal({
  onClose,
  onSubmit,
  body,
  footer,
  isOpen,
  title,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {body}
        {footer}
      </DialogContent>
    </Dialog>
  );
}
