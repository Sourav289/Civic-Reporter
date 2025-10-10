import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLQ1rx_AktCK5oqAzUalTQuYMutb_ndsk",
  authDomain: "studio-5331819853-98b2f.firebaseapp.com",
  projectId: "studio-5331819853-98b2f",
  storageBucket: "studio-5331819853-98b2f.appspot.com", // ✅ Fixed here
  messagingSenderId: "421041653607",
  appId: "1:421041653607:web:fd87b28611579769c391c2"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Form Handling
const form = document.getElementById('issueForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const location = document.getElementById('location').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!name || !location || !description) {
    message.textContent = "⚠️ Please fill all fields!";
    message.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "civic_issues"), {
      name,
      location,
      description,
      date: new Date().toISOString()
    });

    message.textContent = "✅ Issue submitted successfully!";
    message.style.color = "green";
    form.reset();
  } catch (error) {
    console.error("Error adding document:", error);
    message.textContent = "❌ Failed to submit. Try again.";
    message.style.color = "red";
  }
});
