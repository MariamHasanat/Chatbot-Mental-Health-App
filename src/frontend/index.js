import { startConversation } from './js/scripts.js';

import './styles/login.scss';
import './styles/styles.scss';
import './assets/chat-bot-bro-1.svg';

window.Client = window.Client || {}; 
window.Client.startConversation = startConversation; 

console.log("Client is now available globally:", window.Client);

export { startConversation };