import { FaTimes, FaFeather } from 'react-icons/fa'
import { useState } from "react";
import changeJourney from "./ChangeJourney"
import ChangeJourney from "./ChangeJourney";
const Journey = ({journey, onDelete, changeJourney}) => {
    const [showChangeJourney, setShowChangeJourney] = useState(false)
    return (
        <div className="journey">
            <h3>
                {journey.name}
                    <FaFeather className='journey-icons' style={{color:'black', cursor: 'pointer'}} onClick={() => setShowChangeJourney(!showChangeJourney)}/>
                    <FaTimes className='journey-icons'
                        style={{color:'red', cursor: 'pointer'}}
                        onClick={() => onDelete(journey.id)}
                    />
            </h3>
            <p>{journey.country} | {journey.startDate} | {journey.endDate}</p>
            {showChangeJourney ? <ChangeJourney changeJourney={changeJourney} journey={journey}/> : ''}
        </div>
    )
}
export default Journey