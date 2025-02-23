import joblib
import numpy as np
import pandas as pd
import sys
import json
import warnings

# Ignore sklearn warnings about feature names
warnings.simplefilter(action="ignore", category=UserWarning)

# Load the trained model
try:
    model = joblib.load("cattle_disease_model_final.joblib")
    feature_names = model.feature_names_in_  # Get feature names if available
except FileNotFoundError:
    print(json.dumps({"error": "Model file not found."}))
    exit()

def predict(input_data):
    try:
        # Ensure input_data is a list of numbers
        input_array = np.array([float(x) for x in input_data]).reshape(1, -1)

        # Convert to DataFrame if model was trained with feature names
        if hasattr(model, "feature_names_in_"):
            input_df = pd.DataFrame(input_array, columns=feature_names)
            prediction = model.predict(input_df)
        else:
            prediction = model.predict(input_array)

        return {"prediction": prediction.tolist()}
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    try:
        # Read JSON input from stdin (from Node.js or API request)
        input_json = json.loads(sys.stdin.read())
        input_data = input_json.get("input", "")

        if not input_data:
            print(json.dumps({"error": "No input data provided."}))
            exit()

        result = predict(input_data)
        print(json.dumps(result))  # Send JSON response
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input."}))
