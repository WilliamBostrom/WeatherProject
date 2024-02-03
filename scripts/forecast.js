const key = "6A9Zdbi4AHv7LfqSDjmXZVshPYbuD8aP";

const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";

  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// get city
const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";

  const query = `?apikey=${key}&q=${city}`;
  try {
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
  } catch (err) {
    console.log(err);
  }
};

getCity("manchester")
  .then((data) => {
    return getWeather(data.Key).then((data2) => {
      console.log(data2);
    });
  })
  .catch((err) => console.log(err));

// getWeather("329260");
