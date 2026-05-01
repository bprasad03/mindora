import os
import re
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from bson.objectid import ObjectId
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'dev-secret-mindora-key'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# 1. Initialize the Groq Client
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("Missing GROQ_API_KEY in the .env file.")

client = OpenAI(
    api_key=groq_api_key,
    base_url="https://api.groq.com/openai/v1",
)

mongo_uri = os.getenv("MONGO_URI")
if not mongo_uri:
    raise ValueError("Missing MONGO_URI in the .env file.")

mongo_client = MongoClient(mongo_uri)
db = mongo_client.mindora
print("MongoDB Connected Successfully!")

try:
    model = pickle.load(open("model/emotion_model.pkl", "rb"))
    vectorizer = pickle.load(open("model/vectorizer.pkl", "rb"))
except FileNotFoundError:
    print("Warning: Model files not found.")
    model, vectorizer = None, None

def clean_text(text):
    text = text.lower()
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def remove_stopwords(text):
    words = text.split()
    words = [w for w in words if w not in ENGLISH_STOP_WORDS]
    return " ".join(words)

# Helper function to check password strength
def is_strong_password(password):
    if len(password) < 8:
        return False, "Password must be at least 8 characters long."
    if not re.search(r"[A-Za-z]", password):
        return False, "Password must contain at least one letter."
    if not re.search(r"\d", password):
        return False, "Password must contain at least one number."
    # Optional: Require a special character
    # if not re.search(r"[@$!%*#?&]", password):
    #     return False, "Password must contain at least one special character."
    return True, "Valid"

def get_llm_response(user_text, predicted_emotion):
    system_prompt = f"""
    You are Mindora, a compassionate AI wellness companion. 
    The user is likely feeling {predicted_emotion}. 
    
    CRITICAL INSTRUCTIONS:
    1. VALIDATE: Start by acknowledging their feeling. If they are frustrated, say "I can tell this is really draining for you" instead of "It's great you're trying."
    2. EMPATHIZE: Use "active listening" techniques. Reflect their struggle back to them so they feel heard.
    3. DON'T OVER-PRAISE: Avoid toxic positivity. If someone is struggling, don't tell them it's "great" immediately; sit with them in the frustration first.
    4. GENTLE INQUIRY: Ask one soft question at the end to help them process, such as "What does your body feel like right now as you deal with this?" or "Would you like to take a quick 2-minute breather with me?"
    5. LIMIT: Keep responses between 40-60 words.
    """
    # ... rest of your Groq call ...
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant", # <-- The new, active Groq model
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_text},
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"\n--- Groq API Error: {e} ---\n")
        return "I'm having a little trouble connecting to my thoughts right now. Please give me a moment and try again."

@app.route('/', methods=['GET'])
def home():
    return "Mindora Backend is UP and RUNNING perfectly!"

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # ==========================================
    # NEW: Validate Password Strength!
    # ==========================================
    is_valid, error_msg = is_strong_password(password)
    if not is_valid:
        return jsonify({"error": error_msg}), 400
    # ==========================================

    if db.users.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = {
        "name": name,
        "email": email,
        "password": hashed_password
    }
    db.users.insert_one(new_user)

    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = db.users.find_one({"email": email})

    if user and bcrypt.check_password_hash(user['password'], password):
        user_id_str = str(user['_id'])
        access_token = create_access_token(identity=user_id_str)
        return jsonify({
            "message": "Login successful",
            "token": access_token,
            "user": {
                "id": user_id_str,
                "name": user["name"],
                "email": user["email"]
            }
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message", "")
    
    if not user_message:
        return jsonify({"reply": "I didn't quite catch that. Could you say it again?"})

    predicted_emotion = "neutral"
    
    if model and vectorizer:
        cleaned_msg = clean_text(user_message)
        cleaned_msg = remove_stopwords(cleaned_msg)
        
        if cleaned_msg.strip() == "":
            predicted_emotion = "neutral"
        else:
            vectorized_msg = vectorizer.transform([cleaned_msg])
            predicted_emotion = model.predict(vectorized_msg)[0]
    
    bot_reply = get_llm_response(user_message, predicted_emotion)
    
    return jsonify({
        "reply": bot_reply,
        "detected_emotion": predicted_emotion
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)