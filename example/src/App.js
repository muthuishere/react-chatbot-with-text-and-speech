import React, {useEffect,useRef,useState} from 'react'
import {useFormik} from "formik";
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
const ChatBotWithStatic = () => {
  const options = {
    botImageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Boss-icon.png",
    speechRecognition: false,
    textToSpeech: true,
    inputBoxPlaceholder: 'Your Text Here',

  }
  const handleMessage = (message) => {
    return { text: 'echo  ' + message.data }
  }
  return <ChatBotComponent options={options} handleMessage={handleMessage} />
}


const ChatBotWithDemo = () => {


  const defaultOptions = {
    botImageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Boss-icon.png",
    speechRecognition: false,
    textToSpeech: true,
    inputBoxPlaceholder: 'Your Text Here',
    url:"",
  }

  const availableOptions = {
    botImageUrl: "Image URL",
    speechRecognition:"true or false",
    textToSpeech:"true or false",
    inputBoxPlaceholder:"Any string",
    url:"Enter URL for getting chat response.",
  }
  const [options, setOptions] = useState(defaultOptions);

  const formik = useFormik({
    initialValues: {
      ...defaultOptions
    },
    onSubmit: values => {
      setOptions(values)
    },
  });


  const handleMessage = async (message) => {
    if (options.url && options.url.length > 0) {
      const result = await fetch(options.url + '?question=' + message.data);
      const json = await result.json();
      return {text: json.result}
    }else{
      return {text: 'echo ' + message.data}
    }

  }
  return (
      <div className="container-fluid">
        <h2> Talking and Listening ChatBot Demo</h2>
        <div className="row">
          <div className="col-6">
            <ChatBotComponent options={options} handleMessage={handleMessage} />
          </div>
          <div className="col-6">
            <h3> Change values to see in action</h3>
            <form onSubmit={formik.handleSubmit}>

              {Object.keys(defaultOptions).map((key) => (
                <div className="form-group" key={"div" + key}>
                  <label htmlFor={key}>{key}</label>
                  <input className="form-control" id={key} name={key} type="text" onChange={formik.handleChange} value={formik.values[key]} />
                  <small id={key + "Help"} className="form-text text-muted">{availableOptions[key]}</small>
                </div>
              ))}

              <br/><small> chat response will pass {"{YOUR_API_URL}?question=CHAT_BOT_QUESTION"}</small>
              <br/> <small> example http://localhost:5000/api/answer </small>
              <br/><small> response should be {"{result:YOUR_ANSWER}"} ,</small>
              <br/><small> if not provided , it will echo the same</small>
              <br/>
              <br/>
              <br/>
              <button type="submit">Submit</button>

            </form>
          </div>

        </div>
      </div>
    )


}

const App = () => {



  return <>
    {/*<h2>Http</h2>*/}
    {/*<ChatBotWithHttp/>*/}
    {/*<h2>Websocket</h2>*/}
    {/*<ChatBotWithWebsocket/>*/}
    {/*<h2> Static</h2>*/}
    {/*<ChatBotWithStatic/>*/}

    <ChatBotWithDemo/>
    </>
}

export default App
