import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.image import ImageDataGenerator


# --- Data Preparation (Necessary to get class labels) ---
# You need this part of the code to correctly map the predicted class index to a label
csv_path = 'train_data.csv'
image_dir = 'Train'
img_height, img_width = 224, 224
batch_size = 32
df = pd.read_csv(csv_path)
image_filename_column = 'images'
df['filepath'] = df[image_filename_column].apply(lambda x: os.path.join(image_dir, x))
train_df, val_df = train_test_split(df, test_size=0.2, random_state=42, stratify=df['label'])
train_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_dataframe(
    dataframe=train_df,
    x_col='filepath',
    y_col='label',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical'
)


# --- Step 1: Load the trained model ---
model_path = 'best_chicken_disease_model.keras'
if not os.path.exists(model_path):
    print(f"Error: The model file '{model_path}' was not found.")
    print("Please make sure you have run the training script successfully.")
else:
    model = load_model(model_path)
    print("Model loaded successfully.")


# --- Step 2: Load and preprocess a random image ---
# Use a raw string with 'r' to handle the backslashes correctly
# You can also use a simple forward slash '/' which works on all platforms
image_path = r"C:\Users\ASUS\OneDrive\Attachments\Desktop\project\Train\salmo.1209.jpg"

if not os.path.exists(image_path):
    print(f"Error: The image file '{image_path}' was not found.")
    print("Please provide a valid path to a test image.")
else:
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    # --- Step 3: Make a prediction ---
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    confidence_score = predictions[0][predicted_class_index]

    # --- Step 4: Interpret the result ---
    # Get the class labels from the training generator's class indices
    class_labels = {v: k for k, v in train_generator.class_indices.items()}
    predicted_label = class_labels[predicted_class_index]

    print("\n--- Prediction Result ---")
    print(f"Image: {image_path}")
    print(f"Predicted Disease: {predicted_label}")
    print(f"Confidence: {confidence_score * 100:.2f}%")