import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

interface MyProps {
    index: string,
    title: string,
    children?: React.ReactNode
}

function CustomAccordion({ index, title, children }: MyProps) {
    return (
        <Grid container spacing={2} sx={{ mb: '15px' }} className='m-accordion'>
            <Grid item xs={2} md={1} lg={0.6} >
                <Avatar sx={{ mt: '5px' }} className='a-avatar'>{index}</Avatar>
            </Grid>
            <Grid item xs={10} md={11} lg={11.4}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className='a-typography'>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pb: '35px' }}>{children}</AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
}

export default CustomAccordion;