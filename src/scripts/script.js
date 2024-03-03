'use strict';

const body = document.querySelector('body');
//output paragrapths
const operatingSystem = document.querySelector('.operating-system'); 
const language = document.querySelector('.language');
const browser = document.querySelector('.browser');

const pageWidth = document.querySelector('.page-width');
const pageHeight = document.querySelector('.page-height');
const pageOrientation = document.querySelector('.page-orientation');

const batteryLevel = document.querySelector('.battery-level');
const batteryStatus = document.querySelector('.battery-status');

const networkStatus = document.querySelector('.network-status');
const pulsar = document.querySelector('.pulsar');
//location is not a valid variable
const clientLocation = document.querySelector('.location'); 
const ipAdress = document.querySelector('.ip-adress');

//System info
function getOS() {
  const userAgent = navigator.userAgent;
  let opSys = '';
  if (userAgent.includes("Windows")) 
      opSys = "Windows";
    else if (userAgent.includes("Mac OS")) 
      opSys = "Mac OS";
    else if (userAgent.includes("Linux")) 
      opSys = "Linux-based system.";
    else if (userAgent.includes("Android")) 
      opSys = "Android";
    else if (userAgent.includes("iOS")) 
      opSys = "iOS";
  else opSys = "Unable to determine.";

  return opSys;
} 

function getBrowser() {
  let browserName;
  if (navigator.userAgent.indexOf("OPR") !== -1) 
      browserName = "Opera";
    else if (navigator.userAgent.indexOf("Edg") !== -1) 
      browserName = "Microsoft Edge";
    else if (navigator.userAgent.indexOf("MSIE") !== -1) 
      browserName = "Microsoft Internet Explorer";
    else if (navigator.userAgent.indexOf("Chrome") !== -1) 
      browserName = "Chrome";
    else if (navigator.userAgent.indexOf("Safari") !== -1) 
      browserName = "Safari";
    else if (navigator.userAgent.indexOf("Firefox") !== -1) 
      browserName = "Firefox";
  if ('brave' in navigator) browserName = "Brave";

  return browserName;
}

function systemStatus() {
operatingSystem.innerText = `OS: ${getOS()}`;
language.innerText = `Language: ${navigator.language}`;
browser.innerText = `Browser: ${getBrowser()}`;
}

window.addEventListener('load', systemStatus);
setInterval(systemStatus, 1000); //Will detect if language changed
// I could not find an event to see the language chane, so just refreshing it

//Window Info
function windowStatus() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  pageWidth.innerText = `Width: ${width}px`;
  pageHeight.innerText = `Height: ${height}px`;
  
  //screen.orientation.type is boring
  if (width/height > 1) pageOrientation.innerText ='Orientation: landscape';
  else if (width/height < 1) pageOrientation.innerText ='Orientation: portrait';
  else pageOrientation.innerText ='Orientation: none'; // case: Square 
}

window.addEventListener('load', windowStatus);
window.addEventListener('resize', windowStatus);//Wil readjust values on resize

//Battery Info
function batStatus() {
// Check if the Battery Status API is supported
if (navigator.getBattery) { 
  navigator.getBattery()
  .then(function(battery) {
    batteryStatus.innerText 
    = `Status: ${battery.charging ? 'charging' : 'idle'}`;
    batteryLevel.innerText = `Level: ${battery.level * 100}%`;

    battery.addEventListener('chargingchange', batStatus); 
    battery.addEventListener('levelchange', batStatus); 
  })
} else {
  batteryLevel.innerText = "Level: not available";
  batteryStatus.innerText = "Status: not available";
}
}

window.addEventListener('load', batStatus);

//Network info
function nwStatus() {
  if (navigator.onLine) {
    networkStatus.innerText = 'Status: online';
    pulsar.style.backgroundColor = 'var(--color-green)';
    pulseIntensivity = 9;
  } else {
    networkStatus.innerText = 'Status: offline';
    pulsar.style.backgroundColor = 'var(--color-red)';
    pulseIntensivity = 5;
  }
}
window.addEventListener('load', nwStatus);
window.addEventListener('online', nwStatus);
window.addEventListener('offline', nwStatus);

let pulseValue = 30;
let isIncrementing = true;
let pulseIntensivity = 10;

function pulse() {
  if (isIncrementing && pulseValue < 104) {
    pulsar.style.opacity = `${pulseValue}%`;
    pulseValue++;
  } else isIncrementing = false;

  if (!isIncrementing && pulseValue > 30) {
    pulsar.style.opacity = `${pulseValue}%`;
    pulseValue--;
  } else isIncrementing = true;

  setTimeout(() => {pulse();}, pulseIntensivity);
}
window.addEventListener('load', pulse);

//Auto-adjusting theme (dark/light)
function themeSelector() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    .matches) {
    // Dark mode is enabled
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  } else {
    // Light mode is enabled
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }
}

window.addEventListener('load', themeSelector);
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', themeSelector);

//Location info
function getCountry() {
  let apiKey = '162b2c098c50c9dd8a5149dca6749817076e9fcf01d4ee83e2a9f8a8';
  json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    clientLocation.innerText = `City: ${data.city}, ${data.country_name}`;
    ipAdress.innerText = `IP: ${data.ip}`;
    //console.log(data);
  });
} 

function json(url) {
  return fetch(url)
  .then(res => res.json())
  .catch( () => {
    ipAdress.innerText = 'IP: not available';
    clientLocation.innerText = 'City: not available';
  });
}

window.addEventListener('load', getCountry);
window.addEventListener('online', getCountry);
window.addEventListener('offline', getCountry);

