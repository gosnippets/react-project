import axios from "./axios-common";
import { TicketType } from "../types";

const createTicket = (data: TicketType) => {
  return axios.post("/tms/tickets/addticket", data);
};

const getApprovers = () => {
  return axios.get("/tms/users?requestor=approvers");
};

export const ticketService = { createTicket, getApprovers }; 