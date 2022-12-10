import { ticketConstants, TicketDispatchTypes, TicketType } from '../types';

interface ITicket {
  loading: boolean,
  ticket?: TicketType,
  isError?: boolean,
  error?: string
}

const defaultTicket: ITicket = {
  loading: false
};

const ticketReducer = (state: ITicket = defaultTicket, action: TicketDispatchTypes): ITicket => {
  switch (action.type) {
    case ticketConstants.TICKET_LOADING:
      return {
        loading: true,
      }
    case ticketConstants.TICKET_SUCCESS:
      return {
        loading: false,
        ticket: action.payload
      }
    case ticketConstants.TICKET_FAIL:
      return {
        loading: false,
        isError:true,
        error:action.error
      }
    default:
      return state
  }
};


export default ticketReducer;