import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD9pzctZ7A6-SdAy_-_4zESmn8r9S1ztFo",
  authDomain: "chatbot-mental-health-app.firebaseapp.com",
  projectId: "chatbot-mental-health-app",
  storageBucket: "chatbot-mental-health-app.firebasestorage.app",
  messagingSenderId: "888144826527",
  appId: "1:888144826527:web:bee0a112b37fe601a852aa",
  measurementId: "G-3VHV3BTNT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;