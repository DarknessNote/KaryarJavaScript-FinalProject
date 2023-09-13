//To enter frequently used functions

import * as functions from "./functions.js";
// const main = document.querySelector("main");
// window.addEventListener("DOMContentLoaded", function () {
//   if (window.innerWidth > 1024) {
//     main.innerHTML = "";
//   }
// });
// window.addEventListener("resize", function () {
//   if (window.innerWidth > 1024) {
//     main.innerHTML = "";
//   }
// });
//To Save Settings
let [saveMode, saveFonts, saveNameFonts, saveBackgroundColor] = [null];
function saveSettings() {
  let settingData = {
    mode: saveMode,
    fonts: saveFonts,
    fontName: saveNameFonts,
    backgroundColor: saveBackgroundColor,
  };
  let jsonData = JSON.stringify(settingData);
  localStorage.setItem("settingData", jsonData);
}
const savedSetting = JSON.parse(localStorage.getItem("settingData"));
if (savedSetting) {
  [saveMode, saveFonts, saveNameFonts, saveBackgroundColor] = [savedSetting.mode, savedSetting.fonts, savedSetting.fontName, savedSetting.backgroundColor];
}
if (saveBackgroundColor) {
  if (saveBackgroundColor.startsWith("https")) {
    document.body.style.background = "url(" + saveBackgroundColor + ")"
  }
  else {
    document.body.style.backgroundColor = saveBackgroundColor;

  }
}


/////////////////////////////////
///////// Show Settings ////////
///////////////////////////////
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

///////////////////////////////////////////////
///////// Change Mode / Dark Or Light ////////
/////////////////////////////////////////////

const modeChekbox = document.querySelector("[data-mode-checkbox]");
if (saveMode == true) {
  darkColors();
  modeChekbox.checked = true;
}
else {
  lightColors();
  modeChekbox.checked = false;
}
functions.addEventOnElem(modeChekbox, "change", toChangeMode);
function darkColors() {
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
}
function lightColors() {
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
function toChangeMode() {
  if (this.checked) {
    saveMode = true;
    saveSettings()
    darkColors()

  } else {
    saveMode = false;
    saveSettings()
    lightColors()
  }
}

/////////////////////////////////
///////// Change Fonts /////////
///////////////////////////////
const fontSelect = document.querySelector(".change-fonts .select");
const fontList = document.querySelector(".change-fonts .font-list");
const fontOptions = document.querySelectorAll(".font-list li");
const fontSelected = document.querySelector(".change-fonts .selected");

if (saveFonts) {
  document.documentElement.style.setProperty(
    "--font-family",
    saveFonts
  );
  fontSelected.innerText = saveNameFonts;
}
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
  saveNameFonts = this.innerText;
  saveSettings();
}

/////////////////////////////////////
///////// Change Background ////////
///////////////////////////////////

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
  saveSettings();
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
function imageFit() {
  const body = document.querySelector('body');
  const image = new Image();
  image.src = body.style.backgroundImage.slice(5, -2);

  image.onload = function () {
    const aspectRatio = image.width / image.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth / windowHeight > aspectRatio) {
      body.style.backgroundSize = 'auto 100%';
    } else {
      body.style.backgroundSize = '100% auto';
    }
  }
}
function toChangeBgImage() {
  document.body.style.background = "url(" + this.dataset.img + ")";
  saveBackgroundColor = this.dataset.img;
  imageFit()
  saveSettings();
}
window.addEventListener('load', imageFit);
window.addEventListener("online", checkOnlineStatus);
window.addEventListener("offline", checkOnlineStatus);

//////////////////////////////
///////// Search Bar ////////
////////////////////////////

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

/////////////////////////////////
///////// Times ////////
///////////////////////////////
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

///////////////////////////
///////// Weather ////////
/////////////////////////

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
  "sanandaj",
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
  "سنندج",
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
functions.addEventOnElem(weatherZoneCancelBtn, "click", cancellWeatherZone);
function cancellWeatherZone() {
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
  weatherSettingsDiv.classList.remove("active");

}
function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
function numberToPersian(number) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const numberString = String(number);
  let persianNumber = '';

  for (let i = 0; i < numberString.length; i++) {
    const char = numberString.charAt(i);
    if (/\d/.test(char)) {
      persianNumber += persianDigits[Number(char)];
    } else {
      persianNumber += char;
    }
  }

  return persianNumber;
}
function getWeatherByRegion(region) {
  const apiKey = "db374962615acbaf4e4c839c9960e0a5";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${region},IR&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      const temperatureCelsius = kelvinToCelsius(weatherData.main.temp);


      if (weatherData.weather[0].description == "scattered clouds" && weatherData.weather[0].description == "few clouds") {
        displayWeatherIcon.name = "cloudy-outline";
      }
      else if (weatherData.weather[0].description == "clear sky") {
        displayWeatherIcon.name = "sunny-outline";
      }
      let faNumbersTemperatureCelsius = numberToPersian(temperatureCelsius);
      displayWeather.innerText = faNumbersTemperatureCelsius;

      if (temperatureCelsius >= 36) {
        weatherDescription.innerText = "هوا خیلی گرمه 🔥";
      }
      else if (30 <= temperatureCelsius || temperatureCelsius >= 35) {
        weatherDescription.innerText = "هوا گرمه 🌞";
      }
      else if (25 <= temperatureCelsius || temperatureCelsius >= 29) {
        weatherDescription.innerText = "هوا نسبتا گرمه 🌤";
      }
      else if (19 <= temperatureCelsius || temperatureCelsius >= 24) {
        weatherDescription.innerText = "هوا خوبه ☁️";
      }
      else if (10 <= temperatureCelsius || temperatureCelsius >= 18) {
        weatherDescription.innerText = "هوا عالیه ☁️";
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


/////////////////////////////////
///////// Favorite Site ////////
///////////////////////////////

const addFavoriteSiteModal = document.querySelector(".add-fav-site-modal");
const closeAddFavBtn = document.querySelector("[data-close-fav-inputs]");
const addFavUrlInput = document.querySelector("[data-fav-url-input]");
const addFavUrlTitleInput = document.querySelector("[data-fav-title-input]");
const submitFavSiteBtn = document.querySelector("[data-submit-fav-input]");
const addFavoriteSiteModalTitle = document.querySelector(".add-fav-site-form-input h3");

let favoriteSites = [];

const allfavoritSites = document.querySelectorAll(".favorite-sites .f-site");
const storedFavoriteSites = localStorage.getItem("addedFavoriteSites");
if (storedFavoriteSites) {
  favoriteSites = JSON.parse(storedFavoriteSites);
  const parsedFavoriteSites = JSON.parse(storedFavoriteSites);
  for (const favSite of parsedFavoriteSites) {
    for (const site of allfavoritSites) {
      if (site.dataset.favsite === favSite.id) {
        const addFavsiteIcon = site.querySelector(".add-favsite-icon");
        if (addFavsiteIcon) {
          addFavsiteIcon.remove();
        }
        site.innerHTML = `
        <a href="${favSite.siteLink}" class="f-site-added">
          <img
            src=""
            alt="favicon"
            width="30px"
          />
          <span>${favSite.siteTitle}</span>
        </a>`;
        getFavicon(favSite.faviconLink, site);
        checkFavSiteAdded(site);
      }
    }
  }
}
let favSiteElement;
function checkFavoriteSiteDiv() {
  const favoriteSiteDivs = Array.from(document.querySelectorAll(".f-site"));

  favoriteSiteDivs.forEach(div => {
    const addFavsiteIcon = div.querySelector(".add-favsite-icon");
    if (addFavsiteIcon) {
      addFavsiteIcon.addEventListener("click", clickHandler);
    }
    div.addEventListener("click", clickHandler);
  });

  function clickHandler(e) {
    const hasAddFavsiteIcon = e.target.closest(".f-site").querySelector(".add-favsite-icon");
    if (hasAddFavsiteIcon) {
      addFavoriteSiteModal.style.display = "block";
      submitFavSiteBtn.innerHTML = `
      افزودن

      <img
        width="32"
        height="32"
        src="https://img.icons8.com/windows/32/ffffff/enter-key.png"
        alt="enter-key"
      />
      `;
      addFavoriteSiteModalTitle.innerText = "افزودن سایت مورد علاقه";
      favSiteElement = e.target.closest(".f-site");
    }
  }
}

checkFavoriteSiteDiv();


functions.addEventOnElem(closeAddFavBtn, "click", closeFavSiteModal);
function closeFavSiteModal() {
  addFavoriteSiteModal.style.display = "none";
  addFavUrlInput.value = "";
  addFavUrlTitleInput.value = "";
}

functions.addEventOnElem(submitFavSiteBtn, "click", submitFavSite);
functions.addEventOnElem(addFavUrlInput, "keypress", submitKeyFavSite);
functions.addEventOnElem(addFavUrlTitleInput, "keypress", submitKeyFavSite);
function submitKeyFavSite(e) {
  if (e.key === "Enter" && addFavUrlInput.value != "") {
    submitFavSite();
  }
}

function submitFavSite() {
  if (favSiteElement && addFavUrlInput.value !== "") {
    let checkUrl = addFavUrlInput.value;
    if (!checkUrl.startsWith("http://") && !checkUrl.startsWith("https://")) {
      checkUrl = "http://" + checkUrl;
    }
    const addFavsiteIcon = favSiteElement.querySelector(".add-favsite-icon");
    favoriteSites.forEach((item, index) => {
      if (item.id == favSiteElement.dataset.favsite) {
        favoriteSites.splice(index, 1);
        localStorage.removeItem('addedFavoriteSites');
        localStorage.setItem('addedFavoriteSites', JSON.stringify(favoriteSites));
      }
    });
    if (addFavsiteIcon) {
      addFavsiteIcon.remove();
    }
    favSiteElement.innerHTML = `
      <a href="${checkUrl}" class="f-site-added">
        <img
          src=""
          alt="favicon"
          width="30px"
        />
        <span>${addFavUrlTitleInput.value}</span>
      </a>`;
    getFavicon(addFavUrlInput.value, favSiteElement);
    let favoriteSitesData = {
      id: favSiteElement.dataset.favsite,
      siteLink: checkUrl,
      siteTitle: addFavUrlTitleInput.value,
      faviconLink: addFavUrlInput.value
    }
    favoriteSites.push(favoriteSitesData);
    localStorage.setItem("addedFavoriteSites", JSON.stringify(favoriteSites));
    checkFavSiteAdded(favSiteElement);
    addFavoriteSiteModal.style.display = "none";
    addFavUrlInput.value = "";
    addFavUrlTitleInput.value = "";
  } else {
    alert("لطفاً آدرس سایت را وارد کنید");
  }
}

function getFavicon(url, elem) {
  const faviconUrl = `https://api.faviconkit.com/${url}/57`;
  elem.querySelector("img").src = faviconUrl;
}

const deleteFavSiteModal = document.querySelector(".delete-fav-site-modal");

function checkFavSiteAdded(favSiteElement) {
  if (favSiteElement) {
    let favSiteAdded = favSiteElement.closest(".f-site-colum");
    favSiteAdded.addEventListener("mouseenter", showFavSetting);
    favSiteAdded.addEventListener("mouseleave", hideFavSetting);
  }
}
let favSiteElementForDelete;
let favSiteElementForEdite;
function showFavSetting(e) {
  const settingsElement = e.target.closest(".f-site-colum");
  const editeBtn = settingsElement.querySelector("[data-edit-favsite]");
  const trashBtn = settingsElement.querySelector("[data-delete-favsite]");
  editeBtn.style.visibility = "visible";
  trashBtn.style.visibility = "visible";

  if (editeBtn || trashBtn) {
    const deleteModalTitle = document.querySelector(".delete-modal-container span")
    functions.addEventOnElem(trashBtn, "click", showDeleteFavSiteModal);
    function showDeleteFavSiteModal(e) {
      deleteFavSiteModal.style.display = "block";
      const parentElement = e.target.parentNode.parentNode;
      const favSiteElement = parentElement.querySelector('.f-site');
      favSiteElementForDelete = favSiteElement;
      const editUrl = favSiteElementForDelete.querySelector(".f-site-added");
      let hrefValue = editUrl.getAttribute("href");
      hrefValue = hrefValue.replace("http://", "").replace("https://", "");
      deleteModalTitle.innerText = hrefValue;
    }
    const editTitleModal = document.querySelector(".add-fav-site-form-input h3");
    const editModalBtnText = document.querySelector("[data-submit-fav-input]");
    const editFavSiteTitle = document.querySelector("[data-fav-title-input]");
    const editFavSiteUrl = document.querySelector("[data-fav-url-input]");
    functions.addEventOnElem(editeBtn, "click", showEditFavSiteModal);
    function showEditFavSiteModal(e) {
      addFavoriteSiteModal.style.display = "block";
      const parentElement = e.target.parentNode.parentNode;
      const favSiteElem = parentElement.querySelector('.f-site');
      favSiteElementForEdite = favSiteElem;
      favSiteElement = favSiteElem;
      editTitleModal.innerText = "ویرایش سایت مورد علاقه";
      editModalBtnText.innerHTML = `
      ویرایش
      <img
        width="32"
        height="32"
        src="https://img.icons8.com/windows/32/ffffff/enter-key.png"
        alt="enter-key"
      />`;
      const editUrl = favSiteElementForEdite.querySelector(".f-site-added");
      let hrefValue = editUrl.getAttribute("href");
      hrefValue = hrefValue.replace("http://", "").replace("https://", "");
      editFavSiteUrl.value = hrefValue;
      const editSpan = favSiteElementForEdite.querySelector(".f-site-added span");
      editFavSiteTitle.value = editSpan.innerText;
    }
  }
}

function hideFavSetting(e) {
  const settingsElement = e.target.closest(".f-site-colum");
  const editeBtn = settingsElement.querySelector("[data-edit-favsite]");
  const trashBtn = settingsElement.querySelector("[data-delete-favsite]");

  editeBtn.style.visibility = "hidden";
  trashBtn.style.visibility = "hidden";
}

const deleteModalCancellBtn = document.querySelector("[data-cancell-fav-btn]");
functions.addEventOnElem(deleteModalCancellBtn, "click", cancellDeleteModal);
function cancellDeleteModal() {
  deleteFavSiteModal.style.display = "none";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (deleteFavSiteModal.style.display === "block") {
      deleteFavSiteModal.style.display = "none";
    }
  }
});

const deleteModalApplyBtn = document.querySelector("[data-delete-fav-btn]");
deleteModalApplyBtn.addEventListener("click", applyDeleteFavSite);

function applyDeleteFavSite() {
  favSiteElementForDelete.innerHTML = `
    <ion-icon class="add-favsite-icon" name="add-outline"></ion-icon>
  `;
  favoriteSites.forEach((item, index) => {
    if (item.id == favSiteElementForDelete.dataset.favsite) {
      favoriteSites.splice(index, 1);
      localStorage.removeItem('addedFavoriteSites');
      localStorage.setItem('addedFavoriteSites', JSON.stringify(favoriteSites));
    }
  });
  favSiteElementForDelete.closest(".f-site-colum").removeEventListener("mouseenter", showFavSetting);
  favSiteElementForDelete.closest(".f-site-colum").removeEventListener("mouseleave", hideFavSetting);
  deleteFavSiteModal.style.display = "none";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const deleteFavSiteModal = document.querySelector(".delete-fav-site-modal");
    if (deleteFavSiteModal.style.display === "block") {
      applyDeleteFavSite();
    }
  }
});





/////////////////////////////
///////// ToDo List ////////
///////////////////////////

const todolistContainer = document.querySelector(".todo-cantainer");
const visibleTodoBtn = document.querySelector("[data-visible-todo]");
const hiddenTodoBtn = document.querySelector("[data-hidden-todo]");
const todolistHiddenModal = document.querySelector(".blur-todo-list-modal")
functions.addEventOnElem(visibleTodoBtn, "click", toBlurTodoList);
function toBlurTodoList() {
  todolistContainer.style.filter = "blur(5px)";
  hiddenTodoBtn.style.visibility = "visible";
  todolistHiddenModal.style.visibility = "visible"
}
functions.addEventOnElem(hiddenTodoBtn, "click", toUnBlurTodoList);
function toUnBlurTodoList() {
  todolistContainer.style.filter = "";
  todolistHiddenModal.style.visibility = "hidden";
  hiddenTodoBtn.style.visibility = "hidden";
}
const SartableList = document.querySelector(".todos-sartable-list");
const todoListInputs = document.querySelector(".todo-list-inputs");
const todoTitleInputs = todoListInputs.querySelector("[data-add-todo-title]");
const todoTagInputs = todoListInputs.querySelector("[data-add-todo-tag]");
const allTagColorCheckBox = todoListInputs.querySelectorAll(".add-todo-tag input")
const todoRedTagCheckBox = todoListInputs.querySelector("#tag-red");
const todoYellowTagCheckBox = todoListInputs.querySelector("#tag-yellow");
const todoGreenTagCheckBox = todoListInputs.querySelector("#tag-green");
const todoSubmitBtn = todoListInputs.querySelector(".submit-todo");

let saveTodoList = [];
let rowNumber = 0;

reloadSavedTodoList()
function reloadSavedTodoList() {
  let savedTodoList = localStorage.getItem("addedTodo");
  if (savedTodoList) {
    saveTodoList = JSON.parse(savedTodoList);
    SartableList.innerHTML = "";
    saveTodoList.forEach(item => {
      if (item.rowNumber > rowNumber) {
        rowNumber = item.rowNumber;
      }
    });

    saveTodoList.forEach(savedTodo => {
      SartableList.innerHTML += `
      <div class="todo-sartable"
      data-todoid="${savedTodo.id}"
      data-row="${savedTodo.rowNumber}">
      <div
        class="todo ${savedTodo.todoColor}" ${savedTodo.checkbox ? `style="text-decoration: line-through"` : ""}
      >
        <div class="todo-right">
        <ion-icon name="reorder-three-outline"></ion-icon>
        ${savedTodo.checkbox ? `
            <input
              type="checkbox"
              name="todo-check"
              id="todo-check-box"
              checked
            />
          ` : `
            <input
              type="checkbox"
              name="todo-check"
              id="todo-check-box"
            />
          `
        }
        <div class="title-and-tag">
          <h3 class="todo-title">${savedTodo.todoTitle}</h3>
          <span class="todo-tag">${savedTodo.todoTag}</span>
        </div>
      </div>
      <div class="todo-left">
        <button data-edit-todo>
          <ion-icon name="create-outline"></ion-icon>
        </button>
        <button data-delete-todo>
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
    <div class="delete-todo">
      <button class="todo-delete" data-accept-delete-todo>
        حذف
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/windows/32/ffffff/enter-key.png"
          alt="enter-key"
        />
      </button>
      <button class="todo-undelete" data-cancell-delete-todo>
        لغو
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/windows/32/000000/esc.png"
          alt="esc"
        />
      </button>
    </div>
  </div>`;
      let todos = SartableList.querySelectorAll(".todo");
      todos.forEach(item => {
        item.addEventListener("mouseenter", showTodoSetting);
        item.addEventListener("mouseleave", hideTodoSetting);
        item.querySelector("input").addEventListener("click", checkTodo);
        item.querySelector("[data-delete-todo]").addEventListener("click", showDeleteTodo);
        item.querySelector("[data-edit-todo]").addEventListener("click", showEditTodo);
      })
    })
  }
}

functions.addEventOnElem(todoRedTagCheckBox, "click", checkedTag);
functions.addEventOnElem(todoYellowTagCheckBox, "click", checkedTag);
functions.addEventOnElem(todoGreenTagCheckBox, "click", checkedTag);

let selectedTagColor;
let selectedCheckBox;

function checkedTag() {
  selectedCheckBox = this;
  selectedTagColor = selectedCheckBox.dataset.tagcolor;
  allTagColorCheckBox.forEach(function (checkbox) {
    if (checkbox !== selectedCheckBox) {
      checkbox.checked = false;
    }
  });
  if (classList) {
    classList.remove(classList.item(1));
    classList.add(selectedTagColor);
  }
}
functions.addEventOnElem(todoSubmitBtn, "click", submitNewTodo);
todoTitleInputs.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (editTodoBtns.style.display !== "flex") {
      submitNewTodo();
    }
    else {
      submitEditTodo()
    }
  }
});
todoTagInputs.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (editTodoBtns.style.display !== "flex") {
      submitNewTodo();
    }
    else {
      submitEditTodo()
    }
  }
});
function submitNewTodo() {
  if (todoTitleInputs.value == "") {
    alert("برای افزودن کار جدید حتما باید عنوانی وارد کنید");
  }
  else {
    let todoTitle = todoTitleInputs.value;
    let todoTag = todoTagInputs.value;
    rowNumber += 1;
    const currentTime = new Date().getTime();
    let tagColor = "";
    if (selectedTagColor) {
      tagColor = selectedTagColor;
    }
    let checkBox = false;
    let todoListData = {
      id: currentTime,
      rowNumber: rowNumber,
      todoTitle: todoTitle,
      todoTag: todoTag,
      checkbox: checkBox,
      todoColor: selectedTagColor
    }
    saveTodoList.unshift(todoListData);
    localStorage.setItem("addedTodo", JSON.stringify(saveTodoList));
    reloadSavedTodoList()
    todoTitleInputs.value = "";
    todoTagInputs.value = "";
    if (selectedCheckBox) {
      selectedCheckBox.checked = false;
      selectedTagColor = "";
    }
  }
}
function showTodoSetting(e) {
  const button = e.target.querySelectorAll("button");
  button.forEach(elem => {
    elem.style.visibility = "visible"
  });
}
function hideTodoSetting(e) {
  const button = e.target.querySelectorAll("button");
  button.forEach(elem => {
    elem.style.visibility = "hidden"
  });
}
function checkTodo(e) {
  const checkbox = e.target;
  const thisInput = checkbox.closest(".todo");
  todoElem = checkbox.closest(".todo-sartable");
  let currentTime = todoElem.dataset.todoid;
  let rowNumber = parseInt(todoElem.dataset.row);
  let todoTitle = todoElem.querySelector(".todo-title").innerText;
  let todoTag = todoElem.querySelector(".todo-tag").innerText;
  let classList = thisInput.classList;
  let selectedTagColor = classList.item(1);

  if (checkbox.checked) {
    thisInput.style.textDecoration = "line-through";
    saveTodoList.forEach((item, index) => {
      if (item.id == todoElem.dataset.todoid) {
        saveTodoList.splice(index, 1);
        localStorage.removeItem('addedTodo');
        localStorage.setItem('addedTodo', JSON.stringify(saveTodoList));
      }
    });
    let todoListData = {
      id: currentTime,
      rowNumber: rowNumber - 100,
      todoTitle: todoTitle,
      todoTag: todoTag,
      checkbox: true,
      todoColor: selectedTagColor,
    }
    saveTodoList.push(todoListData);
    localStorage.setItem("addedTodo", JSON.stringify(saveTodoList));
    reloadSavedTodoList();
  } else {
    saveTodoList.forEach((item, index) => {
      if (item.id == todoElem.dataset.todoid) {
        saveTodoList.splice(index, 1);
        localStorage.removeItem('addedTodo');
        localStorage.setItem('addedTodo', JSON.stringify(saveTodoList));
      }
    });
    let todoListData = {
      id: currentTime,
      rowNumber: rowNumber + 100,
      todoTitle: todoTitle,
      todoTag: todoTag,
      checkbox: false,
      todoColor: selectedTagColor,
    }
    saveTodoList.push(todoListData);
    saveTodoList.sort((a, b) => b.rowNumber - a.rowNumber);
    localStorage.setItem("addedTodo", JSON.stringify(saveTodoList));

    reloadSavedTodoList();
  }
}
let deleteElm;
let todoElem;
function showDeleteTodo(e) {
  const allDeleteTodoContiner = document.querySelectorAll(".delete-todo")
  allDeleteTodoContiner.forEach(elm => {
    elm.style.display = "none"
  })
  const deleteBtn = e.target;
  todoElem = deleteBtn.closest(".todo-sartable");
  deleteElm = todoElem.querySelector(".delete-todo");
  const thisDeleteBtn = todoElem.querySelector("[data-accept-delete-todo]");
  const thisCancellBtn = todoElem.querySelector("[data-cancell-delete-todo]");
  functions.addEventOnElem(thisDeleteBtn, "click", deleteThisTodo);
  functions.addEventOnElem(thisCancellBtn, "click", cancellDeleteThisTodo);
  deleteElm.style.display = "flex";
  todoSubmitBtn.style.display = "block";
  editTodoBtns.style.display = "none";
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const allDeleteTodoContiner = document.querySelectorAll(".delete-todo")
    allDeleteTodoContiner.forEach(elm => {
      if (elm.style.display === "flex") {
        deleteThisTodo()
      }
    })
  }
  if (event.key === "Escape") {
    const allDeleteTodoContiner = document.querySelectorAll(".delete-todo")
    allDeleteTodoContiner.forEach(elm => {
      if (elm.style.display === "flex") {
        cancellDeleteThisTodo()
      }
    })
  }
});

function deleteThisTodo() {
  saveTodoList.forEach((item, index) => {
    if (item.id == todoElem.dataset.todoid) {
      saveTodoList.splice(index, 1);
      localStorage.removeItem('addedTodo');
      localStorage.setItem('addedTodo', JSON.stringify(saveTodoList));
      todoElem.remove();
      if (saveTodoList.length == 0) {
        rowNumber = 0;
      }
    }
  });
}
function cancellDeleteThisTodo() {
  deleteElm.style.display = "none"
}
let todoTitleEdit;
let todoTagEdit;
let classList;
let todoElemId;
const editTodoBtns = document.querySelector(".submit-edite");
const cancellTodoEditBtn = document.querySelector("[data-cancell-edit-todo]");
const applyTodoEditBtn = document.querySelector("[data-apply-edit-todo]");

function showEditTodo(e) {
  const editBtn = e.target;
  todoElem = editBtn.closest(".todo-sartable");
  todoElemId = todoElem.dataset.todoid;
  const thisInput = editBtn.closest(".todo");
  todoTitleEdit = todoElem.querySelector(".todo-title");
  todoTagEdit = todoElem.querySelector(".todo-tag");
  classList = thisInput.classList;
  saveTodoList.forEach(item => {
    if (item.id == todoElem.dataset.todoid) {
      todoTitleInputs.value = item.todoTitle;
      todoTagInputs.value = item.todoTag;
      switch (item.todoColor) {
        case "red":
          todoRedTagCheckBox.checked = true;
          todoYellowTagCheckBox.checked = false;
          todoGreenTagCheckBox.checked = false;
          break;
        case "yellow":
          todoYellowTagCheckBox.checked = true;
          todoRedTagCheckBox.checked = false;
          todoGreenTagCheckBox.checked = false;
          break;
        case "green":
          todoGreenTagCheckBox.checked = true;
          todoYellowTagCheckBox.checked = false;
          todoRedTagCheckBox.checked = false;
          break;

        default:
          todoGreenTagCheckBox.checked = false;
          todoYellowTagCheckBox.checked = false;
          todoRedTagCheckBox.checked = false;
          break;
      }
    }
    functions.addEventOnElem(todoTitleInputs, "input", EditeTodoTitleInputs);
    functions.addEventOnElem(todoTagInputs, "input", EditeTodoTagInputs);
  });
  todoSubmitBtn.style.display = "none";
  editTodoBtns.style.display = "flex";

  const allDeleteTodoContiner = document.querySelectorAll(".delete-todo")
  allDeleteTodoContiner.forEach(elm => {
    elm.style.display = "none"
  })
}
function EditeTodoTitleInputs(e) {
  const inputValue = e.target.value;
  todoTitleEdit.innerText = inputValue
}
function EditeTodoTagInputs(e) {
  const inputValue = e.target.value;
  todoTagEdit.innerText = inputValue
}

functions.addEventOnElem(cancellTodoEditBtn, "click", cancellEditTodo);
function cancellEditTodo() {
  todoSubmitBtn.style.display = "block";
  editTodoBtns.style.display = "none";
  todoTitleInputs.value = "";
  todoTagInputs.value = "";
  if (selectedCheckBox) {
    selectedCheckBox.checked = false;
    selectedTagColor = "";
  }
  todoTitleInputs.removeEventListener('input', EditeTodoTitleInputs);
  todoGreenTagCheckBox.checked = false;
  todoYellowTagCheckBox.checked = false;
  todoRedTagCheckBox.checked = false;
  reloadSavedTodoList();
}

functions.addEventOnElem(applyTodoEditBtn, "click", submitEditTodo);
function submitEditTodo() {
  saveTodoList.forEach(item => {
    if (item.id == todoElemId) {
      item.todoTitle = todoTitleEdit.innerText;
      item.todoTag = todoTagEdit.innerText;
      item.todoColor = selectedTagColor;
    }
  });
  localStorage.removeItem('addedTodo');
  localStorage.setItem('addedTodo', JSON.stringify(saveTodoList));
  reloadSavedTodoList();
  editTodoBtns.style.display = "none";
  todoSubmitBtn.style.display = "block";
  todoTitleInputs.value = "";
  todoTagInputs.value = "";
  if (selectedCheckBox) {
    selectedCheckBox.checked = false;
    selectedTagColor = "";
  }
}



///////////////////////////////////
///////// Solar Calendar /////////
/////////////////////////////////




