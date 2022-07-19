const requestURL = 'json/temples.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);
    const temples = jsonObject['temples'];
    choosespotlight(temples)
  });


function choosespotlight(temples){
  const firstDay = new Date();
  const secondDay = new Date(firstDay)
  const thirdDay = new Date(firstDay)
  secondDay.setDate(secondDay.getDate() + 1)
  thirdDay.setDate(thirdDay.getDate() + 2)
  const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(firstDay);
  const tomorrow = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(secondDay);  
  const dayAfterTomorrow = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(thirdDay);

  // const jsonTemple = Math.floor(Math.random() * 4);
  const jsonTemple = 2

  displayspotlight(temples[jsonTemple])
  displayweather(temples[jsonTemple], today, "box1", 0)
  displayweather(temples[jsonTemple], tomorrow, "box2", 1)
  displayweather(temples[jsonTemple], dayAfterTomorrow, "box3", 2)

}

function displayspotlight(temple) {
  // let card = document.querySelector('.spotlight')
  let card = document.createElement('div')
  let h2 = document.createElement('h2');
  let img = document.createElement('img');
  let h4 = document.createElement('h4');
  let p = document.createElement('p');

  card.setAttribute('class', 'spotlight')

  h2.innerHTML = `Temple Spotlight`

  img.setAttribute('src', temple.image);
  img.setAttribute('alt', `Icon image for ${temple.name}`);
  img.setAttribute('loading', 'lazy');

  h4.innerHTML = `${temple.city}<br><em>${temple.country}</em>`

  p.textContent = temple.about;

  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(h4);
  card.appendChild(p);

  document.querySelector('.spotlight-temple').appendChild(card);

  
  let weatherH2 = document.createElement('h2')
  
  weatherH2.innerHTML = `Weather in ${temple.city}`;

  document.querySelector('.spotlight-weather').appendChild(weatherH2);
}

function displayweather(temple, day, box, forecastday) { 

  const APIurl = `https://api.weatherapi.com/v1/forecast.json?key=087fe58ffb314648b00140139221907&q=${temple.weatherId}&days=3&aqi=no&alerts=yes`;
  
  fetch(APIurl, temple)
  .then((response) => response.json())
  .then((weatherinfo) => {
  
    console.log(weatherinfo);

    let card = document.createElement('div');
    let img = document.createElement('img');
    let temp = document.createElement('p');
    let caption = document.createElement('p');      
    let humidity = document.createElement('p');
    let date = document.createElement('p');   
    
    card.setAttribute('class', `weather-section ${box}`);


    let minTemp = weatherinfo.forecast.forecastday[forecastday].day.mintemp_f.toFixed(0);
    let maxTemp = weatherinfo.forecast.forecastday[forecastday].day.maxtemp_f.toFixed(0);
    temp.innerHTML = `<strong>${maxTemp} /<br>${minTemp}&#176;F</strong>`;
    
    const iconsrc = weatherinfo.forecast.forecastday[forecastday].day.condition.icon;
    const desc = weatherinfo.forecast.forecastday[forecastday].day.condition.text;

    img.setAttribute('src', iconsrc);
    img.setAttribute('alt', desc);

    caption.textContent = desc;

    let humid = weatherinfo.forecast.forecastday[forecastday].day.avghumidity;
    humidity.innerHTML = `Humidity: ${humid}% `;

    date.innerHTML = day;

    card.appendChild(img);
    card.appendChild(temp);
    card.appendChild(caption);
    card.appendChild(humidity);
    card.appendChild(date);

    document.querySelector('.spotlight-weather').appendChild(card);

  });

}
