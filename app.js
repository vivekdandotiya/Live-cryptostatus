const INITIAL_CRYPTO_DATA = [/* SAME DATA */];

let cryptoData = [], filteredData = [], updateCount = 0;

const formatNumber = n =>
  n >= 1e12 ? `$${(n/1e12).toFixed(2)}T` :
  n >= 1e9  ? `$${(n/1e9).toFixed(2)}B` :
  n >= 1e6  ? `$${(n/1e6).toFixed(2)}M` :
  n >= 1e3  ? `$${(n/1e3).toFixed(2)}K` : `$${n.toFixed(2)}`;

const formatPrice = p =>
  p >= 1 ? p.toFixed(2) : p >= .01 ? p.toFixed(4) : p >= .0001 ? p.toFixed(6) : p.toFixed(8);

const simulatePrice = (p,v)=>p*(1+((Math.random()-.5)*v*2)/100);

function initData(){
  cryptoData = INITIAL_CRYPTO_DATA.map(c=>({...c,previousPrice:c.current_price,priceDirection:'neutral'}));
  filteredData=[...cryptoData];
  render();
  updateStats();
}

function updateStats(){
  totalMarketCap.textContent = formatNumber(cryptoData.reduce((s,c)=>s+c.market_cap,0));
  total24hVolume.textContent = formatNumber(cryptoData.reduce((s,c)=>s+c.total_volume,0));
}

function updateLive(){
  updateCount++;
  cryptoData = cryptoData.map(c=>{
    const v = ['BTC','ETH'].includes(c.symbol)?0.2:['DOGE','SHIB'].includes(c.symbol)?0.5:0.3;
    const newP = simulatePrice(c.current_price,v);
    const old24h = c.current_price/(1+c.price_change_percentage_24h/100);
    return {
      ...c,
      previousPrice:c.current_price,
      current_price:newP,
      price_change_percentage_24h:((newP-old24h)/old24h)*100,
      priceDirection:newP>c.current_price?'up':newP<c.current_price?'down':'neutral'
    };
  });
  filter(searchInput.value.toLowerCase());
  if(updateCount%5===0) updateStats();
  lastUpdate.textContent='Just now';
}

function render(){
  if(!filteredData.length) return cryptoGrid.innerHTML='',noResults.classList.remove('hidden');
  noResults.classList.add('hidden');

  cryptoGrid.innerHTML = filteredData.map((c,i)=>{
    const up = c.price_change_percentage_24h>=0;
    return `
    <div class="crypto-card ${i<3?'glow-effect':''} bg-gray-800 rounded-2xl p-6 border">
      <div class="flex justify-between mb-4">
        <div class="flex gap-3">
          <img src="${c.image}" class="w-12 h-12 rounded-full">
          <div>
            <h3>${c.name}</h3>
            <p class="text-sm text-gray-400">${c.symbol}</p>
          </div>
        </div>
        <span class="${i<3?'rank-badge':'text-gray-500'}">#${i+1}</span>
      </div>
      <p class="text-3xl font-bold price-${c.priceDirection}">$${formatPrice(c.current_price)}</p>
      <span class="${up?'text-green-400':'text-red-400'}">${up?'↑':'↓'} ${Math.abs(c.price_change_percentage_24h).toFixed(2)}%</span>
      <div class="mt-4 text-sm text-gray-400">
        <div class="flex justify-between"><span>Market Cap</span><span>${formatNumber(c.market_cap)}</span></div>
        <div class="flex justify-between"><span>Volume</span><span>${formatNumber(c.total_volume)}</span></div>
      </div>
    </div>`;
  }).join('');
}

function filter(q){
  filteredData = cryptoData.filter(c=>c.name.toLowerCase().includes(q)||c.symbol.toLowerCase().includes(q));
  render();
}

searchInput.addEventListener('input',e=>filter(e.target.value.toLowerCase()));

window.addEventListener('DOMContentLoaded',()=>{
  initData();
  setInterval(updateLive,1000);
});
