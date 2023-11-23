import { Interpreter } from 'react-native-tflite';

const interpreter = new Interpreter(modelFile);
interpreter.allocateTensors();

const inputData = []

interpreter.setInputTensor(inputData);

interpreter.invoke();

const outputData = interpreter.getOutputTensor(0);

console.log('Model Prediction: ', outputData);