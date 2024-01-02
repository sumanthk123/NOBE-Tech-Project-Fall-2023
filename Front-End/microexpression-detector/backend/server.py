from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import asyncio
import whisper
import subprocess

app = Flask(__name__)
CORS(app)

# Load the Whisper model
model = whisper.load_model("base")

# Global variable to store the transcription
transcriptions = {}

@app.route('/upload', methods=['POST'])
def upload_video():
    """Endpoint to upload a video and process it."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        video_path = os.path.join('/tmp', filename)
        file.save(video_path)

        # Extract audio from the video
        audio_filename = os.path.splitext(filename)[0] + '.mp3'
        audio_path = os.path.join('/tmp', audio_filename)
        if extract_audio_from_video(video_path, audio_path):
            # Transcribe the extracted audio
            transcription = transcribe_audio(audio_path)
            # Store the transcription with a unique key (filename)
            transcriptions[filename] = transcription
            return jsonify({"message": "Video processed successfully", "key": filename})

    return jsonify({"error": "An error occurred"}), 500

def extract_audio_from_video(video_path, output_audio_path):
    """Extracts audio from a video file."""
    try:
        command = ["ffmpeg", "-i", video_path, "-q:a", "0", "-map", "a", output_audio_path, "-y"]
        subprocess.run(command, check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error occurred: {e}")
        return False

def transcribe_audio(audio_path):
    result = asyncio.run(model.transcribe(audio_path, fp16=False))
    os.remove(audio_path)  # Remove the file after processing
    return result["text"]

@app.route('/get_transcription/<key>', methods=['GET'])
def get_transcription(key):
    """Endpoint to get the stored transcription."""
    transcription = transcriptions.get(key, "Transcription not found")
    return jsonify({"transcription": transcription})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
