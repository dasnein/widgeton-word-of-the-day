import dayjs from 'dayjs';

import db from './db.json';

let appLoading = true;

// TODO: return start date
const START_DATE = '2024-07-24 00:00';
// const START_DATE = '2024-06-06 00:00';

const LANGUAGES = ['ru'];
const currentLanguage = LANGUAGES[0];

const LOADER_ID = 'loader';
const CARD_TITLE_ID = 'card-title';
const CARD_DESCRIPTION_CONTAINER_ID = 'card-description-container';
const CARD_DESCRIPTION_TEXT_ID = 'card-description-text';

const TEXT_ELLIPSIS = '...';

const LOADER_VISIBLE_CLASS = 'visible';

const elLoader = document.getElementById(LOADER_ID);
const elTitle = document.getElementById(CARD_TITLE_ID);
const elDescriptionContainer = document.getElementById(CARD_DESCRIPTION_CONTAINER_ID);
const elDescriptionText = document.getElementById(CARD_DESCRIPTION_TEXT_ID);

function showWord(item) {
  elTitle.innerHTML = item.word;
  elDescriptionText.innerHTML = item.description;
  elDescriptionText.title = item.fullDescription || item.description;

  window.requestAnimationFrame(buildMarkdown.bind(null, item));
}

function buildMarkdown(item) {
  const { height: containerHeight, width: containerWidth } = elDescriptionContainer.getBoundingClientRect();
  const { height: textHeight } = elDescriptionText.getBoundingClientRect();

  if (textHeight > containerHeight) {
    const updatedDescription = item.description.split(' ').slice(0, -2).concat(TEXT_ELLIPSIS).join(' ');

    return showWord({
      ...item,
      description: updatedDescription,
      fullDescription: item.fullDescription || item.description,
    });
  }

  toggleLoader(false);
}

function toggleLoader(newState) {
  appLoading = newState === undefined ? !appLoading : newState;

  if (appLoading) {
    elLoader.classList.add(LOADER_VISIBLE_CLASS);
  } else {
    elLoader.classList.remove(LOADER_VISIBLE_CLASS);
  }
}

function setUpdateTimeout() {
  const now = dayjs();
  const nextDay = now.add(1, 'day').set('hour', 0).set('minute', 0).set('second', 1);
  const diff = nextDay.diff(now);

  setTimeout(init, diff);
}

function init() {
  toggleLoader(true);

  const startDate = dayjs(START_DATE);
  const currentDate = dayjs();
  const daysDiff = currentDate.diff(startDate, 'days');

  const wordRepeatCount = db[currentLanguage].length;

  const todayItemIndex = daysDiff % wordRepeatCount;

  const todayItem = db[currentLanguage][todayItemIndex];

  if (todayItem) {
    showWord(todayItem);
    setUpdateTimeout();
  }
}

window.addEventListener('resize', init);

(() => init())();
