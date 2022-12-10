import axios from "./axios-common";
import { TicketType } from "../types";

const createTicket = (data: TicketType) => {
  const ticket ={
    tickets:data
  }
  return axios.post("/tms/tickets/addticket", ticket);
};

const getApprovers = () => {
  return axios.get("/tms/users?requestor=approvers");
};

export const ticketService = { createTicket, getApprovers }; 