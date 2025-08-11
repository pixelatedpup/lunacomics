import Description from "../Description";
import NavBar from "../NavBar";

const Notifications = () => {
    return (
        <>

            

            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
            <h1> </h1>
                <NavBar>
                    <li><p>Library</p></li>
                    <li><p>Notifications</p></li>
                    <li><p>Wishlist</p></li>
                    <li><p>Settings</p></li>
                </NavBar>
        
            

            



            <main className="flex flex-col flex-1 p-4 gap-10">
                <section>
                    <h1>Notifications</h1>
                </section>


                <section>
                 <Description/>
                </section>

            </main>
                </div>
        </>
    );
}

export default Notifications;