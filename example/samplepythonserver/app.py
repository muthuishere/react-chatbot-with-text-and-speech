from flask import Flask, render_template, request,jsonify
import simple_websocket
from flask_cors import CORS
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

bot = ChatBot('Mr X')

trainer = ChatterBotCorpusTrainer(bot)
trainer.train(
    'chatterbot.corpus.english'
)


def getChatResponse(message):
    # return message
    return bot.get_response(message).text


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/bot', websocket=True)
def echo():
    ws = simple_websocket.Server(request.environ)
    try:
        while True:
            data = ws.receive()
            ws.send(getChatResponse(data))
            if data == 'close':
                break
    except simple_websocket.ConnectionClosed:
        pass
    return ''



@app.route('/api/answer', methods=['GET'])
def answerchat():
    return jsonify({'result': getChatResponse(request.args.get('question'))})


if __name__ == '__main__':
    app.run()
