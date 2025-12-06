import React, { useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

function VoiceRecorder({ onParsed }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("SpeechRecognition API not supported in this browser. Use Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => { setListening(true); setTranscript(""); };
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
    };
    recognition.onerror = (e) => {
      console.error("Speech error", e);
      setListening(false);
    };
    recognition.onend = async () => {
      setListening(false);
      if (!transcript) return;
      try {
        const res = await axios.post(`${API_BASE}/tasks/voice/parse`, { transcript });
        onParsed(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    recognition.start();
  };

  return (
    <div>
      <button onClick={startListening}>{listening ? "Listening..." : "🎤 Speak"}</button>
      {transcript && <small style={{ marginLeft: 8 }}>Transcript: {transcript}</small>}
    </div>
  );
}

export default VoiceRecorder;
