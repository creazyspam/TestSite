// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Registration
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert('Регистрация успешна!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        })
        .catch((error) => {
            alert('Ошибка при регистрации: ' + error.message);
        });
});

// Login
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        })
        .catch((error) => {
            alert('Ошибка при входе: ' + error.message);
        });
});

// Logout
document.getElementById('logout-link')?.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'login.html'; // Redirect to login page
    });
});

// Function to fetch data from the backend
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/data'); // URL to your backend API
        const data = await response.json();
        console.log(data); // Log data to console for debugging
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display data on the page
function displayData(data) {
    const container = document.getElementById('data-container');
    if (container) {
        container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
}

// Call fetchData on page load
window.onload = fetchData;
