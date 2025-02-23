from flask import Flask, request, jsonify
import numpy as np
from sklearn.ensemble import RandomForestClassifier  # Import your model

app = Flask(_name_)

# Load your trained model (replace 'your_model.pkl' with the actual path)
import joblib  # For model persistence
rf = joblib.load('.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Get the JSON data sent from JavaScript
        js_array = data['inputArray']  # Extract the array

        # Convert to NumPy array and reshape (important!)
        np_array = np.array(js_array).reshape(1, -1)  # Reshape for sklearn

        # Make sure the number of features matches what your model expects
        if np_array.shape[1] != X_train.shape[1]:  # Replace X_train if needed
            return jsonify({'error': 'Incorrect number of features'}), 400

        # Make the prediction
        prediction = rf.predict(np_array)

        return jsonify({'prediction': prediction.tolist()})  # Send back as list

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Handle errors

if _name_ == '_main_':
    app.run(debug=True)  # Set debug=False in production