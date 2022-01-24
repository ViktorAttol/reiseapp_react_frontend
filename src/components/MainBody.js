import Journeys from "./Journeys";
const MainBody = ({journeys}) => {
    return (
        <div className="MainBody">
            <Journeys journeys = {journeys}/>
        </div>
    )
}
export default MainBody