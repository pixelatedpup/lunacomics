import Description from "../Description";
import NavBar from "../NavBar";
import SectionBar from "../SectionBar";

const Settings = () => {

    return (
        <>

            

            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row min-h-screen">
            <h1> </h1>
                <SectionBar/>
        
            <main className="flex flex-col flex-1 p-4 gap-10">
                <section>
                    <h1>Settings</h1>
                </section>




                <section>
                    <h4>Accessibility options</h4>
                    <ul>
                        <li><p>Larger Text</p></li>
                        <li><p>Dark Mode</p></li>
                        <li><p>Change language</p></li>
                    </ul>
                </section>

            </main>
                </div>
        </>
    );
}

export default Settings;