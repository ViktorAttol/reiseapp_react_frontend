import { useState } from 'react'

const ChangeJourney = ({changeJourney, journey}) => {
    const[name, setName] = useState(journey.name)
    const[country, setCountry] = useState(journey.country)
    const[startDate, setStartDate] = useState(journey.startDate)
    const[endDate, setEndDate] = useState(journey.endDate)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!name || !country || !startDate || !endDate){
            alert('Please insert valid input data!')
            return
        }
        journey.name = name
        journey.country = country
        journey.startDate = startDate
        journey.endDate = endDate
        changeJourney({journey})
    }

    return (
        <form className="add-Journey" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Journey </label>
                <input type='text' placeholder='Add Journey Name' value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Country </label>
                <input type='text' placeholder='Add Country Name' value={country} onChange={(e)=> setCountry(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Start Date </label>
                <input type='date' placeholder='Add Start Date' value={startDate} onChange={(e)=> setStartDate(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>End Date </label>
                <input type='date' placeholder='Add End Date' value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
            </div>
            <div className="add-input">
                <input type='submit' value='Change Journey'/>
            </div>
        </form>
    )
}
export default ChangeJourney