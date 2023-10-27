import numpy as np
from PIL import Image
import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.python.layers import layers
from keras.models import load_model

X_test = []
#y_test = []
image_width = 48
image_height = 48

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

model = tf.keras.models.load_model('emotion_model.keras')
predictions = model.predict(X_test)