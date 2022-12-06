import { combineReducers } from 'redux';
import ticketReducer from './TicketReducers';
import approverReducer from './ApproverReducers';

const rootReducer = combineReducers({
    ticketReducer,
    approverReducer
});

export default rootReducer;