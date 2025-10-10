
interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({children }: ModalProps) => {
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 z-50">
      {children}
    </div>
  );
};

export default Modal;
