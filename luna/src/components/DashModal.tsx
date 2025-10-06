import Button from "./Button";
import Modal from "./Modal";

interface DashProps{
value: boolean; // whether modal is open
  handle: React.Dispatch<React.SetStateAction<boolean>>; // set function from parent
}
const DashModal = ({value, handle}:DashProps) => {
    return(
        <>
            <Modal>
                <article className="bg-white p-[70px] w-[1100px] h-[600px]">
                    <div className="flex flex-row border-b pb-[15px] w-full">
                        <div className="flex w-full">
                        <p>Your dashboard</p>
                        </div>
                        <div className="flex justify-end w-auto">
                            <button onClick={()=>handle(false)}><p>x</p></button>
                        </div>
                    </div>
                    <div className="py-[20px]">
                        <Button size="auto" text="Create a new comic" color="dark" bg="light"/>
                    </div>
                </article>
            </Modal>

        </>
    );
}

export default DashModal;