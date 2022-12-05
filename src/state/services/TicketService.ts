import axios from "./axios-common";
import { TicketType } from "../types";

const API_URL = process.env.BASE_URL_API || 'api'

const createTicket = (data: TicketType) => {
  return axios.post(API_URL + "/ticket/createTicket", data);
};

export const ticketService = { createTicket }; 