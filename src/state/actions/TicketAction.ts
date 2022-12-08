import { Dispatch } from "redux";
import { ticketService } from '../services';
import {
  ticketConstants, TicketDispatchTypes, TicketType,
  approverConstants, ApproverDispatchTypes
} from "../types";

export const createTicket = (ticket: TicketType) => async (dispatch: Dispatch<TicketDispatchTypes>) => {
  dispatch({ type: ticketConstants.TICKET_LOADING });
  try {
    const res = await ticketService.createTicket(ticket);
    dispatch({ type: ticketConstants.TICKET_SUCCESS, payload: res.data })
  } catch (err: any) {
    dispatch({ type: ticketConstants.TICKET_FAIL, error: err.toString() })
  }
};

export const getApprovers = () => async (dispatch: Dispatch<ApproverDispatchTypes>) => {
  dispatch({ type: approverConstants.APPROVER_LOADING });
  try {
    const res = await ticketService.getApprovers();
    dispatch({ type: approverConstants.APPROVER_SUCCESS, payload: res.data })
  } catch (err: any) {
    dispatch({ type: approverConstants.APPROVER_FAIL, error: err.toString() })
  }
};