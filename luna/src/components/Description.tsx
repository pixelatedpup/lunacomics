const Description = ({text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tellus velit, volutpat in cursus interdum, tempor posuere tellus. Sed eu sodales mi. Vivamus vitae augue ligula. Praesent at velit euismod massa lobortis euismod. Nullam tristique vitae tellus sed mollis."}) =>{
    return(
        <>
            <div className="border border-[#465D61] bg-[#FDFFFF] w-full h-auto p-[30px] rounded-2xl">
                <p>{text}</p>
            </div>
        </>
    )
}

export default Description;