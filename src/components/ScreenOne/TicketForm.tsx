import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function TicketForm() {
    return (
        <form id='ticket_form'>
            <InputLabel sx={{ mb: '10px' }} className='c-label'>What is your Request?</InputLabel>
            <TextField required placeholder="Enter Title" variant="standard" />

            <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>Can you please write in brief about your Request?</InputLabel>
            <TextareaAutosize required minRows={4} placeholder="Enter Description" className='c-textarea' />

            <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>Which type of Ticket would you like to Raise?</InputLabel>
            <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel value="Request" control={<Radio />} label="Request" className='radio-label'/>
                <FormControlLabel value="Issue" control={<Radio />} label="Issue" className='radio-label'/>
                <FormControlLabel value="Security Incident" control={<Radio />} label="Security Incident" className='radio-label'/>
            </RadioGroup>

            <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>What kind of Request you want to proceed with?</InputLabel>
            <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel value="Hardware" control={<Radio />} label="Hardware" className='radio-label'/>
                <FormControlLabel value="Software" control={<Radio />} label="Software" className='radio-label'/>
                <FormControlLabel value="Network" control={<Radio />} label="Network" className='radio-label'/>
                <FormControlLabel value="Access" control={<Radio />} label="Access" className='radio-label'/>
            </RadioGroup>

            <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>Let us know the Priority.</InputLabel>
            <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel value="Critical" control={<Radio />} label="Critical" className='radio-label'/>
                <FormControlLabel value="High" control={<Radio />} label="High" className='radio-label'/>
                <FormControlLabel value="Medium" control={<Radio />} label="Medium" className='radio-label'/>
                <FormControlLabel value="Low" control={<Radio />} label="Low" className='radio-label'/>
            </RadioGroup>

            <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>What is the Timeline of your Request?</InputLabel>
            <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel value="Temporary" control={<Radio />} label="Temporary" className='radio-label'/>
                <FormControlLabel value="Permanant" control={<Radio />} label="Permanant" className='radio-label'/>
            </RadioGroup>

            <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>What is the Duration of your Request?</InputLabel>
            <TextField required placeholder="Enter Title" variant="standard" />


        </form>
    );
}

export default TicketForm;
