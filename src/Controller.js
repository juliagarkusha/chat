import MessagesApi from "./models/MessagesApi";
import MessagesSound from "./models/MessagesSound";
import WriteMessageFormView from './view/WriteMessageFormView';
import ChatView from './view/ChatView';

class Controller {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.chatView = new ChatView();
    this.ws = new MessagesApi((message) => {
      this.chatView.renderMessage(message);
    });
    this.writeMessageFormView = new WriteMessageFormView({
      onSubmit: (data) => {
        this.ws.sendMessage({
          time: Date.now(),
          ...data,
        });
      }
    });

  }

  renderChat() {
    this.chatView.appendTo(this.rootEl);
    this.writeMessageFormView.appendTo(this.rootEl);
    this.chatView.renderMessages();
  }
}

export default Controller;
