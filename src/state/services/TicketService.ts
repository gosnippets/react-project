import axios from "./axios-common";
import { TicketType } from "../types";

const createTicket = (data: TicketType) => {
  return axios.post("/ticket/createTicket", data);
};

export const ticketService = { createTicket }; 