import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { Activity } from '../../../lib/types'

type Props = {
  closeForm: () => void;
  Activity?: Activity;
  submitForm: (activity: Activity) => void;
}
export default function ActivityForm({ Activity, closeForm, submitForm }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data : {[key:string]: FormDataEntryValue} ={}
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if(Activity) data.id = Activity.id;
    submitForm(data as unknown as Activity);
  };
  return (
    <Paper sx={{ padding: 3, borderRadius: 3 }} >
<Typography variant="h5" gutterBottom color="primary">
    Create Activity
</Typography>
<Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
    <TextField name='title' label="Title" defaultValue={Activity?.title}/>
    <TextField name="description" label="Description" defaultValue={Activity?.title} multiline rows={3} />
    <TextField name="category" label='Category' defaultValue={Activity?.category} />
    <TextField name="date" label="Date" defaultValue={Activity?.date} type="date"/>
    <TextField name="city" label="City" defaultValue={Activity?.city}/>
    <TextField name="venue" label="Venue" defaultValue={Activity?.venue}/>
    <Box display= 'flex' justifyContent= 'end' gap= {3} >
    <Button onClick={closeForm} color="inherit" size="large">Cancel</Button>
    <Button type="submit" color="success" variant="contained">Submit</Button>
    </Box>
</Box>
</Paper>
  )
}