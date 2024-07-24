import dayjs from 'dayjs';

import db from './db.json';

// const START_DATE = '2024-07-24 00:00';
const START_DATE = '2024-06-6 00:00';

const LANGUAGES = ['ru'];
const currentLanguage = LANGUAGES[0];

const CARD_TITLE_ID = 'card-title';
const CARD_DESCRIPTION_CONTAINER_ID = 'card-description-container';
const CARD_DESCRIPTION_TEXT_ID = 'card-description-text';

function showWord(item) {
  const elTitle = document.getElementById(CARD_TITLE_ID);
  // const elDescriptionContainer = document.getElementById(CARD_DESCRIPTION_CONTAINER_ID);
  const elDescriptionText = document.getElementById(CARD_DESCRIPTION_TEXT_ID);

  if (elTitle && elDescriptionText) {
    elTitle.innerHTML = item.word;
    elDescriptionText.innerHTML = item.description;
  }
}

let todayItemIndex = -1;

function init() {
  const startDate = dayjs(START_DATE);
  const currentDate = dayjs();
  const daysDiff = currentDate.diff(startDate, 'days');

  const wordRepeatCount = db[currentLanguage].length;

  // const todayItemIndex = daysDiff % wordRepeatCount;
  todayItemIndex += 1;

  const todayItem = db[currentLanguage][todayItemIndex];

  if (todayItem) {
    showWord(todayItem);
    setTimeout(init, 5000);
  }
}

(() => init())();
