# Mindora – AI Mental Wellness Companion

Mindora is an emotion-aware mental wellness chatbot that combines machine learning with large language models to deliver empathetic, context-driven conversations. It detects the user's emotional state from their message using a trained ML classifier, then passes that context to an LLM to generate a compassionate, human-like response — making every interaction feel understood and supported.

Live Link : https://mindora-ten.vercel.app/

---

## What Makes Mindora Different

Unlike generic chatbots, Mindora understands *how* you feel before it responds. By pairing a TF-IDF + Naive Bayes emotion classifier with an LLM backend, it doesn't just answer questions — it adapts its tone, language, and empathy level based on the detected emotion. Whether a user is anxious, sad, stressed, or simply venting, Mindora responds like a thoughtful wellness companion.

---

## Project Structure

```
Mindora/
├── backend/
│   ├── app.py                    # Flask server and main logic
│   ├── requirements.txt          # Python dependencies
│   └── model/
│       ├── emotion_model.pkl     # Trained emotion classifier
│       └── vectorizer.pkl        # TF-IDF vectorizer
└── frontend/
    ├── package.json              # Node dependencies
    ├── tailwind.config.js        # Tailwind CSS configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── index.html                # HTML entry point
    └── src/
        ├── main.jsx              # React entry point
        ├── index.css             # Global styles
        ├── App.jsx               # Main App component
        └── components/
            ├── Chat.jsx          # Chat UI component
            ├── Landing.jsx       # Landing/home page component
            ├── Login.jsx         # User login form component
            └── Register.jsx      # User registration form component
```

---

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Ensure `emotion_model.pkl` and `vectorizer.pkl` are in the `model/` folder (export from your training notebook).

6. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

---

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

---

## How It Works

1. **User Input** — The user types a message in the React chat UI.
2. **Emotion Detection** — Flask receives the message and runs it through the trained TF-IDF + Naive Bayes model to predict the user's current emotion (e.g., sad, anxious, stressed, happy).
3. **LLM Processing** — The original message along with the predicted emotion label is sent to your configured LLM. This allows the model to tailor its response with the right emotional tone.
4. **Empathetic Response** — The LLM generates a compassionate, context-aware reply as Mindora.
5. **Display** — Flask returns the response to React, which renders it smoothly in the chat window.

---

## LLM Integration

Mindora is LLM-agnostic — you can plug in any provider you prefer (OpenAI, Anthropic, Cohere, Mistral, etc.). Edit the `get_llm_response()` function in `backend/app.py` to connect your chosen LLM API.

The function receives two arguments:
- `user_text` — the raw message typed by the user
- `predicted_emotion` — the emotion label predicted by the ML model

Use both to craft a system prompt that instructs the LLM to respond as a mental wellness companion aware of the user's current emotional state.

```python
def get_llm_response(user_text, predicted_emotion):
    # Connect your preferred LLM API here
    # Use `user_text` and `predicted_emotion` to build a context-aware system prompt
    # Example system prompt structure:
    #   - Role: empathetic mental wellness assistant named Mindora
    #   - Awareness: the user is feeling `predicted_emotion`
    #   - Task: respond with compassion, validation, and gentle guidance
    pass
```

> **Tip:** Store your API keys in a `.env` file and load them with `python-dotenv`. Never hardcode credentials in source files.

---

## Design Features

- **Calming Color Palette** — Soft teal, slate, and lavender tones chosen to reduce visual anxiety and promote a sense of calm.
- **Accessible Typography** — Clean sans-serif fonts (Inter, Poppins) for comfortable reading.
- **Smooth Animations** — Gentle transitions and a typing indicator to make the experience feel natural and human.
- **Responsive Design** — Fully functional on both desktop and mobile devices.
- **Mental Health Focus** — UI is intentionally minimal and distraction-free, keeping the focus on the conversation.

---

## Next Steps

1. Export your trained emotion model from `emotion_model.ipynb` to `.pkl` files.
2. Configure your LLM API credentials in a `.env` file.
3. Extend emotion categories in the classifier for finer-grained detection.
4. Add crisis detection logic and emergency helpline resources to the system prompt.
5. Deploy to production — Flask backend on Railway/Render, React frontend on Vercel.

---

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [scikit-learn Documentation](https://scikit-learn.org/)
