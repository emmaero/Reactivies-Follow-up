import {useEffect, useState } from "react";
import type { Activity } from "../../lib/types/index.ts";
import { Box, Container, CssBaseline} from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar.tsx";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard.tsx";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then(response => setActivities(response.data))
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(x => x.id === activity.id? activity:x));
    } else {
      const newActivity = {
        ...activity,
        id: (activities.length + 1).toString()
      };
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  };
  const handleDelete = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  }
  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
    <CssBaseline />
      {/* CssBaseline helps to kickstart an elegant, consistent, and simple baseline to build upon */}
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth="xl" sx={{ marginTop: 3 }}>
          <ActivitiesDashboard 
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          selectedActivity = {selectedActivity} 
          editMode={editMode}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}/>
      </Container>
    </Box>
  );
}

export default App
