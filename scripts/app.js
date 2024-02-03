const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  // destrucuring
  const { cityDets, weather } = data;

  details.innerHTML = `<h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>`;

  /* Icon weather */
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  /* Day & Night icons */
  let timeSrc = weather.IsDayTime ? "/img/day.svg" : "/img/night.svg";

  time.setAttribute("src", timeSrc);
  // d-none ta bort
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  console.log(city);
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

/* 
const todos = [
  { text: "play mariokart", author: "test" },
  { text: "build website", author: "william" },
  { text: "store data", author: "wille" },
];
console.log(JSON.stringify(todos));

localStorage.setItem("todos", JSON.stringify(todos));

const stored = localStorage.getItem("todos");
let jsonstr = JSON.parse(stored);
console.log(stored);
console.log(jsonstr);
 */
