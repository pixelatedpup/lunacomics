const Footer= () => {
    return(
        <>
            <div className="bg-[var(--dark)] text-[white]">
                <section className="flex flex-row max-w-[1400px] mx-auto py-[30px]">
                    <div className="flex flex-col flex-1  ">
                    <article >
                        <h1>Luna</h1>
                        <p>©2025 Luna Comics.</p>
                    </article>
                    </div>
                    
                    <div className="flex flex 1  gap-20">
                        <article className="border-r pr-[40px]">
                            <ul >
                                <li><a>Help</a></li>
                                <li><a>Discord</a></li>
                                <li><a>Forums</a></li>
                                <li><a>Contact</a></li>
                            </ul>
                        </article>

                        <article>
                            <ul>
                                <li><a>Home</a></li>
                                <li><a>Comics</a></li>
                                <li><a>Creators</a></li>
                                <li><a>Community</a></li>
                            </ul>
                        </article>
                    </div>
                </section>
            </div>
        </>
    );

}

export default Footer;