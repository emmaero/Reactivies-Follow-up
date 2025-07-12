import { useState } from "react";
import type { Activity } from "../../lib/types/index.ts";
import { Box, Container, CssBaseline, Typography} from "@mui/material";
import NavBar from "./NavBar.tsx";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard.tsx";
import { useActivities } from "../../lib/hooks/useActivities.ts";

function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending}= useActivities();




  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(activity => activity.id === id));
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };  
  const handleOpenForm = (id?:string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    
    setEditMode(true);
  }
  const handleCloseForm = () => {
    setEditMode(false);
  }

  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
    <CssBaseline />
      {/* CssBaseline helps to kickstart an elegant, consistent, and simple baseline to build upon */}
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth="xl" sx={{ marginTop: 3 }}>
        {!activities || isPending ? (<Typography>Loading...</Typography>) 
        :(
        <ActivitiesDashboard 
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          selectedActivity = {selectedActivity} 
          editMode={editMode}
          />
        )}
  
      </Container>
    </Box>
  );
}

export default App
