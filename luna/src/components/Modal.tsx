import { useNavigate } from "react-router-dom";

interface ModalProps {
  value: boolean; // whether modal is open
  handle: React.Dispatch<React.SetStateAction<boolean>>; // set function from parent
  title?: string;
  firstButton?: string;
  secondButton?: string;
  content?: string;
}

const Modal = ({ value, handle, title="You need to Login to use this service", content, firstButton, secondButton}: ModalProps) => {
  const navigate = useNavigate();

  if (!value) return null; // don't render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 z-50">
      <div className={`flex flex-col 
                        bg-white/85 rounded-xl shadow-lg p-6 w-[800px] h-[400px] border border-[var(--dark)] 
                        ${value? "animate-modal-in": "animate-modal-out"} `}> 
        <div className="flex flex-col items-center justify-center font-light mb-4 text-center text-[35px] text-[var]  h-full gap-7">
            <div className="font-bold">{title}</div>
            <div className="text-[26px] font-light">{content}</div>
        </div>

        <div className="flex flex-row gap-4 justify-between items-end ">
          <button 
            onClick={() => handle(false)}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button 
            onClick={() => navigate("/signin")}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
