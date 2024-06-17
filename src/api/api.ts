import axios from "axios";
import { AUTH_SERVICE_URL, CHAT_SERVICE_URL, USER_SERVICE_URL } from "../constants/constants";

export const AUTH_API = axios.create({ baseURL: AUTH_SERVICE_URL })

export const CHAT_API = axios.create({ baseURL: CHAT_SERVICE_URL })

export const USER_API = axios.create({ baseURL: USER_SERVICE_URL })

