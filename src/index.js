import './index.scss';
import Controller from './Controller';

const rootEl = document.querySelector('#root');
const controller = new Controller(rootEl);
controller.renderChat();
