# Mindora - AI Wellness Companion

Mindora is a mental wellness chatbot powered by emotion detection and large language models, built with Flask backend and React frontend.

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
            └── ChatWindow.jsx    # Chat UI component
```

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

5. Ensure `emotion_model.pkl` and `vectorizer.pkl` are in the `model/` folder (export from your notebook)

6. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

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

## How It Works

1. **User Input**: User types a message in the React UI
2. **Emotion Detection**: Flask receives the message and uses the trained ML model to predict emotion
3. **LLM Processing**: The user's message + predicted emotion are sent to an LLM (Gemini, OpenAI, Claude, etc.)
4. **Empathetic Response**: The LLM generates a compassionate response
5. **Display**: Flask sends the response back to React, which displays it in the chat UI

## Configuration

### Adding LLM Integration

Edit the `get_llm_response()` function in `backend/app.py` to connect your chosen LLM:

```python
# Example with Google Gemini
import google.generativeai as genai

def get_llm_response(user_text, predicted_emotion):
    model = genai.GenerativeModel('gemini-pro')
    
    system_prompt = f"""
    You are Mindora, a highly empathetic, supportive mental wellness assistant. 
    The user just said: "{user_text}". 
    An emotion classifier detected they are feeling: {predicted_emotion}.
    Respond as a compassionate therapist...
    """
    
    response = model.generate_content(system_prompt)
    return response.text
```

## Design Features

- **Calming Color Palette**: Soft teal, slate, and lavender tones
- **Accessible Typography**: Clean sans-serif fonts (Inter, Poppins)
- **Smooth Animations**: Gentle transitions and loading indicators
- **Responsive Design**: Works on desktop and mobile devices
- **Mental Health Focus**: Supportive UI with crisis resource integration potential

## Next Steps

1. Export your trained emotion model from `emotion_model.ipynb` to `.pkl` files
2. Configure your LLM API credentials (OpenAI, Gemini, Claude, etc.)
3. Add crisis detection and hotline resources to the system prompt
4. Deploy to production (Heroku for backend, Vercel for frontend)

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [scikit-learn Documentation](https://scikit-learn.org/)
