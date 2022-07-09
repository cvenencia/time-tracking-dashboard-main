const container = document.querySelector('.container');
const profileImg = document.getElementById('img');
const nameSpan = document.getElementById('name');
const infoCard = document.querySelector('div.info-card');
let timePeriod = document.querySelector(
  'input[name="time-period"]:checked'
).value;

let loadedDataset = 0;
const datasets = ['./data1.json', './data2.json'];
let data;
const cardColors = [
  'hsl(15, 100%, 70%)',
  'hsl(195, 74%, 62%)',
  'hsl(348, 100%, 68%)',
  'hsl(145, 58%, 55%)',
  'hsl(264, 64%, 52%)',
  'hsl(43, 84%, 65%)',
];

load(datasets[loadedDataset]);
checkDeviceWidth();

function load(url) {
  fetch(url)
    .then((res) => res.json())
    .then(getData);
}

function getData(d) {
  data = d;
  console.log(d);
  loadData();
}

function loadData() {
  deleteCards();
  const { name, img_url, time_data } = data;
  profileImg.src = img_url;
  nameSpan.innerHTML = name;

  time_data.forEach((e, index) => {
    const { color, iconURL, alt } = getProperties(e.title);

    const timeCard = document.createElement('div');
    timeCard.innerHTML = `<img src="${iconURL}" alt="${alt}">
      <div class="content transition rounded-border">
        <div class="title-container">
          <h3>${e.title}</h3>
          <button><img src="images/icon-ellipsis.svg" alt=""></button>
        </div>
        <div class="times">
          <h1><span id="current-${index}"></span>hrs</h1>
          <p>Last <span id="time-period-${index}"></span> - <span id="previous-${index}"></span>hrs</p>
        </div>
      </div>`;
    timeCard.className = 'bg-img rounded-border';
    timeCard.style = color
      ? `background-color: ${color};`
      : `background-color: ${cardColors[index % cardColors.length]};`;
    container.appendChild(timeCard);
  });
  updateData();
}

function updateData() {
  const { time_data } = data;

  time_data.forEach((e, index) => {
    document.getElementById(`previous-${index}`).innerHTML =
      e.timeframes[timePeriod].previous;
    document.getElementById(`current-${index}`).innerHTML =
      e.timeframes[timePeriod].current;
    document.getElementById(`time-period-${index}`).innerHTML =
      getPeriod(timePeriod);
  });
}

function updateTimePeriod() {
  timePeriod = document.querySelector(
    'input[name="time-period"]:checked'
  ).value;
  updateData();
}

function getProperties(title) {
  let color, iconURL, alt;
  switch (title.toLowerCase()) {
    case 'work':
      color = cardColors[0];
      iconURL = './images/icon-work.svg';
      alt = 'Work icon';
      break;
    case 'play':
      color = cardColors[1];
      iconURL = './images/icon-play.svg';
      alt = 'Play icon';
      break;
    case 'study':
      color = cardColors[2];
      iconURL = './images/icon-study.svg';
      alt = 'Study icon';
      break;
    case 'exercise':
      color = cardColors[3];
      iconURL = './images/icon-exercise.svg';
      alt = 'Exercise icon';
      break;
    case 'social':
      color = cardColors[4];
      iconURL = './images/icon-social.svg';
      alt = 'Social icon';
      break;
    case 'self care':
      color = cardColors[5];
      iconURL = './images/icon-self-care.svg';
      alt = 'Self care icon';
      break;
    default:
      iconURL =
        'https://cdn.iconscout.com/icon/free/png-256/activity-2456671-2036125.png';
      alt = 'Activity icon';
  }
  return { color, iconURL, alt };
}

function changeDataset() {
  loadedDataset = (loadedDataset + 1) % datasets.length;
  load(datasets[loadedDataset]);
}

function deleteCards() {
  document.querySelectorAll('.bg-img').forEach((e) => e.remove());
}

function getPeriod(period) {
  switch (period) {
    case 'daily':
      return 'day';
    case 'weekly':
      return 'week';
    case 'monthly':
      return 'month';
  }
}

function checkDeviceWidth() {
  if (window.innerWidth < 500) {
    infoCard.classList.remove('span-2-rows');
  } else {
    infoCard.classList.add('span-2-rows');
  }
}

window.onresize = checkDeviceWidth;
