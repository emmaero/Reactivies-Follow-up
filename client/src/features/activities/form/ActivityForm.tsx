import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { Activity } from '../../../lib/types'
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  closeForm: () => void;
  activity?: Activity;
}
export default function ActivityForm({ activity, closeForm }: Props) {
  const{updateActivity, createActivity} = useActivities();
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
      closeForm();
    }else{
await createActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    }
  };
  return (
    <Paper sx={{ padding: 3, borderRadius: 3 }} >
<Typography variant="h5" gutterBottom color="primary">
    Create Activity
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
    <Button onClick={closeForm} color="inherit" size="large">Cancel</Button>
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