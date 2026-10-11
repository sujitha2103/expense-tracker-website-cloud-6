import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// 🔥 PASTE YOUR FIREBASE CONFIG HERE

const firebaseConfig = {
  apiKey: "AIzaSyDRlNSAHnNCexc2vFgSIBOWMJ_8pYa16ww",
  authDomain: "expense-tracker-app-1a8d7.firebaseapp.com",
  projectId: "expense-tracker-app-1a8d7",
  storageBucket: "expense-tracker-app-1a8d7.firebasestorage.app",
  messagingSenderId: "140165193119",
  appId: "1:140165193119:web:439907d00a2a28f28231aa"
};


// Firebase start
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase connected successfully!");


// Get HTML elements
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const addButton = document.getElementById("addBtn");


// Add Transaction
addButton.addEventListener("click", async function () {

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (title === "" || amount <= 0) {
        alert("Please enter transaction name and amount");
        return;
    }

    try {

        await addDoc(collection(db, "transactions"), {
            title: title,
            amount: amount,
            type: type,
            createdAt: new Date()
        });

        alert("Transaction added successfully!");

        // Clear input
        titleInput.value = "";
        amountInput.value = "";
        typeInput.value = "income";

    } catch (error) {

        console.error("Error adding transaction:", error);

        alert("Transaction could not be added. Check Firebase config.");

    }

});