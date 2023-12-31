from flask import Flask, make_response, request, jsonify
from deepgram import Deepgram
from flask_cors import CORS
import json, asyncio
import os
from werkzeug.utils import secure_filename
import moviepy.editor as mp

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/Users/shalinjoshi/Downloads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'mov', 'mp3', 'mp4'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


DEEPGRAM_API_KEY = 'b52c494019d6621040e163b32c222aa2175db709'

FILE = '/Users/shalinjoshi/Downloads/bueller-life-moves-pretty-fast_uud9ip.wav'

MIMETYPE = 'audio/mp3'

Deepgram = Deepgram(DEEPGRAM_API_KEY)

async def get_transcription(fp):
    
    audio = open(fp, 'rb')

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
    print(response)
    return response
    
@app.route('/', methods=['POST'])
def transcribe():
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
       
        video_file = request.files['video']  # Get the video URI from the request JSON
        print('Video File:', video_file.filename)
        

        if video_file and allowed_file(video_file.filename):
            # Generate a secure filename
            filename = secure_filename(video_file.filename)
            print('Filename:', filename)
            # Save the file to the upload folder
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            print('Filepath:', filepath)
            video_file.save(filepath)

            # Convert the video to audio
            video = mp.VideoFileClip(filepath)
            audio_filepath = os.path.join(app.config['UPLOAD_FOLDER'], f'{os.path.splitext(filename)[0]}.mp3')
            video.audio.write_audiofile(audio_filepath, codec='mp3')
            print(video)
            #Perform transcription using the provided video URI
            transcript =  asyncio.run(get_transcription(audio_filepath))
            return transcript
            #return jsonify({'message': 'File received successfully', 'filePath': filepath})

        return jsonify({'error': 'Invalid file type'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# The generic route for handling other methods (e.g., GET)
@app.route('/', methods=['GET'])
def handle_get_request():
    return jsonify({'message': 'GET method not allowed'}), 405


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
