from flask import Flask, make_response, request, jsonify
from deepgram import Deepgram
from flask_cors import CORS
import json, asyncio

app = Flask(__name__)
CORS(app, origins=['http://10.195.103.203:8081', 'exp://10.195.103.203:8081'])

DEEPGRAM_API_KEY = 'b52c494019d6621040e163b32c222aa2175db709'

FILE = '/Users/shalinjoshi/Downloads/bueller-life-moves-pretty-fast_uud9ip.wav'

MIMETYPE = 'audio/wav'

Deepgram = Deepgram(DEEPGRAM_API_KEY)

async def get_transcription():

    audio = open(FILE, 'rb')

    source = {
        'buffer': audio,
        'mimetype': MIMETYPE
    }

    response = await asyncio.create_task(Deepgram.transcription.prerecorded(
        source,{
        'smart_format': True,
        'model': 'nova-2',
            }
        )
    )
    
    response = response["results"]["channels"][0]["alternatives"][0]["transcript"]
    return response

@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({'message': 'Test endpoint works!'})
    
@app.route('/', methods=['POST'])
def transcribe():
    try:
        # Get the video URI from the request JSON
        print('Received POST request:', request.data)  # Log the request data
        video_file = request.files['video']
        print(video_file)
        # Perform transcription using the provided video URI
        #return asyncio.run(get_transcription())
        return video_file


    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# The generic route for handling other methods (e.g., GET)
@app.route('/', methods=['GET'])
def handle_get_request():
    return jsonify({'message': 'GET method not allowed'}), 405


if __name__ == '__main__':
    app.run(debug=True, port=8000)
