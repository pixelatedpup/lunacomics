import Description from "../Description";
import SectionBar from "../SectionBar";

const Inbox = () => {

    return (
        <>

            

            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
            <h1> </h1>
                <SectionBar/>
        
            <main className="flex flex-col flex-1 p-4 gap-10">
                <section>
                    <h1>Inbox</h1>
                </section>


                <section>
                 <Description/>
                </section>

            </main>
                </div>
        </>
    );
}

export default Inbox;