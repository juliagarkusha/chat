import MessagesSound from "./MessagesSound";

class MessagesApi {
  static URL = 'wss://socketsbay.com/wss/v2/1/demo/';
  static token = 'rusniPizda';

  constructor(onMessage) {
    this.sound = new MessagesSound();
    this.onMessage = onMessage;
    this.ws = new WebSocket(MessagesApi.URL);

    this.ws.onopen = this.onOpenHandler.bind(this);

    this.ws.onerror = (event) => {

    }

    this.ws.onclose = (event) => {
      console.log('debug event close: ', event);
    }
    
    this.ws.onmessage = this.onMessageHandler.bind(this);
  }

  onOpenHandler(event) {
    console.log('debug this: ', this);
    console.log('debug event error: ', event);
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
}

export default MessagesApi;
