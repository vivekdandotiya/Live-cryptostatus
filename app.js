// ---------------- COIN CONFIG ----------------
const COINS = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', pair: 'btcusdt' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', pair: 'ethusdt' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', pair: 'solusdt' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', pair: 'dogeusdt' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', pair: 'adausdt' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP', pair: 'xrpusdt' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', pair: 'dotusdt' },
  { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', pair: 'avaxusdt' },
  
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', pair: 'linkusdt' },
  
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', pair: 'maticusdt' },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', pair: 'ltcusdt' },
  
  { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB', pair: 'shibusdt' },
  
  { id: 'uniswap', name: 'Uniswap', symbol: 'UNI', pair: 'uniusdt' },
  
  { id: 'stellar', name: 'Stellar', symbol: 'XLM', pair: 'xlmusdt' },
  { id: 'cosmos', name: 'Cosmos', symbol: 'ATOM', pair: 'atomusdt' }
];

let cryptoData = [];
let filteredData = [];

function formatNumber(num) {
  if (num >= 1e12) return '$' + (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
  return '$' + num.toLocaleString();
}

function formatPrice(price) {
  if (price >= 1) return price.toFixed(2);
  if (price >= 0.01) return price.toFixed(4);
  if (price >= 0.0001) return price.toFixed(6);
  return price.toFixed(8);
}

function initData() {
  cryptoData = COINS.map((c, i) => ({
    ...c,
    image: `https://assets.coingecko.com/coins/images/${i + 1}/small/${c.id}.png`,
    current_price: 0,
    previousPrice: 0,
    price_change_percentage_24h: 0,
    market_cap: 0,
    total_volume: 0,
    priceDirection: 'neutral'
  }));

  filteredData = [...cryptoData];
  renderCryptoCards();
}

function startLiveSocket() {
  const streams = COINS.map(c => `${c.pair}@ticker`).join('/');
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/stream?streams=${streams}`
  );

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data).data;
    const symbol = msg.s.toLowerCase();

    const coin = cryptoData.find(c => c.pair === symbol);
    if (!coin) return;

    const newPrice = parseFloat(msg.c);
    const prevPrice = coin.current_price || newPrice;

    coin.priceDirection =
      newPrice > prevPrice ? 'up' :
      newPrice < prevPrice ? 'down' : 'neutral';

    coin.previousPrice = prevPrice;
    coin.current_price = newPrice;
    coin.price_change_percentage_24h = parseFloat(msg.P);
    coin.market_cap = parseFloat(msg.q); 
    coin.total_volume = parseFloat(msg.v);

    filteredData = [...cryptoData];
    renderCryptoCards();
    updateMarketStats();

    document.getElementById('lastUpdate').textContent = 'Live';
  };

  ws.onopen = () => console.log('✅ Binance WebSocket connected');
  ws.onerror = err => console.error('❌ WebSocket error', err);
}

function updateMarketStats() {
  const marketCap = cryptoData.reduce((s, c) => s + (c.market_cap || 0), 0);
  const volume = cryptoData.reduce((s, c) => s + (c.total_volume || 0), 0);

  document.getElementById('totalMarketCap').textContent = formatNumber(marketCap);
  document.getElementById('total24hVolume').textContent = formatNumber(volume);
}

function renderCryptoCards() {
  const grid = document.getElementById('cryptoGrid');
  const noResults = document.getElementById('noResults');

  if (!filteredData.length) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  grid.innerHTML = filteredData.map((coin, i) => {
    const positive = coin.price_change_percentage_24h >= 0;
    const color = positive ? 'text-green-400' : 'text-red-400';
    const bg = positive ? 'bg-green-500 bg-opacity-10' : 'bg-red-500 bg-opacity-10';
    const arrow = positive ? '↑' : '↓';

    let priceClass = 'price-neutral';
    if (coin.priceDirection === 'up') priceClass = 'price-up';
    if (coin.priceDirection === 'down') priceClass = 'price-down';

    return `
      <div class="crypto-card bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">
              ${coin.symbol}
            </div>
            <div>
              <h3 class="font-bold">${coin.name}</h3>
              <p class="text-gray-400 text-sm">${coin.symbol}</p>
            </div>
          </div>
          <span class="text-gray-500">#${i + 1}</span>
        </div>

        <p class="text-3xl font-bold ${priceClass}">
          $${formatPrice(coin.current_price)}
        </p>

        <div class="my-3">
          <span class="${bg} ${color} px-3 py-1 rounded text-sm font-semibold">
            ${arrow} ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </span>
          <span class="text-gray-500 text-xs ml-2">24h</span>
        </div>
      </div>
    `;
  }).join('');
}

function filterCryptos(term) {
  filteredData = cryptoData.filter(c =>
    c.name.toLowerCase().includes(term) ||
    c.symbol.toLowerCase().includes(term)
  );
  renderCryptoCards();
}

document.getElementById('searchInput')
  .addEventListener('input', e =>
    filterCryptos(e.target.value.toLowerCase())
  );

window.addEventListener('DOMContentLoaded', () => {
  initData();
  startLiveSocket();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const intro = document.getElementById('introScreen');
    if (intro) intro.remove();
  }, 3200);
});
