import {Grid2, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";
import { useParams } from "react-router";


export default function ActivityDetailPage() {
const {id} = useParams<{id: string}>();
const {activity, isLoadingActivity} = useActivities(id);
    if (isLoadingActivity) return <Typography variant="h5">Loading...</Typography>;
if (!activity) return <Typography>Activity not found</Typography>;
  return (
      <Grid2 container spacing={2} sx={{ mt: 3 }}>
          <Grid2 size={8}>
              <ActivityDetailsHeader activity={activity}/>
              <ActivityDetailsInfo activity={activity}/>
              <ActivityDetailsChat />
          </Grid2>
          <Grid2 size={4}>
            <ActivityDetailsSideBar />
          </Grid2>
      </Grid2>

  )
}