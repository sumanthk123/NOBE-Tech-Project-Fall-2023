import os
import librosa
import numpy as np
import csv

# Directory containing your WAV files
main_directory = '/Users/arjunkulkarni/desktop/datasetAudioLie/audio_speech_actors_01-24'

# Function to extract features from a single audio file
def extract_features(file_path):
    try:
        # Load audio file
        y, sr = librosa.load(file_path, sr=None)

        # Extract features - Example features (MFCCs and Spectral Centroid)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  # Mel-frequency cepstral coefficients
        centroid = librosa.feature.spectral_centroid(y=y, sr=sr)  # Spectral centroid

        # Aggregate features (mean, standard deviation, etc.)
        mfccs_mean = np.mean(mfccs, axis=1)
        mfccs_std = np.std(mfccs, axis=1)
        centroid_mean = np.mean(centroid)
        centroid_std = np.std(centroid)

        # Concatenate all features into a single array
        features = np.concatenate([mfccs_mean, mfccs_std, [centroid_mean, centroid_std]])

        return features

    except Exception as e:
        print(f"Error encountered while processing {file_path}: {e}")
        return None

# Specify the CSV file name to write the features
csv_file = 'extracted_features.csv'

# Open the CSV file to write features and file names
with open(csv_file, 'w', newline='') as file:
    writer = csv.writer(file)

    # Write header - feature names
    header = ['File Name'] + [f'Feature_{i}' for i in range(1, 28)]  # Update this number based on your feature count
    writer.writerow(header)

    # Iterate through each folder in the main directory
    for folder in os.listdir(main_directory):
        folder_path = os.path.join(main_directory, folder)

        # Check if it's a directory
        if os.path.isdir(folder_path):
            # Iterate through files in the folder
            for file_name in os.listdir(folder_path):
                if file_name.endswith('.wav'):
                    file_path = os.path.join(folder_path, file_name)
                    print(f"Processing file: {file_path}")  # Add this line to track file processing

                    # Extract features
                    features = extract_features(file_path)

                    if features is not None:
                        # Write data rows - file names and corresponding features
                        row = [file_name] + list(features)
                        writer.writerow(row)

print(f"CSV file '{csv_file}' created successfully.")
