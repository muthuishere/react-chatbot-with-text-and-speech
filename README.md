# react-chatbot-with-text-and-speech

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-chatbot-with-text-and-speech.svg)](https://www.npmjs.com/package/react-chatbot-with-text-and-speech) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-chatbot-with-text-and-speech
```

## Demo



## Usage


You can use a simple method to return responses based on questions.

The method can return a JSON object with the following properties:
```json
{ text: 'Handle static ' + message.data }
```


```jsx
import React, {useEffect,useRef} from 'react'

import { ChatBotComponent } from 'react-chatbot-with-text-and-speech'
import 'react-chatbot-with-text-and-speech/dist/index.css'


const ChatBotWithStatic = () => {
  const options = {
    botImageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Boss-icon.png",
    speechRecognition: false,
    textToSpeech: true,
    inputBoxPlaceholder: 'Your Text Here',

  }
  const handleMessage = (message) => {
    return { text: 'Handle static ' + message.data }
  }
  return <ChatBotComponent options={options} handleMessage={handleMessage} />
}
```

#### Chatbot with HttP Request

```jsx

import { ChatBotComponent } from 'react-chatbot-with-text-and-speech'
 import 'react-chatbot-with-text-and-speech/dist/index.css'


const ChatBotWithHttp = () => {

  /*
  result of http://localhost:5000/api/answer?question=hi

  {"result":"How are you doing?"}


   */

  const handleMessage = async (message) => {
    try {
      const result = await fetch('http://localhost:5000/api/answer?question=' + message.data);
      const json = await result.json();
      return {text: json.result}

    } catch (e) {
      console.log(e)
      // handle error
    }

  };


  const options = {
    botImageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Boss-icon.png",
    speechRecognition: false,
    textToSpeech: true,
    inputBoxPlaceholder: 'Your Text Here',

  }


  return <ChatBotComponent options={options} handleMessage={handleMessage} />
}
```


#### Chatbot with websocket

```jsx

import { ChatBotComponent } from 'react-chatbot-with-text-and-speech'
 import 'react-chatbot-with-text-and-speech/dist/index.css'

const ChatBotWithWebsocket = () => {


  /*
Implementation ws://127.0.0.1:5000/bot

> Log will appear here
> Connecting to: ws://127.0.0.1:5000/bot
> Connection established
> SENT: hi
> RECEIVED: Hello


   */


  const [webSocketOpened, setWebSocketOpened] = React.useState(false);
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:5000/bot");
    ws.current.onopen = () => setWebSocketOpened(true);
    ws.current.onclose = () =>  setWebSocketOpened(false);

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);



  const handleMessage = (message) => {
    if(!webSocketOpened){
      console.log('Socket not open')
    }

    return new Promise((resolve, reject) => {
      ws.current.addEventListener('message', (event) => {
        console.log('Received message from server',event.data)
        resolve({ text: event.data})
        ws.current.onMessage = null;
      });
      ws.current.send(message.data)
    });

  };


  const options = {
    botImageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Boss-icon.png",
    speechRecognition: false,
    textToSpeech: true,
    inputBoxPlaceholder: 'Your Text Here',

  }


  return <ChatBotComponent options={options} handleMessage={handleMessage} />
}
```

## License

MIT © [muthuishere](https://github.com/muthuishere)
