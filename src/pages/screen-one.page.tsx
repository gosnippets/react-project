import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Stack,
    Typography,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import CustomAccordion from "../components/Common/custom-accordion.component";
import TicketForm from "../components/Common/ticket-form.component";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import * as Yup from "yup";
import { useFormik } from "formik";

import { RootStore } from "../state/store";
import { createTicket, getApprovers } from "../state/actions";
import { dateFormat } from "../utils/dateFormat";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ticketSchema = Yup.object().shape({
    title: Yup.string()
        .min(10, "Minimum 10 Symbols")
        .max(200, "Maximum 200 Symbols")
        .required("Title is Required"),
    description: Yup.string()
        .min(10, "Minimum 10 Symbols")
        .max(500, "Maximum 500 Symbols")
        .required("Description is Required"),
    ticketType: Yup.string().required("Type is Required"),
    categoryType: Yup.string().required("Category is Required"),
    priorityType: Yup.string().required("Priority is Required"),
    timelineType: Yup.string().required("Timeline is Required"),
    approver: Yup.string().required("Approver is Required"),
    fromDate: Yup.date().when("timelineType", {
        is: (val: string) => val === "Permanent",
        then: Yup.date().nullable(),
        otherwise: Yup.date()
            .required("From Date is Required")
            .typeError("Please enter a valid date"),
    }),
    toDate: Yup.date().when("timelineType", {
        is: (val: string) => val === "Permanent",
        then: Yup.date().nullable(),
        otherwise: Yup.date().min(Yup.ref('fromDate'), "To date can't be before from date")
            .required("To Date is Required")
            .typeError("Please enter a valid date"),
    }),
});

const initialValues = {
    title: "",
    description: "",
    ticketType: "",
    categoryType: "",
    priorityType: "",
    timelineType: "",
    approver: "",
    fromDate: null,
    toDate: null,
};

function ScreenOne() {
    const dispatch = useDispatch();
    const [approver, setApprover] = useState("");
    const [loading, setLoading] = useState(false);

    const ticketState = useSelector((state: RootStore) => state.ticketReducer);
    const approverState = useSelector(
        (state: RootStore) => state.approverReducer
    );

    useEffect(() => {
        dispatch(getApprovers());
        // eslint-disable-next-line
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema: ticketSchema,
        onSubmit: (values, { setSubmitting }) => {
            setLoading(true);
            setSubmitting(true);

            const data = {
                tickets: {
                    title: values.title,
                    description: values.description,
                    ticketType: { id: values.ticketType },
                    category: { id: values.categoryType },
                    priority: { id: values.priorityType },
                    duration: values.timelineType,
                    approvedBy: { id: values.approver },
                    accessType: "",
                    startDate: dateFormat(values.fromDate),
                    endDate: dateFormat(values.toDate)
                },
                selectedSoftwares: {
                    preApprovedSoftware: []
                },
                images: []
            }

            console.log("data", data);
            dispatch(createTicket(data));
        },
    });

    const resetForm = () => {
        setLoading(false);
        formik.setSubmitting(false);
        formik.resetForm();
        setApprover('');
    }

    useEffect(() => {
        if (ticketState.isSuccess) {
            resetForm();
        }
        if (ticketState.isError) {
            setLoading(false);
            formik.setSubmitting(false);
        }
        // eslint-disable-next-line
    }, [ticketState.isSuccess, ticketState.isError]);

    useEffect(() => {
        if (formik.values.timelineType === "Permanent") {
            formik.setFieldValue("fromDate", null);
            formik.setFieldValue("toDate", null);
        }
        // eslint-disable-next-line
    }, [formik.values.timelineType]);


    const handleChange = (event: SelectChangeEvent) => {
        setApprover(event.target.value);
        formik.setFieldValue("approver", event.target.value);
    };

    const getApprover = (id: any) => {
        return approverState?.approver?.find((approver) => approver.id === id);
    };

    return (
        <>
            <Typography variant="h6" className="p-typography">
                Create New Ticket
            </Typography>

            {ticketState.isSuccess && (
                <div className="msg-container">
                    <Alert severity="success">Ticket added successfully!</Alert>
                </div>
            )}

            {ticketState.isError && (
                <div className="msg-container">
                    <Alert severity="error">{ticketState.error}</Alert>
                </div>
            )}

            <form id="ticket_form" onSubmit={formik.handleSubmit} noValidate>
                <CustomAccordion index="1" title="Let us know about your ticket">
                    <TicketForm formik={formik} />
                </CustomAccordion>

                <CustomAccordion index="2" title="Detailed Information">
                    <InputLabel className="c-label">Approver</InputLabel>
                    <FormControl className="p-select-width" size="small">
                        <Select
                            displayEmpty
                            value={approver}
                            onChange={handleChange}
                            renderValue={(selected) => {
                                var approver = getApprover(selected);
                                if (selected.length === 0) {
                                    return (
                                        <span className="menuitem-placeholder">
                                            Select Approver's Name
                                        </span>
                                    );
                                }
                                return approver?.firstName + " " + approver?.lastName;
                            }}
                        >
                            {approverState?.approver?.map((approver) => (
                                <MenuItem key={approver.id} value={approver.id}>
                                    {approver.firstName + " " + approver.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {formik.touched.approver && formik.errors.approver && (
                        <div className="error-msg-container">
                            <span className="alert" role="alert">
                                {formik.errors.approver}
                            </span>
                        </div>
                    )}
                </CustomAccordion>

                <Stack
                    spacing={2}
                    direction="row"
                    className="p-btn"
                >
                    <Button
                        type="reset"
                        variant="text"
                        disabled={formik.isSubmitting}
                        onClick={e => resetForm()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
                    >
                        {!loading && <span>Submit</span>}
                        {loading && <span>Submitting... </span>}
                    </Button>
                </Stack>
            </form>
        </>
    );
}

export default ScreenOne;
