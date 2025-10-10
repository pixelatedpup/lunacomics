import Button from "./Button";
import { type Color } from "./Button";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { addComic, fetchComics, type Comic } from "../api/comicApi";
import ComicPage from "./ComicPage";

interface DashProps {
  value: boolean;
  handle: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashModal = ({ value, handle }: DashProps) => {
  const [createComic, setCreateComic] = useState(false);
  const [buttonText, setButtonText] = useState("Create a new comic");
  const [buttonColor, setButtonColor] = useState<Color>("light");
  const [buttonBg, setButtonBg] = useState<Color>("accent");
  const { token, user } = useUser();
  const [publishedComics, setPublishedComics] = useState<Comic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openOptions, setOpenOptions] = useState<string | null>(null);

  // ✅ Only run when user changes
  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    fetchComics()
      .then((data) => {
        console.log("Fetched comics:", data);
        const userComics = data.filter(
          (comic) =>
            Array.isArray(comic.author) &&
            comic.author.some((a) => a._id === user.id)
        );
        console.log("User comics:", userComics);
        setPublishedComics(userComics);
      })
      .catch((err) => {
        console.error("Failed to get all comics", err);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  useEffect(() => {
    console.log("Published comics updated:", publishedComics);
  }, [publishedComics]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    volume: 1,
    genre: "",
    imageId: 1,
  });
    const handleOptions = (index:string) => {
        if(!openOptions) {
            setOpenOptions(index);
        }else{
            setOpenOptions(null);
        }
    }

  const handleCreateComic = () => {
    setCreateComic((prev) => !prev);
    setButtonText((prev) =>
      prev === "Create a new comic" ? "Cancel" : "Create a new comic"
    );
    setButtonColor((prev) => (prev === "light" ? "dark" : "light"));
    setButtonBg((prev) => (prev === "accent" ? "light" : "accent"));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to publish this comic.");
      return;
    }



    try {
      const newComic = await addComic(
        { ...formData, volume: Number(formData.volume) },
        token
      );
      console.log("Comic added:", newComic);
      alert(`Comic ${newComic.title} created successfully!`);

      // ✅ Refresh comics after successful creation
      setPublishedComics((prev) => [...prev, newComic]);

      setCreateComic(false);
      setFormData({
        title: "",
        description: "",
        volume: 1,
        genre: "",
        imageId: 1,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to publish comic");
    }
  };

  return (
    <Modal>
      <section className="flex flex-col bg-white p-[70px] w-[1100px] h-[90vh] max-h-[90vh] overflow-hidden">
        <div className="flex flex-row border-b pb-[15px] w-full">
          <div className="flex w-full">
            <p>Your dashboard</p>
          </div>
          <div className="flex justify-end w-auto">
            <button onClick={() => handle(false)}>
              <p>x</p>
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden py-[20px]">
          <div className="pb-[10px]">
            <Button
              size="auto"
              text={buttonText}
              color={buttonColor}
              bg={buttonBg}
              onClick={handleCreateComic}
            />
          </div>
          <article className="flex flex-col flex-1  w-full overflow-y-auto">
            {createComic && (
                <div className="flex justify-center relative ">
                <form onSubmit={handleSubmit} className=" bg-[var(--light)] w-full p-[30px] rounded-2xl border border-black ">
                    <div className="flex flex-col gap-3 items-center">
                    <input
                        className="border p-[5px] border-[2px] rounded-2xl w-[400px]"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        className="border p-[5px] border-[2px] rounded-2xl w-[400px] h-[150px]"
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="border p-[5px] border-[2px] rounded-2xl w-[100px]"
                        type="number"
                        name="volume"
                        min="1"
                        max="10"
                        value={formData.volume}
                        onChange={handleChange}
                    />
                    <select
                        className="border p-[5px] border-[2px] rounded-2xl w-[400px] h-[40px] bg-[var(--light)]"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select genre</option>
                        <option>Drama</option>
                        <option>Comedy</option>
                        <option>Action</option>
                        <option>Sci-Fi</option>
                        <option>Fantasy</option>
                    </select>
                    <button
                        className=" p-[5px] bg-[var(--accent)] text-white rounded-2xl w-[400px]"
                        type="submit"
                    >
                        Publish Comic
                    </button>
                    </div>
                </form>
                </div>
            )}

            <div className="flex justify-center items-center">
                {isLoading ? (
                <p>Loading your comics...</p>
                ) : publishedComics.length > 0 ? (
                <div className="flex flex-col gap-10 bg-[var(--dark)] w-full h-full rounded-2xl border p-[50px]">
                    {publishedComics.map((comic, index) => (
                        <>
                        <div key={index} className="flex bg-[white] w-full h-full p-[10px] rounded-2xl ">
                            <div className="flex flex-col h-full w-full  items-center" >
                                <ComicPage size="tiny"/>
                            </div>
                            <div className="flex w-full ">
                                <div className="flex flex-col w-full">
                                    <h2 className="font-bold" key={comic._id}>{comic.title}</h2>
                                    <p key={comic._id}>{comic.description}</p>
                                    <h3 className="mt-[30px]" key={comic._id}>Volume {comic.volume}</h3>
                                </div>
                                <div className="flex justify-center bg-[var(--accent)] h-[30px] w-[30px] rounded-2xl text-white border ">
                                    <button onClick={()=>handleOptions(comic._id)} className="w-full h-full"><p>...</p></button>
                                    {openOptions === comic._id&& (
                                        <div key={index} className="absolute mt-[30px] mr-[40px] flex flex-col gap-3 bg-black text-white p-[15px] rounded-2xl">
                                            <ul>
                                                <li className="border-b border-white"><p>Modify</p></li>
                                                <li className=""><p>Delete</p></li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                    ))}
                </div>
                ) : (
                <p className="text-[grey]">
                    You currently have no published comics.
                </p>
                )}
            </div>
          </article>
        </div>
      </section>
    </Modal>
  );
};

export default DashModal;
