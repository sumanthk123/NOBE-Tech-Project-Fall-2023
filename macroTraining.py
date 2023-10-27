import numpy as np
from PIL import Image
import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.python.keras import layers
from keras.preprocessing.image import ImageDataGenerator

image_width = 48
image_height = 48

X_train = []
y_train = []

def buildTrain(directory, key):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg"):
            image = Image.open(directory + '/'+ filename)
            image = image.resize((image_width, image_height))
            image_array = np.array(image) / 255.0
            X_train.append(image_array)
            y_train.append(key)

buildTrain('./MEGC2021_generation/source_samples/casme2_challenge/Negative_EP19_06f', [1,0,0])
buildTrain('./MEGC2021_generation/source_samples/casme2_challenge/Positive_EP01_01f', [0,1,0])
buildTrain('./MEGC2021_generation/source_samples/casme2_challenge/Surprise_EP01_13', [0,0,1])



X_train = np.array(X_train)
y_train = np.array(y_train)

model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(48, 48, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(3, activation='softmax')  # 3 output classes: happy, sad, angry
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Load your dataset and preprocess it
# You should replace this with code to load and preprocess your dataset
# For simplicity, we assume you have a dataset in X_train and y_train
# X_train: images (shape: (number_of_samples, 48, 48, 3))
# y_train: one-hot encoded emotion labels (shape: (number_of_samples, 3))

# Define an ImageDataGenerator to augment and preprocess the data (you can customize it)
datagen = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    rescale=1.0 / 255
)

# Fit the model on your data
batch_size = 32
epochs = 10
model.fit(datagen.flow(X_train, y_train, batch_size=batch_size), epochs=epochs)

# Save the model
model.save_weights('emotion_model.keras')

X_test = []
#y_test = []

def buildTest(directory, key):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg"):
            image = Image.open(directory + '/'+ filename)
            image = image.resize((image_width, image_height))
            image_array = np.array(image) / 255.0
            X_test.append(image_array)
            #y_test.append(key)

buildTest('./MEGC2021_generation/source_samples/SAMM_challenge/Negative_018_3_1', [1,0,0])
buildTest('./MEGC2021_generation/source_samples/SAMM_challenge/Positive_022_3_3', [0,1,0])
buildTest('./MEGC2021_generation/source_samples/SAMM_challenge/Surprise_007_7_1', [0,0,1])

predictions = model.predict(X_test)