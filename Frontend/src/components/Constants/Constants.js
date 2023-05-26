import { io } from "socket.io-client";  
export const BASEURL = "http://localhost:4000/api";
export const socket = io("http://localhost:4000");
