import Modal from "./Modal";
import { useNavigate } from "react-router-dom";


interface AlertModalProps {
  value: boolean; // whether modal is open
  handle: React.Dispatch<React.SetStateAction<boolean>>; // set function from parent
  title?: string;
  firstButton?: string;
  secondButton?: string;
  content?: string;
}
const AlertModal = ({ value, handle, title="You need to Login to use this service"}: AlertModalProps) =>{
    const navigate = useNavigate();
    return(
        <>
            <Modal>
                      <div className={`flex flex-col 
                        bg-white rounded-xl text-left shadow-lg p-5 w-[800px]  
                        ${value? "animate-modal-in": "animate-modal-out"} `}> 
        <div className="flex flex-col items-center  font-light mb-4  text-[35px] text-[var]  h-full gap-2 p-[15px]">
                      <div className="w-full flex justify-end">                    
                        <button onClick={() => handle(false)}
                            className=" border border-gray-300 p-[4px] rounded-lg hover:bg-gray-100 ">
                              <h4>Cancel</h4>
                        </button>
                      </div>
            <h2 className="font-bold w-full text-[var(--mediumDark)]">{title}</h2>
            <h3 className="text-[20px] font-light w-full text-[var(--medium)]">The website is still in it's early development stage. To access all current features, please <button onClick={() => navigate("/signin")}><strong className="font-bold underline">Log in</strong></button> or <button onClick={() => navigate("/signin")}> <strong className="font-bold underline">Register an account.</strong></button></h3>
        </div>

        {/* <div className="flex flex-row gap-4 justify-between items-end ">
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
        </div> */}
      </div>
            </Modal>
        </>
    );
}

export default AlertModal;