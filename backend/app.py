# import os
# os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0" 
# import numpy as np
# import tensorflow as tf
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# from PIL import Image

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}}) 

# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # loading the model
# # MODEL_PATH = "model.h5"
# MODEL_PATH = "best_cnn_lstm_ecp_msw.h5"
# try:
#     model = tf.keras.models.load_model(MODEL_PATH)
#     print("✅ Model loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading model: {str(e)}")
#     model = None

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "Cyclone Prediction API Running!"})

# # Defining min-max values of used during normalization
# ECP_MIN, ECP_MAX = 932.0, 1005.0  
# MSW_MIN, MSW_MAX = 20.0, 115.0    

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         #make sures 6 images are uploaded
#         if "files" not in request.files:
#             return jsonify({"error": "No files provided"}), 400

#         files = request.files.getlist("files")
#         if len(files) != 6:
#             return jsonify({"error": "Exactly 6 images required"}), 400

#         images = []
#         for i, file in enumerate(files):
#             if file.filename == "":
#                 return jsonify({"error": f"File {i+1} is empty"}), 400

#             filename = secure_filename(file.filename)
#             filepath = os.path.join(UPLOAD_FOLDER, filename)
#             file.save(filepath)

#             #preprocess the images
#             img = Image.open(filepath).convert("L")  
#             img = img.resize((64, 64))  
#             img_array = np.array(img).astype("float32") / 255.0 
#             images.append(img_array)

#         images_array = np.array(images).reshape(1, 6, 64, 64, 1)

#         prediction = model.predict(images_array)

#         print(f"🔍 Model Output (Normalized): {prediction}")  

#         # Denomralizing the predicted values
#         ecp_normalized, msw_normalized = prediction 
#         ecp = ecp_normalized[0][0] * (ECP_MAX - ECP_MIN) + ECP_MIN
#         msw = msw_normalized[0][0] * (MSW_MAX - MSW_MIN) + MSW_MIN

#         return jsonify({"ECP": float(ecp), "MSW": float(msw)})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)


#grad-cam integration
# import os
# os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0" 
# import numpy as np
# import tensorflow as tf
# import cv2
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# from PIL import Image
# import base64
# import io

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # MODEL_PATH = "best_cnn_lstm_ecp_msw.h5"
# MODEL_PATH = "best_cnn(deep)_lstm_ecp_msw.h5"
# try:
#     model = tf.keras.models.load_model(MODEL_PATH)
#     #Grad-CAM model
#     TARGET_LAYER = "time_distributed_6" 
#     grad_model = tf.keras.models.Model(
#         inputs=model.input,
#         outputs=[model.get_layer(TARGET_LAYER).output, model.output]
#     )
#     print("✅ Models loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading models: {str(e)}")
#     model = None
#     grad_model = None

# #min-max values used during normalization
# ECP_MIN, ECP_MAX = 932.0, 1005.0
# MSW_MIN, MSW_MAX = 20.0, 115.0

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({
#         "status": "online",
#         "message": "Cyclone Prediction API is running!",
#         "endpoints": {
#             "/": "GET - Health check",
#             "/predict": "POST - Make predictions with image upload"
#         }
#     })

# @app.route("/health", methods=["GET"])
# def health_check():
#     return jsonify({
#         "status": "healthy",
#         "model_loaded": model is not None and grad_model is not None
#     })

# def generate_gradcam(images_array):
#     # Compute gradients
#     with tf.GradientTape() as tape:
#         conv_output, predictions = grad_model(images_array, training=False)
#         loss = predictions[0][0]  # Loss w.r.t. the first output (MSW)

#     # Compute gradients of loss w.r.t. feature maps
#     grads = tape.gradient(loss, conv_output)
#     pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

#     # Multiply feature maps by their importance weights
#     conv_output = conv_output.numpy()[0]
#     heatmap = np.mean(conv_output * pooled_grads.numpy(), axis=-1)

#     # Get last frame heatmap
#     heatmap = heatmap[-1]  # Select last frame
    
#     # Process original image
#     original_image = images_array[0, -1, :, :, 0]  # Last frame
#     original_image_rgb = cv2.cvtColor((original_image * 255).astype(np.uint8), cv2.COLOR_GRAY2RGB)
    
#     # Resize and normalize heatmap
#     heatmap_resized = cv2.resize(heatmap, (original_image.shape[1], original_image.shape[0]))
#     heatmap_resized = cv2.normalize(heatmap_resized, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
    
#     # Apply colormap
#     heatmap_colored = cv2.applyColorMap(heatmap_resized, cv2.COLORMAP_JET)
    
#     # Create overlay
#     overlayed_image = cv2.addWeighted(original_image_rgb, 0.6, heatmap_colored, 0.4, 0)
    
#     # Convert images to base64
#     def img_to_base64(img):
#         _, buffer = cv2.imencode('.png', img)
#         return base64.b64encode(buffer).decode('utf-8')
    
#     return {
#         'original': img_to_base64(original_image_rgb),
#         'heatmap': img_to_base64(heatmap_colored),
#         'overlay': img_to_base64(overlayed_image)
#     }

# @app.route("/predict", methods=["POST", "OPTIONS"])
# def predict():
#     # Handle preflight OPTIONS request
#     if request.method == "OPTIONS":
#         response = jsonify({"status": "ok"})
#         response.headers.add("Access-Control-Allow-Methods", "POST")
#         response.headers.add("Access-Control-Allow-Headers", "Content-Type")
#         return response

#     try:
#         if "files" not in request.files:
#             return jsonify({"error": "No files provided"}), 400

#         files = request.files.getlist("files")
#         if len(files) != 6:
#             return jsonify({"error": "Exactly 6 images required"}), 400

#         images = []
#         for i, file in enumerate(files):
#             if file.filename == "":
#                 return jsonify({"error": f"File {i+1} is empty"}), 400

#             filename = secure_filename(file.filename)
#             filepath = os.path.join(UPLOAD_FOLDER, filename)
#             file.save(filepath)

#             img = Image.open(filepath).convert("L")
#             img = img.resize((64, 64))
#             img_array = np.array(img).astype("float32") / 255.0
#             images.append(img_array)

#         images_array = np.array(images).reshape(1, 6, 64, 64, 1)

#         # Get predictions
#         prediction = model.predict(images_array)
        
#         # Generate Grad-CAM visualization
#         gradcam_images = generate_gradcam(images_array)

#         # Denormalize predictions
#         ecp_normalized, msw_normalized = prediction
#         ecp = ecp_normalized[0][0] * (ECP_MAX - ECP_MIN) + ECP_MIN
#         msw = msw_normalized[0][0] * (MSW_MAX - MSW_MIN) + MSW_MIN

#         return jsonify({
#             "ECP": float(ecp), 
#             "MSW": float(msw),
#             "gradcam": gradcam_images
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, host='0.0.0.0', port=5000)

#grad-cam and publish feature integration
# import os
# os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0" 
# import numpy as np
# import tensorflow as tf
# import cv2
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# from PIL import Image
# import base64
# import io
# from publish_routes import publish_bp, db
# #alert import
# import requests

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cyclone_predictions.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)
# app.register_blueprint(publish_bp)


# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # MODEL_PATH = "best_cnn_lstm_ecp_msw.h5"
# MODEL_PATH = "best_cnn(deep)_lstm_ecp_msw.h5"
# try:
#     model = tf.keras.models.load_model(MODEL_PATH)
#     #Grad-CAM model
#     TARGET_LAYER = "time_distributed_6" 
#     grad_model = tf.keras.models.Model(
#         inputs=model.input,
#         outputs=[model.get_layer(TARGET_LAYER).output, model.output]
#     )
#     print("✅ Models loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading models: {str(e)}")
#     model = None
#     grad_model = None

# #min-max values used during normalization
# ECP_MIN, ECP_MAX = 932.0, 1005.0
# MSW_MIN, MSW_MAX = 20.0, 115.0

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({
#         "status": "online",
#         "message": "Cyclone Prediction API is running!",
#         "endpoints": {
#             "/": "GET - Health check",
#             "/predict": "POST - Make predictions with image upload"
#         }
#     })

# @app.route("/health", methods=["GET"])
# def health_check():
#     return jsonify({
#         "status": "healthy",
#         "model_loaded": model is not None and grad_model is not None
#     })

# def generate_gradcam(images_array):
#     # Compute gradients
#     with tf.GradientTape() as tape:
#         conv_output, predictions = grad_model(images_array, training=False)
#         loss = predictions[0][0]  # Loss w.r.t. the first output (MSW)

#     # Compute gradients of loss w.r.t. feature maps
#     grads = tape.gradient(loss, conv_output)
#     pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

#     # Multiply feature maps by their importance weights
#     conv_output = conv_output.numpy()[0]
#     heatmap = np.mean(conv_output * pooled_grads.numpy(), axis=-1)

#     # Get last frame heatmap
#     heatmap = heatmap[-1]  # Select last frame
    
#     # Process original image
#     original_image = images_array[0, -1, :, :, 0]  # Last frame
#     original_image_rgb = cv2.cvtColor((original_image * 255).astype(np.uint8), cv2.COLOR_GRAY2RGB)
    
#     # Resize and normalize heatmap
#     heatmap_resized = cv2.resize(heatmap, (original_image.shape[1], original_image.shape[0]))
#     heatmap_resized = cv2.normalize(heatmap_resized, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
    
#     # Apply colormap
#     heatmap_colored = cv2.applyColorMap(heatmap_resized, cv2.COLORMAP_JET)
    
#     # Create overlay
#     overlayed_image = cv2.addWeighted(original_image_rgb, 0.6, heatmap_colored, 0.4, 0)
    
#     # Convert images to base64
#     def img_to_base64(img):
#         _, buffer = cv2.imencode('.png', img)
#         return base64.b64encode(buffer).decode('utf-8')
    
#     return {
#         'original': img_to_base64(original_image_rgb),
#         'heatmap': img_to_base64(heatmap_colored),
#         'overlay': img_to_base64(overlayed_image)
#     }

# @app.route("/predict", methods=["POST", "OPTIONS"])
# def predict():
#     # Handle preflight OPTIONS request
#     if request.method == "OPTIONS":
#         response = jsonify({"status": "ok"})
#         response.headers.add("Access-Control-Allow-Methods", "POST")
#         response.headers.add("Access-Control-Allow-Headers", "Content-Type")
#         return response

#     try:
#         if "files" not in request.files:
#             return jsonify({"error": "No files provided"}), 400

#         files = request.files.getlist("files")
#         if len(files) != 6:
#             return jsonify({"error": "Exactly 6 images required"}), 400

#         images = []
#         for i, file in enumerate(files):
#             if file.filename == "":
#                 return jsonify({"error": f"File {i+1} is empty"}), 400

#             filename = secure_filename(file.filename)
#             filepath = os.path.join(UPLOAD_FOLDER, filename)
#             file.save(filepath)

#             img = Image.open(filepath).convert("L")
#             img = img.resize((64, 64))
#             img_array = np.array(img).astype("float32") / 255.0
#             images.append(img_array)

#         images_array = np.array(images).reshape(1, 6, 64, 64, 1)

#         # Get predictions
#         prediction = model.predict(images_array)
        
#         # Generate Grad-CAM visualization
#         gradcam_images = generate_gradcam(images_array)

#         # Denormalize predictions
#         ecp_normalized, msw_normalized = prediction
#         ecp = ecp_normalized[0][0] * (ECP_MAX - ECP_MIN) + ECP_MIN
#         msw = msw_normalized[0][0] * (MSW_MAX - MSW_MIN) + MSW_MIN

#         return jsonify({
#             "ECP": float(ecp), 
#             "MSW": float(msw),
#             "gradcam": gradcam_images
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    

# with app.app_context():
#     db.create_all()

# if __name__ == "__main__":
#     app.run(debug=True, host='0.0.0.0', port=5000)

#ngrok part
import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0" 
import numpy as np
import tensorflow as tf
import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import base64
import io
from publish_routes import publish_bp, db
#alert import
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cyclone_predictions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.register_blueprint(publish_bp)


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# MODEL_PATH = "best_cnn_lstm_ecp_msw.h5"
MODEL_PATH = "best_cnn(deep)_lstm_ecp_msw.h5"
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    #Grad-CAM model
    TARGET_LAYER = "time_distributed_6" 
    grad_model = tf.keras.models.Model(
        inputs=model.input,
        outputs=[model.get_layer(TARGET_LAYER).output, model.output]
    )
    print("✅ Models loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {str(e)}")
    model = None
    grad_model = None

#min-max values used during normalization
ECP_MIN, ECP_MAX = 932.0, 1005.0
MSW_MIN, MSW_MAX = 20.0, 115.0

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "online",
        "message": "Cyclone Prediction API is running!",
        "endpoints": {
            "/": "GET - Health check",
            "/predict": "POST - Make predictions with image upload"
        }
    })

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None and grad_model is not None
    })

def generate_gradcam(images_array):
    # Compute gradients
    with tf.GradientTape() as tape:
        conv_output, predictions = grad_model(images_array, training=False)
        loss = predictions[0][0]  # Loss w.r.t. the first output (MSW)

    # Compute gradients of loss w.r.t. feature maps
    grads = tape.gradient(loss, conv_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    # Multiply feature maps by their importance weights
    conv_output = conv_output.numpy()[0]
    heatmap = np.mean(conv_output * pooled_grads.numpy(), axis=-1)

    # Get last frame heatmap
    heatmap = heatmap[-1]  # Select last frame
    
    # Process original image
    original_image = images_array[0, -1, :, :, 0]  # Last frame
    original_image_rgb = cv2.cvtColor((original_image * 255).astype(np.uint8), cv2.COLOR_GRAY2RGB)
    
    # Resize and normalize heatmap
    heatmap_resized = cv2.resize(heatmap, (original_image.shape[1], original_image.shape[0]))
    heatmap_resized = cv2.normalize(heatmap_resized, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
    
    # Apply colormap
    heatmap_colored = cv2.applyColorMap(heatmap_resized, cv2.COLORMAP_JET)
    
    # Create overlay
    overlayed_image = cv2.addWeighted(original_image_rgb, 0.6, heatmap_colored, 0.4, 0)
    
    # Convert images to base64
    def img_to_base64(img):
        _, buffer = cv2.imencode('.png', img)
        return base64.b64encode(buffer).decode('utf-8')
    
    return {
        'original': img_to_base64(original_image_rgb),
        'heatmap': img_to_base64(heatmap_colored),
        'overlay': img_to_base64(overlayed_image)
    }

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    # Handle actual POST request
    if request.method == "POST":
        try:
            # Validate file input
            if "files" not in request.files:
                return jsonify({"error": "No files provided"}), 400

            files = request.files.getlist("files")
            if len(files) != 6:
                return jsonify({"error": "Exactly 6 images required"}), 400

            images = []
            for i, file in enumerate(files):
                if file.filename == "":
                    return jsonify({"error": f"File {i+1} is empty"}), 400

                filename = secure_filename(file.filename)
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)

                img = Image.open(filepath).convert("L")
                img = img.resize((64, 64))
                img_array = np.array(img).astype("float32") / 255.0
                images.append(img_array)

            images_array = np.array(images).reshape(1, 6, 64, 64, 1)

            # Get predictions
            prediction = model.predict(images_array)

            # Generate Grad-CAM visualization
            gradcam_images = generate_gradcam(images_array)

            # Denormalize predictions
            ecp_normalized, msw_normalized = prediction
            ecp = ecp_normalized[0][0] * (ECP_MAX - ECP_MIN) + ECP_MIN
            msw = msw_normalized[0][0] * (MSW_MAX - MSW_MIN) + MSW_MIN

            return jsonify({
                "ECP": float(ecp),
                "MSW": float(msw),
                "gradcam": gradcam_images
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)



    

