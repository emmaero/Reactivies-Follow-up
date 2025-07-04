import {useEffect, useState } from "react";
import type { Activity } from "./lib/types/index.ts";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then(response => setActivities(response.data))
  }, []);
  return (
    <>
      <Typography variant="h3" className="app">Reactivities</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>
              {activity.title}
            </ListItemText>
            </ListItem>
        ))}
      </List>
    </>
  );
}

export default App
