export const ticketConstants = {
  TICKET_LOADING: "TICKET_LOADING",
  TICKET_SUCCESS: "TICKET_SUCCESS",
  TICKET_FAIL: "TICKET_FAIL",
};

export type TicketType = {
  tickets: Ticket,
  selectedSoftwares: { preApprovedSoftware: Array<string>},
  images: Array<string>
}

export type Ticket = {
  title: string,
  description: string,
  approvedBy: {id:string},
  category: {id:string},
  priority: {id:string},
  ticketType: {id:string},
  duration: string,
  startDate?: string | null,
  endDate?: string | null
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