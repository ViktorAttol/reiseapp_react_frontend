import Journey from "./Journey";

const Journeys = ({journeys, onDelete, changeJourney}) => {

    return (
        <div className='journeys-form'>
            {journeys.map((journey) => (
                <Journey key ={journey.name} journey={journey} onDelete={onDelete} changeJourney={changeJourney}/>
            ))}
        </div>
    )
}
export default Journeys