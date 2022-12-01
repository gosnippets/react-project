import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CustomAccordion from '../Common/CustomAccordion';
import TicketForm from './TicketForm';

function ScreenOne() {
    return (<>
        <Typography variant="h6" sx={{ mb: '15px', color: '#2196f3' }} gutterBottom>Create New Ticket</Typography>
        <CustomAccordion index='1' title='Let us know about your ticket'>
            <TicketForm/>
        </CustomAccordion>

        <CustomAccordion index='2' title='Detailed Information'>
            <InputLabel sx={{ mb: '10px' }}>What is your Request?</InputLabel>
            <TextField required placeholder="Enter Title" variant="standard" />
        </CustomAccordion>
    </>);
}

export default ScreenOne;
