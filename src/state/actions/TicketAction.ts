import { Dispatch } from "redux";
import { ticketService } from '../services';
import { ticketConstants, TicketDispatchTypes, TicketType } from "../types";

export const createTicket = (ticket: TicketType) => async (dispatch: Dispatch<TicketDispatchTypes>) => {
  dispatch({ type: ticketConstants.TICKET_LOADING });
  try {
    const res = await ticketService.createTicket(ticket);
    dispatch({ type: ticketConstants.TICKET_SUCCESS, payload: res.data })
  } catch (err:any) {
    dispatch({ type: ticketConstants.TICKET_FAIL, error: err.toString() })
  }
};