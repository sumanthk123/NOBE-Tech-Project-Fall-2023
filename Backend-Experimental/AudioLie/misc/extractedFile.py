import os
import librosa
import numpy as np
import csv

# Directory containing your WAV files
data_directory = '/path/to/your/audio/files/'

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

# Empty lists to store features and corresponding file names
all_features = []
file_names = []

# Iterate through each file in the directory
for file_name in os.listdir(data_directory):
    if file_name.endswith('.wav'):
        file_path = os.path.join(data_directory, file_name)
        
        # Extract features
        features = extract_features(file_path)
        
        if features is not None:
            # Store features and corresponding file names
            all_features.append(features)
            file_names.append(file_name)

# Convert feature list to a numpy array
all_features = np.array(all_features)

# Specify the CSV file name to write the features
csv_file = 'extracted_features.csv'

# Write features and file names to a CSV file
with open(csv_file, 'w', newline='') as file:
    writer = csv.writer(file)
    
    # Write header - feature names
    header = ['File Name'] + [f'Feature_{i}' for i in range(all_features.shape[1])]
    writer.writerow(header)
    
    # Write data rows - file names and corresponding features
    for i in range(len(file_names)):
        row = [file_names[i]] + list(all_features[i])
        writer.writerow(row)

print(f"CSV file '{csv_file}' created successfully.")
