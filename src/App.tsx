import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <Container sx={{ m: '2rem' }}>
      <Typography variant="h6" sx={{ mb: '15px', color: '#2196f3' }} gutterBottom>Create New Ticket</Typography>
      <Grid container spacing={2} sx={{ mb: '15px' }}>
        <Grid item xs={0.6}>
          <Avatar sx={{ mt: '5px' }}>1</Avatar>
        </Grid>
        <Grid item xs={11.4}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Let us know about your ticket</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: '15px' }}>
        <Grid item xs={0.6}>
          <Avatar sx={{ mt: '5px' }}>2</Avatar>
        </Grid>
        <Grid item xs={11.4}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Detailed Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
