import Post from "../Post";

const Community = () => {
    const community = [
        {name: "Creator Name",
         likes:"2",
          comments:"4"
        },
        {name: "Creator Name",
         likes:"2",
          comments:"4"
        }

    ]

    return (
        <>
            <h1>Community</h1>
            <Post/>
        </>
    );
}

export default Community;