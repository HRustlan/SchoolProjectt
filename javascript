let currentScreen = 'screen1';

function showScreen(screenId) {
  document.getElementById(currentScreen).classList.add('hidden');
  document.getElementById(screenId).classList.remove('hidden');
  currentScreen = screenId;
}

function goToScreen2() {
  showScreen('screen2');
  startCamera();
}

function goToScreen3() {
  showScreen('screen3');
}

function goToScreen4() {
  showScreen('screen4');
  startTracking();
}

function exitApp() {
  window.close();
}

// Camera
function startCamera() {
  const videoElement = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoElement.srcObject = stream;
    })
    .catch(error => {
      console.error('Error accessing the camera:', error);
    });
}

// Location Tracking
function startTracking() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      const { latitude, longitude } = position.coords;
      updateGraph(latitude, longitude);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function updateGraph(latitude, longitude) {
  const graphDiv = document.getElementById('graph');
  graphDiv.innerHTML = `
    <h2>Ваши координаты:</h2>
    <p>Широта: ${latitude}</p>
    <p>Долгота: ${longitude}</p>
  `;
}
