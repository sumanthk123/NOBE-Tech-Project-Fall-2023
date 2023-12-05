from flask import Flask, make_response
from deepgram import Deepgram
import json, asyncio

app = Flask(__name__)

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


@app.route('/')
def root():
    return asyncio.run(get_transcription())

if __name__ == '__main__':
    app.run(debug=True)
