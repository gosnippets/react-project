import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, InputLabel, MenuItem, Stack, Typography, Select, SelectChangeEvent } from '@mui/material';
import CustomAccordion from '../../components/Common/CustomAccordion';
import TicketForm from '../../components/Common/TicketForm';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { RootStore } from '../../state/store';
import { createTicket, getApprovers } from '../../state/actions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const approvers = [
//     'Zain Press',
//     'Martin Septimus',
//     'Lydia Rhiel Madsen',
//     'Livia Culhane',
//     'Angel Dorwart',
//     'Livia Curtis',
//     'Tatiana Kenter'
// ];

const approvers = [
    {
        "id": 3,
        "firstName": "approver",
        "lastName": "lastname",
        "email": "approver@afourtech.com",
        "department": {},
        "role": {
            "role": "RTHREE",
            "label": "role3",
            "id": 3
        },
        "active": true
    },
    {
        "id": 1,
        "firstName": "super",
        "lastName": "lastname",
        "email": "superadmin@afourtech.com",
        "department": {},
        "role": {
            "role": "RONE",
            "label": "role1",
            "id": 1
        },
        "active": true
    },
    {
        "id": 2,
        "firstName": "admin",
        "lastName": "lastname",
        "email": "admin1@afourtech.com",
        "department": {},
        "role": {
            "role": "RTWO",
            "label": "role2",
            "id": 2
        },
        "active": true
    }
];

const ticketSchema = Yup.object().shape({
    title: Yup.string().min(10, 'Minimum 10 Symbols').max(200, 'Maximum 200 Symbols').required('Title is Required'),
    description: Yup.string().min(30, 'Minimum 30 Symbols').max(500, 'Maximum 500 Symbols').required('Description is Required'),
    ticketType: Yup.string().required('Type is Required'),
    categoryType: Yup.string().required('Category is Required'),
    priorityType: Yup.string().required('Priority is Required'),
    timelineType: Yup.string().required('Timeline is Required'),
    approver: Yup.string().required('Approver is Required'),
    fromDate: Yup.date().when("timelineType", {
        is: (val: string) => val === "Permanant",
        then: Yup.date().nullable(),
        otherwise: Yup.date().required('From Date is Required').typeError("Please enter a valid date")
    }),
    toDate: Yup.date().when("timelineType", {
        is: (val: string) => val === "Permanant",
        then: Yup.date().nullable(),
        otherwise: Yup.date().required('To Date is Required').typeError("Please enter a valid date")
    }),
})

const initialValues = {
    title: '',
    description: '',
    ticketType: '',
    categoryType: '',
    priorityType: '',
    timelineType: '',
    approver: '',
    fromDate: null,
    toDate: null,
}


function ScreenOne() {
    const dispatch = useDispatch();
    const [approver, setApprover] = useState('');
    const [loading, setLoading] = useState(false);

    const ticketState = useSelector((state: RootStore) => state.ticketReducer);
    const approverState = useSelector((state: RootStore) => state.approverReducer);

    useEffect(() => {
        dispatch(getApprovers());
        // eslint-disable-next-line
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema: ticketSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            console.log('Values', values);
            dispatch(createTicket(values));
            console.log("ticketState", ticketState);
            setLoading(true)
        }
    });

    useEffect(() => {
        if (formik.values.timelineType === 'Permanant') {
            formik.setFieldValue("fromDate", null);
            formik.setFieldValue("toDate", null);
        }
    }, [formik.values.timelineType]);

    console.log('approvers', approverState, formik.values?.timelineType, formik.values);

    const handleChange2 = (event: SelectChangeEvent) => {
        setApprover(event.target.value);
        formik.setFieldValue("approver", event.target.value);
    };

    const getApprover = (id: any) => {
        return approvers.find(approver => approver.id === id);
    }

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
                            var approver = getApprover(selected);
                            if (selected.length === 0) {
                                return <span className='menuitem-placeholder'>Select Approver's Name</span>;
                            }
                            return approver?.firstName + ' ' + approver?.lastName;
                        }}>
                        {approvers.map((approver) => (
                            <MenuItem key={approver.id} value={approver.id}>{approver.firstName + ' ' + approver.lastName}</MenuItem>
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
                <Button type='reset' variant="text" disabled={formik.isSubmitting} onClick={e => formik.resetForm}>Cancel</Button>
                <Button type='submit' variant="contained" disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}>
                    {!loading && <span>Submit</span>}
                    {loading && (<span>Submitting... </span>)}
                </Button>
            </Stack>
        </form>
    </>);
}

export default ScreenOne;
