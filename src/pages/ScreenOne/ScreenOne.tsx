import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import CustomAccordion from '../../components/Common/CustomAccordion';
import TicketForm from '../../components/Common/TicketForm';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { RootStore } from '../../state/store';
import { createTicket } from '../../state/actions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const approvers = [
    'Zain Press',
    'Martin Septimus',
    'Lydia Rhiel Madsen',
    'Livia Culhane',
    'Angel Dorwart',
    'Livia Curtis',
    'Tatiana Kenter'
];

const ticketSchema = Yup.object().shape({
    title: Yup.string().min(10, 'Minimum 10 Symbols').max(200, 'Maximum 200 Symbols').required('Title is Required'),
    description: Yup.string().min(30, 'Minimum 30 Symbols').max(500, 'Maximum 500 Symbols').required('Description is Required'),
    ticketType: Yup.string().required('Type is Required'),
    categoryType: Yup.string().required('Category is Required'),
    priorityType: Yup.string().required('Priority is Required'),
    timelineType: Yup.string().required('Timeline is Required'),
    approver: Yup.string().required('Approver is Required'),
    fromDate: Yup.date().required('From Date is Required'),
    toDate: Yup.date().required('To Date is Required'),
})

const initialValues = {
    title: '',
    description: '',
    ticketType: '',
    categoryType: '',
    priorityType: '',
    timelineType: '',
    approver: '',
    fromDate: new Date(),
    toDate: new Date(),
}


function ScreenOne() {
    const [approver, setApprover] = useState('');
    const [loading, setLoading] = useState(false)

    const ticketState = useSelector((state: RootStore) => state.ticketReducer);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        validationSchema: ticketSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            console.log('Values', values);
            dispatch(createTicket(values));
            console.log("ticketState", ticketState);
            setLoading(true)
        }
    })

    const handleChange2 = (event: SelectChangeEvent) => {
        setApprover(event.target.value);
        formik.setFieldValue("approver", event.target.value);
    };

    return (<>
        <Typography variant="h6" sx={{ mb: '15px', color: '#2196f3' }}>Create New Ticket</Typography>
        {formik.status && (
            <div className='error-msg'>
                <Alert severity="error">{formik.status}</Alert>
            </div>
        )}

        {ticketState.isError && (
            <div className='error-msg'>
                <Alert severity="error">{ticketState.error}</Alert>
            </div>
        )}



        <form id='ticket_form' onSubmit={formik.handleSubmit} noValidate>
            <CustomAccordion index='1' title='Let us know about your ticket'>
                <TicketForm formik={formik} />
            </CustomAccordion>

            <CustomAccordion index='2' title='Detailed Information'>
                <InputLabel sx={{ mb: '10px' }} className='c-label'>Approver</InputLabel>
                <FormControl sx={{ minWidth: 250 }} size="small">
                    <Select
                        displayEmpty
                        value={approver}
                        onChange={handleChange2}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <span className='menuitem-placeholder'>Select Approver's Name</span>;
                            }
                            return selected;
                        }}>
                        {approvers.map((approver) => (
                            <MenuItem key={approver} value={approver}>{approver}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {formik.touched.approver && formik.errors.approver && (
                    <div className='message-container'>
                        <span className='alert' role='alert'>{formik.errors.approver}</span>
                    </div>
                )}
            </CustomAccordion>

            <Stack spacing={2} direction="row" sx={{ mt: '35px', justifyContent: 'end' }}>
                <Button type='reset' variant="text" disabled={formik.isSubmitting} onClick={ e => formik.resetForm}>Cancel</Button>
                <Button type='submit' variant="contained" disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}>
                    {!loading && <span>Submit</span>}
                    {loading && (<span>Submitting... </span>)}
                </Button>
            </Stack>
        </form>
    </>);
}

export default ScreenOne;
