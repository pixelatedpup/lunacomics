import Button from "./Button";
import { type ButtonProps , type Color} from "./Button";
import Modal from "./Modal";
import { use, useState } from "react";

interface DashProps{
value: boolean; // whether modal is open
  handle: React.Dispatch<React.SetStateAction<boolean>>; // set function from parent
}
const DashModal = ({value, handle}:DashProps) => {
    const [createComic, setCreateComic] = useState(false)
    const [buttonText, setButtonText] = useState("Create a new comic");
    const [buttonColor, setButtonColor] = useState<Color>("light");
    const [buttonBg, setButtonBg] = useState<Color>("accent");

    const handleCreateComic = () =>{
        if(!createComic){
            setCreateComic(true);
            setButtonText("Cancel");
            setButtonColor("dark");
            setButtonBg("light");
        }
        else{
            setCreateComic(false);
            setButtonText("Create a new comic");
            setButtonColor("light");
            setButtonBg("accent");
        }
    }
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
                        <div className="pb-[10px]">
                            <Button size="auto" text={buttonText} color={buttonColor?buttonColor:"light"} bg={buttonBg} onClick={handleCreateComic}/>
                        </div>
                        {createComic && (
                        <div className="flex justify-center">
                        <form className="absolute ">
                        <div className="flex flex-col gap-3 items-center">
                            
                                <input className="border p-[5px] border-[2px] rounded-2xl w-[400px]" placeholder="Title" />
                                <textarea className="border p-[5px] border-[2px] rounded-2xl w-[400px] h-[150px]" placeholder="Description"/>
                                <input className="border p-[5px] border-[2px] rounded-2xl w-[100px]" type="number" id="quantity" name="quantity" min="1" max="10" value="1"/>
                                <select className="border p-[5px] border-[2px] rounded-2xl w-[400px] h-[40px] bg-[var(--light)]">
                                    <optgroup>
                                        <option>Drama</option>
                                        <option>Comedy</option>
                                        <option>Action</option>
                                        <option>Sci-Fi</option>
                                        <option>Fantasy</option>
                                    </optgroup>
                                </select>
                                <button className="border p-[5px] border-[2px] rounded-2xl w-[400px]">Publish Comic</button>
                            
                        </div>
                        </form>
                        </div>)}
                        <div className="flex justify-center items-center">
                        <p className="text-[grey]"> You current have no published comics</p>
                        </div>
                    </div>

                </article>
            </Modal>

        </>
    );
}

export default DashModal;