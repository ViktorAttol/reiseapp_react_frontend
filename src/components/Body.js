
import Journeys from "./Journeys";
import Button from "./Button";
import AddJourney from "./AddJourney";
import {Grid, Paper} from "@material-ui/core/"
import './Body.css';


const Body = ({journeys, onDelete, onAdd, showAddJourney, onAddToggle, changeJourney, addCountry}) => {

    return (
        <div className="body">
            <Grid container>
                <Grid item xs ={2}/>
                <Grid item xs ={8}>
                    <Paper style={{background:'#ffbf00'}}>
                        <Button color={showAddJourney ? 'red' : 'green'} text={showAddJourney ? 'Close' : 'Add'} onClick={onAddToggle} showAddJourney={showAddJourney}/>
                    </Paper>
                </Grid>
                <Grid item xs ={2}/>
                <Grid item xs ={2}/>
                <Grid item xs ={8}>
                    <Paper>
                        {showAddJourney && <AddJourney onAdd={onAdd} addCountry={addCountry}/>}
                    </Paper>
                </Grid>
                <Grid item xs ={2}/>
                <Grid item xs ={2}/>
                <Grid item xs ={8}>
                    <Paper>
                        {journeys.length > 0 ? <Journeys journeys={journeys} onDelete={onDelete} changeJourney={changeJourney}/> : 'No Journeys Saved'}

                    </Paper>
                </Grid>
                <Grid item xs ={2}/>
            </Grid>
        </div>
    )
}
export default Body