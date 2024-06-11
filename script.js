function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const timeString = `Czas: ${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
    document.getElementById('data').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

// Detect if running as a Web Clip and apply specific styles
if (window.navigator.standalone) {
    document.body.classList.add('standalone');
}

// Swipe functionality
const infoSection = document.getElementById('info-section');
const blueSection = document.getElementById('blue-section');
const leftIcon = document.getElementById('left-icon');
const rightIcon = document.getElementById('right-icon');
const leftIconBlue = document.getElementById('left-icon-blue');
const rightIconBlue = document.getElementById('right-icon-blue');
const closeIcon = document.getElementById('close-icon');

let startX;

infoSection.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

infoSection.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) { // Swipe left
        infoSection.style.display = 'none';
        blueSection.style.display = 'block';
    }
});

blueSection.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

blueSection.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX < endX - 50) { // Swipe right
        blueSection.style.display = 'none';
        infoSection.style.display = 'block';
    }
});

rightIcon.addEventListener('click', () => {
    infoSection.style.display = 'none';
    blueSection.style.display = 'block';
});

leftIconBlue.addEventListener('click', () => {
    blueSection.style.display = 'none';
    infoSection.style.display = 'block';
});

closeIcon.addEventListener('click', () => {
    blueSection.style.display = 'none';
});

// Device orientation permission and event listener
async function getOrientation(){
    if (!window.DeviceOrientationEvent || !window.DeviceOrientationEvent.requestPermission){
        return alert("Your current device does not have access to the DeviceOrientation event");
    }

    let permission = await window.DeviceOrientationEvent.requestPermission();
    if (permission !== "granted"){
        return alert("You must grant access to the device's sensor for this demo");
    }

    // Hide the button after permission is granted
    document.getElementById('get-orientation').style.display = 'none';

    window.addEventListener("deviceorientation", function(e){
        let eagleContainer = document.getElementById('eagle-container');
        let alpha = e.alpha;
        let beta = e.beta;
        let gamma = e.gamma;

        // Change the filter based on the orientation angles
        let hueRotate = alpha % 360;
        let brightness = 1 + Math.abs(beta / 1440);  // Adjusted for less white
        let contrast = 1 + Math.abs(gamma / 140);   // Adjusted for less intensity
        let saturate = 1.5 + Math.abs(gamma / 5);   // Adjusted for more colors

        eagleContainer.style.filter = `hue-rotate(${hueRotate}deg) brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
    });
}

document.getElementById('get-orientation').addEventListener('click', getOrientation);