// websocket.js
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://http://127.0.0.1:800/notifications/ws/notifications');

export default client;
