import NavBar from "../NavBar";

const SectionBar = () => {
        const links  = [
        {id: 1 , name: "Library" , route:"/library"},
        {id: 2 , name: "Notifications", route:"/notifications"},
        {id: 3 , name: "Wishlist" , route:"/wishlist"},
        {id: 4 , name: "Settings", route:"/settings"}
    ]
    return(
        <>
            <NavBar links={links}/>
        </>
    )
}

export default SectionBar;