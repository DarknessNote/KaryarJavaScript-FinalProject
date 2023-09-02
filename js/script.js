//To enter frequently used functions

import * as functions from "./functions.js";
//To Save Settings
let [saveMode, saveFonts, saveBackgroundColor] = [null];
function saveSettings() {
  let settingData = {
    mode: saveMode,
    fonts: saveFonts,
    backgroundColor: saveBackgroundColor,
  };
  let jsonData = JSON.stringify(settingData);
  localStorage.setItem("settingData", jsonData);
}

//To show Settings
const settings = document.querySelector(".settings ion-icon");
const settingsContainer = document.querySelector(".settings-container");

functions.addEventOnElem(settings, "click", showSettingsContainer);

function showSettingsContainer() {
  settingsContainer.classList.toggle("active");
  checkOnlineStatus();
}
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(".settings-container") &&
    !event.target.closest(".settings ion-icon")
  ) {
    settingsContainer.classList.remove("active");
    saveSettings();
  }
});

//To change mode / dark or bright
const modeChekbox = document.querySelector("[data-mode-checkbox]");
functions.addEventOnElem(modeChekbox, "change", toChangeMode);

function toChangeMode() {
  if (this.checked) {
    saveMode = true;
    //Dark mode colors
    document.documentElement.style.setProperty("--primary-color", "#181823");
    // document.documentElement.style.setProperty('--secondary-color', '#NewValue2');
    document.documentElement.style.setProperty("--input-color", "#B9D4F1");
    document.documentElement.style.setProperty("--button-color", "#537FE7");
    document.documentElement.style.setProperty(
      "--hover-button-color",
      "#7AA5D2"
    );
    document.documentElement.style.setProperty("--border-color-1", "#537FE7");
    document.documentElement.style.setProperty("--border-color-2", "#537FE7");
    document.documentElement.style.setProperty("--border-color-3", "#E9F8F9");
    document.documentElement.style.setProperty("--hover-color-1", "#7AA5D2");
    document.documentElement.style.setProperty("--text-hover-1", "#fff");
    document.documentElement.style.setProperty("--text-hover-2", "#000");
    document.documentElement.style.setProperty("--text-hover-3", "#000");
    document.documentElement.style.setProperty("--selected-color", "#537FE7");
    document.documentElement.style.setProperty("--text-color-1", "#E9F8F9");
    document.documentElement.style.setProperty("--text-color-2", "#fff");
    document.documentElement.style.setProperty("--text-color-3", "#000");
    document.documentElement.style.setProperty("--icon-color-1", "#E9F8F9");
    document.documentElement.style.setProperty("--icon-color-2", "#E9F8F9");
  } else {
    saveMode = false;
    //Bright colors
    document.documentElement.style.setProperty("--primary-color", "#F1F6F9");
    document.documentElement.style.setProperty("--secondary-color", "#AFD3E2");
    document.documentElement.style.setProperty("--input-color", "#dfe4e9");
    document.documentElement.style.setProperty("--button-color", "#366ED8");
    document.documentElement.style.setProperty("--border-color-1", "#0D1282");
    document.documentElement.style.setProperty("--border-color-2", "#13334C");
    document.documentElement.style.setProperty("--border-color-3", "#13334C");
    document.documentElement.style.setProperty("--hover-color-1", "#b9b9b9");
    document.documentElement.style.setProperty(
      "--hover-button-color",
      "#07A4B5"
    );
    document.documentElement.style.setProperty("--text-hover-1", "#fff");
    document.documentElement.style.setProperty("--text-hover-2", "#1D242B");
    document.documentElement.style.setProperty("--text-hover-3", "#1D242B");
    document.documentElement.style.setProperty("--selected-color", "#19376D");
    document.documentElement.style.setProperty("--text-color-1", "#fff");
    document.documentElement.style.setProperty("--text-color-2", "#1D242B");
    document.documentElement.style.setProperty("--text-color-3", "#1D242B");
    document.documentElement.style.setProperty("--icon-color-1", "#393E46");
    document.documentElement.style.setProperty("--icon-color-2", "#0D1282");
    document.documentElement.style.setProperty("--icon-color-3", "#F1F6F9");
  }
}

//To change fonts
const fontSelect = document.querySelector(".change-fonts .select");
const fontList = document.querySelector(".change-fonts .font-list");
const fontOptions = document.querySelectorAll(".font-list li");
const fontSelected = document.querySelector(".change-fonts .selected");

functions.addEventOnElem(fontSelect, "click", toggleFontDropdown);

function toggleFontDropdown() {
  this.classList.toggle(".select-clicked");
  fontList.classList.toggle("font-list-open");
}

functions.addEventOnElem(fontOptions, "click", toggleFontOptions);

function toggleFontOptions() {
  fontSelected.innerText = this.innerText;
  fontSelect.classList.remove(".select-clicked");
  fontList.classList.remove("font-list-open");
  fontOptions.forEach((option) => {
    option.classList.remove("active");
  });
  this.classList.add("active");
  document.documentElement.style.setProperty(
    "--font-family",
    this.dataset.font
  );
  saveFonts = this.dataset.font;
}

//Change Backgrond
const colorBtns = document.querySelectorAll(
  ".change-background .colors button"
);
const settingImage = document.querySelector(".change-background .images");
const imageBtns = document.querySelectorAll(
  ".change-background .images button"
);
const netNoticeSpan = document.querySelector(".change-background .net-notice");
const body = document.body;

colorBtns.forEach((colors) => {
  colors.style.background = colors.dataset.color;
  functions.addEventOnElem(colors, "click", toChangeBgColor);
});
function toChangeBgColor() {
  body.style.backgroundImage = "none";
  body.style.backgroundColor = this.dataset.color;
  saveBackgroundColor = this.dataset.color;
}

function loadImage(url, imageButton) {
  const image = new Image();
  image.onload = function () {
    imageButton.style.backgroundImage = "url(" + url + ")";
  };
  image.onerror = function () {
    console.error("خطا در بارگیری عکس: " + url);
  };
  image.src = url;
}

function checkOnlineStatus() {
  if (navigator.onLine) {
    imageBtns.forEach((imageButton) => {
      const imageUrl = imageButton.dataset.img;
      loadImage(imageUrl, imageButton);
    });
    imageBtns.forEach((images) => {
      functions.addEventOnElem(images, "click", toChangeBgImage);
    });
    settingImage.style.display = "flex";
    netNoticeSpan.style.display = "none";
  } else {
    settingImage.style.display = "none";
    netNoticeSpan.style.display = "block";
  }
}

function toChangeBgImage() {
  document.body.style.background = "url(" + this.dataset.img + ")";
  saveBackgroundColor = this.dataset.img;
}

window.addEventListener("online", checkOnlineStatus);
window.addEventListener("offline", checkOnlineStatus);

//Search Bar
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("[data-search-input]");

functions.addEventOnElem(searchBtn, "click", searchGoogle);
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchGoogle(e);
  }
});

function searchGoogle(e) {
  e.preventDefault();
  if (searchInput.value.trim() === "") {
    return;
  }
  const url =
    "https://www.google.com/search?q=" + encodeURIComponent(searchInput.value);
  window.open(url, "_blank");
  searchInput.value = "";
}

//To time area
const changeTimeZone = document.querySelector(".change-time-zone");
const changeTimeZoneBtn = document.querySelector(".time-header button");
const allTimeZoneList = document.querySelector(".change-time-zone .zone-list");
const timeZoneSelect = document.querySelector(
  ".time-settings-container .select"
);
const timeZoneCancellBtn = document.querySelector("[data-timezone-cancell]");
const timeZoneApllyBtn = document.querySelector("[data-timezone-apply]");
const timeZoneBtnsDiv = document.querySelector(".time-settings-button");
const timeZoneSelectInputSearch = document.querySelector(
  ".time-settings-container .select #search-time-zone"
);

functions.addEventOnElem(changeTimeZoneBtn, "click", showTimeZoneSettings);
function showTimeZoneSettings() {
  changeTimeZone.classList.add("active");
}
functions.addEventOnElem(timeZoneCancellBtn, "click", hiddenTimeZoneSettings);
function hiddenTimeZoneSettings() {
  let timeZoneValue = localStorage.getItem("TimeZone");
  timeZoneSelectInputSearch.value = timeZoneValue || getCurrentTime();
  changeTimeZone.classList.remove("active");
}
functions.addEventOnElem(timeZoneSelect, "click", showTimeZonelist);
function showTimeZonelist() {
  allTimeZoneList.classList.add("active");
  timeZoneBtnsDiv.classList.add("disable");
  timeZoneSelectInputSearch.value = "";
  clearInterval(timeshow);
}
functions.addEventOnElem(timeZoneApllyBtn, "click", apllyTimeZone);
let selectedZoneInter;
let selectedZone;
function apllyTimeZone() {
  clearInterval(timeshow);
  selectedZone = timeZoneSelectInputSearch.value;
  localStorage.setItem("TimeZone", selectedZone);

  if (selectedZoneInter) {
    clearInterval(selectedZoneInter);
  }

  selectedZoneInter = setInterval(() => getTimeInZone(selectedZone), 1000);
  changeTimeZone.classList.remove("active");
}

let timeZoneUrl = "http://worldtimeapi.org/api/timezone";
let timezones;
fetch(timeZoneUrl)
  .then((response) => response.json())
  .then((data) => {
    timezones = data;
    timezones.forEach(function (timezone) {
      allTimeZoneList.innerHTML += `<li>${timezone}</li>`;
    });
    const allTimeZoneItemList = document.querySelectorAll(".time-settings-container .zone-list li");
    functions.addEventOnElem(allTimeZoneItemList, "click", getTimeZoneItemList);
    function getTimeZoneItemList() {
      timeZoneSelectInputSearch.value = this.innerText;
      allTimeZoneList.classList.remove("active");
      timeZoneBtnsDiv.classList.remove("disable");
    }
  })
  .catch((error) => {
    console.log("خطا در دریافت لیست مناطق زمانی: " + error.message);
  });

let filteredZone = [];
timeZoneSelectInputSearch.addEventListener("input", function () {
  allTimeZoneList.innerHTML = "";
  const inputValue = timeZoneSelectInputSearch.value.toLowerCase();
  filteredZone = timezones.filter((item) =>
    item.toLowerCase().includes(inputValue)
  );
  filteredZone.forEach(function (timezone) {
    allTimeZoneList.innerHTML += `<li>${timezone}</li>`;
  });

  const allTimeZoneItemList = document.querySelectorAll(".zone-list li");
  allTimeZoneItemList.forEach(function (item) {
    functions.addEventOnElem(item, "click", getTimeZoneItemList);
  });

  function getTimeZoneItemList() {
    timeZoneSelectInputSearch.value = this.innerText;
    allTimeZoneList.classList.remove("active");
    timeZoneBtnsDiv.classList.remove("disable");
  }
});
const showTimeZone = document.querySelector(".time-zone-title");
const showTime = document.querySelector(".show-time");

function getCurrentTime() {
  let timeUrl = "http://worldtimeapi.org/api/ip";

  fetch(timeUrl)
    .then((response) => response.json())
    .then((data) => {
      let timezone = data.timezone;
      let currentTime = new Date().toLocaleTimeString("fa-IR", {
        timeZone: timezone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      showTime.innerText = currentTime.replace(/^24/, "00");
      let timezoneParts = timezone.split("/");
      let formattedTimezone = timezoneParts[timezoneParts.length - 1];
      showTimeZone.innerText = formattedTimezone;
      timeZoneSelectInputSearch.value = timezone;
    })
    .catch((error) => {
      console.log("خطا در دریافت زمان: " + error.message);
    });
}

function getTimeInZone(timezone) {
  const url = `http://worldtimeapi.org/api/timezone/${timezone}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const datetime = new Date(data.datetime);
      const options = {
        timeZone: timezone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedTime = datetime.toLocaleTimeString("fa-IR", options);
      showTime.innerText = formattedTime;
      let timezoneParts = timezone.split("/");
      let formattedTimezone = timezoneParts[timezoneParts.length - 1];
      showTimeZone.innerText = formattedTimezone;
    })
    .catch((error) => {
      console.error(`خطا در دریافت زمان برای ${timezone}:`, error.message);
    });
}

let timeshow;
if (!localStorage.getItem("TimeZone")) {
  getCurrentTime();
  timeshow = setInterval(getCurrentTime, 1000);
} else {
  let timeZoneValue = localStorage.getItem("TimeZone");
  getTimeInZone(timeZoneValue);
  timeZoneSelectInputSearch.value = timeZoneValue;
}


document.addEventListener("click", function (event) {
  if (
    !event.target.closest("#search-time-zone") &&
    !event.target.closest(".zone-list")
  ) {
    if (timeZoneSelectInputSearch.value == "") {
      let timeZoneValue = localStorage.getItem("TimeZone");
      timeZoneSelectInputSearch.value = timeZoneValue || getCurrentTime();
    } else {
      allTimeZoneList.classList.remove("active");
      timeZoneBtnsDiv.classList.remove("disable");
    }
  }
});

//weather
const displayWeather = document.querySelector(".temperature-display .temperature");
const displayWeatherIcon = document.querySelector(".temperature-display ion-icon");
const weatherDescription = document.querySelector(".weather .description");
const weatherSettingsBtn = document.querySelector(".weather button");
const locationTitle = document.querySelector(".weather .location-title");
const weatherSettingsDiv = document.querySelector(".change-weather-zone");
const weatherZoneList = document.querySelector(".change-weather-zone .zone-list");
const weatherSelectedZone = document.querySelector(".change-weather-zone .select");
const weatherContainerBtn = document.querySelector(".weather-settings-button");
const weatherZoneApplyBtn = document.querySelector("[data-weather-zone-apply]");
const weatherZoneCancelBtn = document.querySelector("[data-weather-zone-cancel]");


functions.addEventOnElem(weatherSettingsBtn, "click", showWeatherSettings);
function showWeatherSettings() {
  weatherSettingsDiv.classList.add("active");
}
functions.addEventOnElem(weatherSelectedZone, "click", showWeatherZoneList);
function showWeatherZoneList() {
  weatherZoneList.classList.add("active");
  weatherContainerBtn.classList.add("disable");
}


document.addEventListener("click", function (event) {
  if (
    !event.target.closest(".change-weather-zone")
  ) {
    weatherZoneList.classList.remove("active");
    weatherContainerBtn.classList.remove("disable")
  }
});

const iranianProvincesFn = [
  "tabriz",
  "urmia",
  "ardabil",
  "esfahan",
  "alborz",
  "ilam",
  "bushehr",
  "tehran",
  "Shahr-e Kord",
  "Birjand",
  "Mashhad",
  "Bojnurd",
  "khuzestan",
  "zanjan",
  "semnan",
  "zahedan",
  "fars",
  "ghazvin",
  "qom",
  "kurdistan",
  "kerman",
  "kermanshah",
  "yasuj",
  "golestan",
  "rasht",
  "lorestan",
  "mazandaran",
  "markazi",
  "hormozgan",
  "hamadan",
  "yazd",
];
const iranianProvincesFa = [
  "تبریز",
  "ارومیه",
  "اردبیل",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "شهرکرد",
  "برجند",
  "مشهد",
  "بجنورد",
  "خوزستان",
  "زنجان",
  "سمنان",
  "زاهدان",
  "فارس",
  "قزوین",
  "قم",
  "کردستان",
  "کرمان",
  "کرمانشاه",
  "یاسوج",
  "گلستان",
  "رشت",
  "لرستان",
  "مازندران",
  "مرکزی",
  "هرمزگان",
  "همدان",
  "یزد",
];

iranianProvincesFn.forEach((city, index) => {
  weatherZoneList.innerHTML += `<li data-city=${city}>${iranianProvincesFa[index]}</li>`;
});

let weatherLiDataSet;
let weatherLocation;
const weatherZoneListItem = document.querySelectorAll(".change-weather-zone .zone-list li");
functions.addEventOnElem(weatherZoneListItem, "click", slectedWeatherZoneListItem);
function slectedWeatherZoneListItem() {
  weatherSelectedZone.textContent = this.textContent;
  weatherLocation = this.textContent;
  weatherZoneList.classList.remove("active");
  weatherContainerBtn.classList.remove("disable");
  weatherLiDataSet = this.dataset.city;
}

functions.addEventOnElem(weatherZoneApplyBtn, "click", applyWeatherZone);
function applyWeatherZone() {
  getWeatherByRegion(weatherLiDataSet);
  localStorage.setItem("WeatherZone", [weatherLiDataSet, weatherLocation]);
  locationTitle.textContent = weatherLocation;
  weatherSettingsDiv.classList.remove("active");

}
function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function getWeatherByRegion(region) {
  const apiKey = "b63340d9356173a8046c8621bc379ece";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${region},IR&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      const temperatureCelsius = kelvinToCelsius(weatherData.main.temp);

      console.log(`شهر: ${weatherData.name}`);
      console.log(`شهر: ${weatherData.weather[0].description}`);
      if (weatherData.weather[0].description == "scattered clouds" && weatherData.weather[0].description == "few clouds") {
        displayWeatherIcon.name = "cloudy-outline";
      }
      else if (weatherData.weather[0].description == "clear sky") {
        displayWeatherIcon.name = "sunny-outline";
      }
      displayWeather.innerText = temperatureCelsius
      if (temperatureCelsius >= 36) {
        weatherDescription.innerText = "هوا خیلی گرمه 🔥"
      }
      else if (30 <= temperatureCelsius || temperatureCelsius >= 35) {
        weatherDescription.innerText = "هوا گرمه 🌞"
      }
      else if (25 <= temperatureCelsius || temperatureCelsius >= 29) {
        weatherDescription.innerText = "هوا نسبتا گرمه 🌤"
      }
      else if (19 <= temperatureCelsius || temperatureCelsius >= 24) {
        weatherDescription.innerText = "هوا عالیه ☁️"
      }
    })
    .catch((error) => {
      console.error("خطا در دریافت اطلاعات آب و هوا", error);
    });
}

const defaultRegion = "Tehran";
let weatherZoneValue = localStorage.getItem("WeatherZone");
if (weatherZoneValue) {
  let [getweatherLiDataSet, getweatherLocation] = weatherZoneValue.split(',');
  getWeatherByRegion(getweatherLiDataSet);
  locationTitle.textContent = getweatherLocation;
  weatherSelectedZone.textContent = getweatherLocation
}
else {
  getWeatherByRegion(defaultRegion);
}


