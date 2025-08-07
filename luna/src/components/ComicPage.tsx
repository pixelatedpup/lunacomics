import Card from "./Card"

const Comics = ({source=""}) =>{
    return(
        <div>
            <Card width="207px" height="333px" source={source}/>
        </div>
    );
}

export default Comics;