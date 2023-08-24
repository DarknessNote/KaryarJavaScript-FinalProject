import * as functions from './functions.js';

//Show Settings
const settings=document.querySelector('.settings ion-icon');
const settingsContainer=document.querySelector('.settings-container');

functions.addEventOnElem(settings,'click',showSettingsContainer);

function showSettingsContainer(){
    settingsContainer.classList.toggle("active");
}
//Change Mode / Dark Or Light
const modeChekbox=document.querySelector('[data-mode-checkbox]');
const head=document.head;
functions.addEventOnElem(modeChekbox,'change',toChangeMode);
function toChangeMode(){
  if (this.checked) {
    document.documentElement.style.setProperty('--primary-color', '#181823');
    // document.documentElement.style.setProperty('--secondary-color', '#NewValue2');
    document.documentElement.style.setProperty('--input-color', '#B9D4F1');
    document.documentElement.style.setProperty('--button-color', '#537FE7');
    document.documentElement.style.setProperty('--hover-button-color', '#7AA5D2');
    document.documentElement.style.setProperty('--border-color-1', '#537FE7');
    document.documentElement.style.setProperty('--border-color-2', '#537FE7');
    document.documentElement.style.setProperty('--border-color-3', '#E9F8F9');
    document.documentElement.style.setProperty('--hover-color-1', '#7AA5D2');
    document.documentElement.style.setProperty('--text-hover-1', '#fff');
    document.documentElement.style.setProperty('--text-hover-2', '#000');
    document.documentElement.style.setProperty('--text-hover-3', '#000');
    document.documentElement.style.setProperty('--selected-color', '#537FE7');
    document.documentElement.style.setProperty('--text-color-1', '#E9F8F9');
    document.documentElement.style.setProperty('--text-color-2', '#fff');
    document.documentElement.style.setProperty('--text-color-3', '#000');
    document.documentElement.style.setProperty('--icon-color-1', '#E9F8F9');
    document.documentElement.style.setProperty('--icon-color-2', '#E9F8F9');
  } else {
    document.documentElement.style.setProperty('--primary-color', '#F1F6F9');
  document.documentElement.style.setProperty('--secondary-color', '#AFD3E2');
  document.documentElement.style.setProperty('--input-color', '#dfe4e9');
  document.documentElement.style.setProperty('--button-color', '#366ED8');
  document.documentElement.style.setProperty('--border-color-1', '#0D1282');
  document.documentElement.style.setProperty('--border-color-2', '#13334C');
  document.documentElement.style.setProperty('--border-color-3', '#13334C');
  document.documentElement.style.setProperty('--hover-color-1', '#b9b9b9');
  document.documentElement.style.setProperty('--hover-button-color', '#07A4B5');
  document.documentElement.style.setProperty('--text-hover-1', '#fff');
  document.documentElement.style.setProperty('--text-hover-2', '#1D242B');
  document.documentElement.style.setProperty('--text-hover-3', '#1D242B');
  document.documentElement.style.setProperty('--selected-color', '#19376D');
  document.documentElement.style.setProperty('--text-color-1', '#fff');
  document.documentElement.style.setProperty('--text-color-2', '#1D242B');
  document.documentElement.style.setProperty('--text-color-3', '#1D242B');
  document.documentElement.style.setProperty('--icon-color-1', '#393E46');
  document.documentElement.style.setProperty('--icon-color-2', '#0D1282');
  document.documentElement.style.setProperty('--icon-color-3', '#F1F6F9');
  }
}

//Change Fonts
const fontSelect = document.querySelector('.select');
const fontList=document.querySelector('.font-list')
const fontOptions= document.querySelectorAll('.font-list li')
const fontSelected=document.querySelector('.selected');

functions.addEventOnElem(fontSelect,'click',toggleFontDropdown);

function toggleFontDropdown(){
  this.classList.toggle('.select-clicked');
  fontList.classList.toggle('font-list-open');
}

functions.addEventOnElem(fontOptions,'click',toggleFontOptions);

function toggleFontOptions(){
  fontSelected.innerText=this.innerText;
  fontSelect.classList.remove('.select-clicked');
  fontList.classList.remove('font-list-open');
  fontOptions.forEach(option=>{
    option.classList.remove('active')
  })
  this.classList.add('active');
  document.documentElement.style.setProperty('--font-family', this.dataset.font );
}


//Change Backgrond
const colorBtns=document.querySelectorAll('.change-background .colors button');
const settingImage=document.querySelector('.change-background .images');
const imageBtns=document.querySelectorAll('.change-background .images button');
const netNoticeSpan=document.querySelector('.change-background .net-notice');
const body = document.body;

colorBtns.forEach(colors => {
  colors.style.background=colors.dataset.color;
  functions.addEventOnElem(colors,'click',toChangeBgColor);
})
function toChangeBgColor(){
  body.style.backgroundImage = "none";
  body.style.backgroundColor = this.dataset.color;
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
    imageBtns.forEach(imageButton => {
      const imageUrl = imageButton.dataset.img;
      loadImage(imageUrl, imageButton);
    });
    imageBtns.forEach(images => {
      functions.addEventOnElem(images,'click',toChangeBgImage);
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
}

window.addEventListener('online', checkOnlineStatus);
window.addEventListener('offline', checkOnlineStatus);

checkOnlineStatus();


//Search Bar
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('[data-search-input]');

functions.addEventOnElem(searchBtn,'click',searchGoogle);
searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    searchGoogle(e);
  }
});

function searchGoogle(e) {
  e.preventDefault();
  if (searchInput.value.trim() === '') {
    return;
  }
  const url = "https://www.google.com/search?q=" + encodeURIComponent(searchInput.value);
  window.open(url, "_blank");
  searchInput.value = '';
}