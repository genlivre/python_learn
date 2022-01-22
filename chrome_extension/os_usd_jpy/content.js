var changePrice = (jpyRate) => {
  const searchClass = ".Price--fiat-amount-secondary"
  const secondPriceDOM = document.querySelector(searchClass)

  let usd = secondPriceDOM.textContent
  usd = Number(usd.replace("$", "").replace(",", "").replace("(", "").replace(")", ""))
  const jpy = Math.ceil(usd * jpyRate).toLocaleString("ja-JP-u-ca-japanese")
  usd = usd.toLocaleString("ja-JP-u-ca-japanese")
  secondPriceDOM.textContent = `(USD: $${usd} | JPY: 約${jpy}円)`

  console.log(`$${usd}`);
  console.log(`¥${jpy}`);
}

const apiUri = 'https://api.exchangerate-api.com/v4/latest/USD'
const jpyRate = () => {
  fetch(apiUri, { credentials: 'same-origin' })
    .then((response) => {
      const json = response.json()
      json.then(data => {
        console.log(`fetch RATE: ${data.rates.JPY}`);
        changePrice(data.rates.JPY);
      })
    })
}

jpyRate();
