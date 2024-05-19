import axios from "axios";
import { AUTH_SERVICE_URL } from "../constants/constants";


export const AUTH_API = axios.create({baseURL:AUTH_SERVICE_URL})

