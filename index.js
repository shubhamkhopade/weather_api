// Api URL
const country_url = "https://restcountries.eu/rest/v2/all";

// ****this is my bootstraps*********
const container = bootstrap("div", "container");
const colTitle = bootstrap("div", "mb-2 title");
const title = bootstrap("h1", "head text-center");
title.innerHTML = "Global Weather Data";
const rowCard = bootstrap("div", "row mx-auto card-row");
colTitle.append(title);
container.append(rowCard);
document.body.append(colTitle, container);

// ****creating bootstrap html elements****
function bootstrap(ele, className = "") {
  let element = document.createElement(ele);
  element.setAttribute("class", className);
  return element;
}

// creation of the cards
fetch(country_url)
  .then((res) => res.json())
  .then((countrydata) => {
    for (let i = 0; i < countrydata.length; i++) {
      const colCard = bootstrap("div", "col-md-4 my-3");
      const card = bootstrap("div", "card mx-auto");
      card.style.width = "20rem";
      const image = bootstrap("img", "card-img-top mb-2");
      image.src = `${countrydata[i].flag}`;
      image.alt = `${countrydata[i].name}`;
      image.style.height="10rem";
      const card_body = bootstrap("div", "card-body");
      const title = bootstrap("h5", "card-title");
      title.innerHTML = `${countrydata[i].name}`;
      const capitalCity = bootstrap("p", "card-text");
      capitalCity.innerHTML = `Capital: ${countrydata[i].capital}`;
      const region = bootstrap("p", "card-text");
      region.innerHTML = `Region: ${countrydata[i].region}`;
      const code = bootstrap("p", "card-text");
      code.innerHTML = `Code: ${countrydata[i].alpha3Code}`;
      const button = bootstrap("button", "button btn btn-info");
      button.dataset.id = `${countrydata[i].capital}`;
      button.innerHTML = "Weather";
      button.addEventListener("click", () => {
        cityWeather(countrydata[i], button);
      });
      card_body.append(title, capitalCity, region, code, button);
      card.append(image, card_body);
      colCard.append(card);
      rowCard.append(colCard);
    }
  },2000)
  .catch((error) => console.log(error));

// fetching the weather info from api
function cityWeather(city, btn) {
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city.capital}&units=metric&appid=7cad4651e90ca407c188271c0ae602ed`;
  fetch(weather_url)
    .then((res) => res.json())
    .then((data) => {
      btn.innerHTML = `Capital Weather: ${data.main.temp} C<sup>o</sup>`;
      btn.classList.remove("btn-sucess");
      btn.classList.add("btn-danger");
    })
    .catch((error) => console.log(error));
}
