import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


function TicketForm({ formik }: any) {

    const handleChange = (newValue: Date | null) => {
        console.log('Date', newValue);
    };

    return (<>
        <InputLabel sx={{ mb: '10px' }} className='c-label'>What is your Request?</InputLabel>
        <TextField required placeholder="Enter Title" variant="standard" {...formik.getFieldProps('title')} />
        {formik.touched.title && formik.errors.title && (
            <div className='message-container'>
                <span className='alert' role='alert'>{formik.errors.title}</span>
            </div>
        )}

        <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>Can you please write in brief about your Request?</InputLabel>
        <TextareaAutosize required minRows={4} placeholder="Enter Description" className='c-textarea' {...formik.getFieldProps('description')} />
        {formik.touched.description && formik.errors.description && (
            <div className='message-container'>
                <span className='alert' role='alert'>{formik.errors.description}</span>
            </div>
        )}

        <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>Which type of Ticket would you like to Raise?</InputLabel>
        <RadioGroup row name="row-radio-buttons-group" {...formik.getFieldProps('ticketType')}>
            <FormControlLabel value="Request" control={<Radio />} label="Request" className='radio-label' />
            <FormControlLabel value="Issue" control={<Radio />} label="Issue" className='radio-label' />
            <FormControlLabel value="Security Incident" control={<Radio />} label="Security Incident" className='radio-label' />
        </RadioGroup>
        {formik.touched.ticketType && formik.errors.ticketType && (
            <div className='message-container'>
                <span className='alert' role='alert'>{formik.errors.ticketType}</span>
            </div>
        )}

        <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>What kind of Request you want to proceed with?</InputLabel>
        <RadioGroup row name="row-radio-buttons-group">
            <FormControlLabel value="Hardware" control={<Radio />} label="Hardware" className='radio-label' />
            <FormControlLabel value="Software" control={<Radio />} label="Software" className='radio-label' />
            <FormControlLabel value="Network" control={<Radio />} label="Network" className='radio-label' />
            <FormControlLabel value="Access" control={<Radio />} label="Access" className='radio-label' />
        </RadioGroup>

        <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>Let us know the Priority.</InputLabel>
        <RadioGroup row name="row-radio-buttons-group">
            <FormControlLabel value="Critical" control={<Radio />} label="Critical" className='radio-label' />
            <FormControlLabel value="High" control={<Radio />} label="High" className='radio-label' />
            <FormControlLabel value="Medium" control={<Radio />} label="Medium" className='radio-label' />
            <FormControlLabel value="Low" control={<Radio />} label="Low" className='radio-label' />
        </RadioGroup>

        <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>What is the Timeline of your Request?</InputLabel>
        <RadioGroup row name="row-radio-buttons-group">
            <FormControlLabel value="Temporary" control={<Radio />} label="Temporary" className='radio-label' />
            <FormControlLabel value="Permanant" control={<Radio />} label="Permanant" className='radio-label' />
        </RadioGroup>

        <InputLabel sx={{ mt: '25px', mb: '10px' }} className='c-label'>What is the Duration of your Request?</InputLabel>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='date-container'>
                <div className='date'>
                    <DesktopDatePicker
                        label="From Date"
                        inputFormat="DD/MM/YYYY"
                        onChange={handleChange}
                        {...formik.getFieldProps('fromDate')}
                        renderInput={(params) => <TextField {...params} variant="standard" />}
                    />
                    {formik.touched.fromDate && formik.errors.fromDate && (
                        <div className='message-container'>
                            <span className='alert' role='alert'>{formik.errors.fromDate}</span>
                        </div>
                    )}
                </div>
                <div className='date'>
                    <DesktopDatePicker
                        label="To Date"
                        inputFormat="DD/MM/YYYY"
                        className='date'
                        onChange={handleChange}
                        {...formik.getFieldProps('toDate')}
                        renderInput={(params) => <TextField {...params} variant="standard" />}
                    />
                    {formik.touched.toDate && formik.errors.toDate && (
                        <div className='message-container'>
                            <span className='alert' role='alert'>{formik.errors.toDate}</span>
                        </div>
                    )}
                </div>
            </div>
        </LocalizationProvider>



    </>);
}

export default TicketForm;
