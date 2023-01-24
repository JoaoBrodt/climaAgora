const cidade = document.querySelector(".card-header");
const data = document.querySelector(".data");
const descricao = document.querySelector(".descricao");
const temperatura = document.querySelector(".temperatura");
const sensacao = document.querySelector(".sensacao");
const humidade = document.querySelector(".humidade");
const vento = document.querySelector(".vento");
const imagem = document.querySelector(".content-img");
const unidade = {
  celcius: "°C",
  farenheit: "°F",
};

const api = {
  key: "46a80a5cb3c21928e15e5f0aabe5995e",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};

function defineCidade() {
  let city = document.querySelector(".form-control")?.value;

  return city
    ? `${document.querySelector(".form-control")?.value}`
    : (city = "Ribeirão Preto");
}
city = "ribeirão preto";

function searchResults(city) {
  fetch(
    `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
    })
    .then((response) => {
      console.log(response);
      cidade.innerHTML = `${response.name}, ${response.sys.country}`;
      descricao.innerHTML = response.weather[0].description;
      temperatura.innerHTML = `${parseInt(response.main.temp)} ${
        unidade.celcius
      }`;
      sensacao.innerHTML = `${parseInt(response.main.feels_like)} ${
        unidade.celcius
      }`;
      humidade.innerHTML = `${response.main.humidity} %`;
      vento.innerHTML = `${parseInt(response.wind.speed * 3.6)} Km/h`;
      const iconName = response.weather[0].icon;
      imagem.innerHTML = `<img src="./icons/${iconName}.png">`;
      return response;
    });
}

function criaData() {
  let now = new Date();
  let dia = now.getDate();
  const options = { month: "long" };
  let mes = Intl.DateTimeFormat("pt-BR", options).format();
  let ano = now.getFullYear();
  return `${dia} de ${mes} de ${ano}`;
}

searchResults(city);
data.innerHTML = criaData();
