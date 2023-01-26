import MessagesSound from "./MessagesSound";

class MessagesApi {
  static URL = 'wss://socketsbay.com/wss/v2/1/demo/';
  static token = 'rusniPizda';

  constructor(onMessage) {
    this.sound = new MessagesSound();
    this.onMessage = onMessage;
    this.ws = new WebSocket(MessagesApi.URL);

    this.ws.onopen = this.onOpenHandler.bind(this);

    this.ws.onerror = this.onErrorHandler.bind(this);

    this.ws.onclose = this.onCloseHandler.bind(this);
    
    this.ws.onmessage = this.onMessageHandler.bind(this);
  }

  onMessageHandler(event) {
    try {
      const data = JSON.parse(event.data);

      if (data.token !== MessagesApi.token) {
        return;
      }

      this.onMessage(data);
      this.sound.incomeMessage.play();
    } catch (exception) {
      console.log('Wrong message format!');
    }
  }

  sendMessage(data) {
    const strData = JSON.stringify({...data, token: MessagesApi.token});
    this.ws.send(strData);
    this.onMessage(data);
    this.sound.sendMessage.play();
  }

  onOpenHandler(event) {
    console.log('debug this: ', this);
    console.log('debug event error: ', event);
  }

  onCloseHandler(event) {
    console.log('debug event close: ', event);
  }

  onErrorHandler(event) {
    console.log('debug event error: ', event);
  }
}

export default MessagesApi;
