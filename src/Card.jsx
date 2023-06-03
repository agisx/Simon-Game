// import react and react client
import React from "react";

function Card(props) {
    return (
        <div className={"card " + props.position} >
            <div className={"card-body " + props.color} id={props.color} onClick={props.clickCard}>
                <h5 className="card-name">{props.name}</h5>
            </div>
        </div>
    );
}

function CreateCard(data) {
    return <Card key={data.id} name={data.name} color={data.color} />;
}
export default Card;
export {CreateCard};