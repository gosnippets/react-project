export const ticketConstants = {
  TICKET_LOADING: "TICKET_LOADING",
  TICKET_SUCCESS: "TICKET_SUCCESS",
  TICKET_FAIL: "TICKET_FAIL",
};

export type TicketType = {
  title: string,
  description: string,
}

export interface TicketLoading {
  type: typeof ticketConstants.TICKET_LOADING
  payload?: TicketType
}

export interface TicketSuccess {
  type: typeof ticketConstants.TICKET_SUCCESS,
  payload: TicketType
}

export interface TicketFail {
  type: typeof ticketConstants.TICKET_FAIL
  payload?: TicketType
}

export type TicketDispatchTypes = TicketLoading | TicketSuccess | TicketFail 