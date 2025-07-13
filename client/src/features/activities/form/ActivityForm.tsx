import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { Activity } from '../../../lib/types'
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
  const {id} = useParams<{id: string}>();
  const{updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);
const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data : {[key:string]: FormDataEntryValue} ={}
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if(activity){ 
      data.id = activity.id
      await updateActivity.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${activity.id}`);
    }else{
    createActivity.mutate(data as unknown as Activity,{
        onSuccess: (id) => {
          navigate(`/activities/${id}`);
    }
    });
    }
  };
  if (isLoadingActivity) return <Typography>Loading...</Typography>;
  return (
    <Paper sx={{ padding: 3, borderRadius: 3 }} >
<Typography variant="h5" gutterBottom color="primary">
   {activity?'Edit activity': 'Create Activity'}
</Typography>
<Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
    <TextField name='title' label="Title" defaultValue={activity?.title}/>
    <TextField name="description" label="Description" defaultValue={activity?.title} multiline rows={3} />
    <TextField name="category" label='Category' defaultValue={activity?.category} />
    <TextField name="date" label="Date" defaultValue={activity?.date 
      ? new Date(activity.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]} type="date"/>
    <TextField name="city" label="City" defaultValue={activity?.city}/>
    <TextField name="venue" label="Venue" defaultValue={activity?.venue}/>
    <Box display= 'flex' justifyContent= 'end' gap= {3} >
    <Button onClick={()=>navigate('/activities')} color="inherit" size="large">Cancel</Button>
    <Button 
    type="submit" 
    color="success" 
    variant="contained"
    disabled={updateActivity.isPending || createActivity.isPending}
    >Submit</Button>
    </Box>
</Box>
</Paper>
  )
}