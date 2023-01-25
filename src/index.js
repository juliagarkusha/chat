import './index.scss';
import Controller from './Controller';

const rootEl = document.querySelector('#root .messages');
const controller = new Controller(rootEl);
controller.renderChat();
