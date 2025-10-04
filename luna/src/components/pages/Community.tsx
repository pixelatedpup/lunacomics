import Button from "../Button";
import Post from "../Post";
import Text from "../Text";

const Community = () => {


    return (
        <>
            <div className="flex flex-col gap-5">
                <section>
                    <h1>Community</h1>
                </section>
                <section className="border-b pb-[40px]">
                    <Text/>
                    <div className="flex justify-end w-full">
                        <Button text="Post" bg="accent" color="light"/>
                    </div>
                </section>

                <section>
                    <Post/>
                </section>
            </div>
        </>
    );
}

export default Community;