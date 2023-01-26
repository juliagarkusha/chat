import dayjs from "dayjs";

class ChatView {
  static LIST_CLASS = 'messages__list';
  static MESSAGE_CLASS = 'message';
  static MESSAGE_HEADER_CLASS = 'message__header';
  static MESSAGE_BODY_CLASS = 'message__body';
  static MESSAGE_AVATAR_CLASS = 'message__avatar';
  static MESSAGE_AUTHOR_CLASS = 'message__author';
  static MESSAGE_DATE_CLASS = 'message__date';

  constructor() {
    this.chatRootEl = null;
  }

  appendTo(containerEl) {
    const chatRootHtml = this.generateChatContainerHtml();
    containerEl.insertAdjacentHTML('beforeend', chatRootHtml);
    this.chatRootEl = containerEl.querySelector(`.${ChatView.LIST_CLASS}`);
  }

  generateChatContainerHtml() {
    return `
      <div class="${ChatView.LIST_CLASS}"></div>
    `
  }

  renderMessages() {
    this.chatRootEl.innerHTML = '';
  }

  renderMessage(message) {
    const messageHtml = this.generateMessageCardHtml(message);

    this.chatRootEl.insertAdjacentHTML('beforeend', messageHtml);
  }

  generateMessageCardHtml(messageObj) {
    if (!messageObj) {
      return;
    }
    const { message, username, time } = messageObj;
    return `
      <article class="${ChatView.MESSAGE_CLASS}">
        <div class="${ChatView.MESSAGE_HEADER_CLASS}">
          <div class="${ChatView.MESSAGE_AVATAR_CLASS}">${!!username ? username[0] : ''}</div>
          <span class="${ChatView.MESSAGE_AUTHOR_CLASS}">${username}</span>
          <span class="${ChatView.MESSAGE_DATE_CLASS}">${dayjs(Number(time)).format('dddd, HH:mm')}</span>
        </div>
        <div class="${ChatView.MESSAGE_BODY_CLASS}">
          <span>${message}</span>
        </div>
      </article>
    `
  }
}

export default ChatView;
