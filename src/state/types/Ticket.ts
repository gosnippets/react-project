export const ticketConstants = {
  TICKET_LOADING: "TICKET_LOADING",
  TICKET_SUCCESS: "TICKET_SUCCESS",
  TICKET_FAIL: "TICKET_FAIL",
};

export type TicketType = {
  title: string,
  description: string,
  approver: string,
  categoryType: string,
  priorityType: string,
  ticketType: string,
  timelineType: string,
  fromDate?: Date | null,
  toDate?: Date | null
}

export interface TicketLoading {
  type: typeof ticketConstants.TICKET_LOADING
  payload?: TicketType
  error?: string
}

export interface TicketSuccess {
  type: typeof ticketConstants.TICKET_SUCCESS,
  payload: TicketType
  error?: string
}

export interface TicketFail {
  type: typeof ticketConstants.TICKET_FAIL
  payload?: TicketType
  error: string
}

export type TicketDispatchTypes = TicketLoading | TicketSuccess | TicketFail 