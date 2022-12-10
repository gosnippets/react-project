import { combineReducers } from 'redux';
import ticketReducer from './ticket.reducers';
import approverReducer from './approver.reducers';

const rootReducer = combineReducers({
    ticketReducer,
    approverReducer
});

export default rootReducer;