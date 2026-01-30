const INITIAL_CRYPTO_DATA = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 42580.50, price_change_percentage_24h: 2.45, market_cap: 835000000000, total_volume: 28500000000, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 2245.75, price_change_percentage_24h: -1.23, market_cap: 270000000000, total_volume: 15200000000, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 98.45, price_change_percentage_24h: 5.67, market_cap: 42000000000, total_volume: 2100000000, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', current_price: 0.08234, price_change_percentage_24h: -3.21, market_cap: 11500000000, total_volume: 845000000, image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price: 0.5234, price_change_percentage_24h: 1.89, market_cap: 18400000000, total_volume: 425000000, image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP', current_price: 0.6145, price_change_percentage_24h: 4.32, market_cap: 33200000000, total_volume: 1850000000, image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', current_price: 7.23, price_change_percentage_24h: -2.15, market_cap: 9800000000, total_volume: 285000000, image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
    { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', current_price: 36.78, price_change_percentage_24h: 3.67, market_cap: 13500000000, total_volume: 575000000, image: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', current_price: 14.52, price_change_percentage_24h: 1.45, market_cap: 8200000000, total_volume: 425000000, image: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
    { id: 'polygon', symbol: 'MATIC', name: 'Polygon', current_price: 0.8456, price_change_percentage_24h: -1.87, market_cap: 7800000000, total_volume: 385000000, image: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png' },
    { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', current_price: 72.34, price_change_percentage_24h: 2.11, market_cap: 5400000000, total_volume: 425000000, image: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png' },
    { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu', current_price: 0.00000945, price_change_percentage_24h: -4.56, market_cap: 5600000000, total_volume: 285000000, image: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png' },
    { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', current_price: 6.78, price_change_percentage_24h: 1.23, market_cap: 5100000000, total_volume: 185000000, image: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png' },
    { id: 'stellar', symbol: 'XLM', name: 'Stellar', current_price: 0.1234, price_change_percentage_24h: 0.89, market_cap: 3500000000, total_volume: 125000000, image: 'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png' },
    { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos', current_price: 9.87, price_change_percentage_24h: -0.65, market_cap: 3800000000, total_volume: 165000000, image: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png' }
];

let cryptoData = [];
let filteredData = [];
let updateCount = 0;

// Utility functions
function formatNumber(num) {
    if (num >= 1e12) return '$' + (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return '$' + (num / 1e3).toFixed(2) + 'K';
    return '$' + num.toFixed(2);
}

function formatPrice(price) {
    if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 0.01) return price.toFixed(4);
    if (price >= 0.0001) return price.toFixed(6);
    return price.toFixed(8);
}

function simulatePriceChange(currentPrice, volatility = 0.3) {
    const changePercent = (Math.random() - 0.5) * volatility * 2;
    return currentPrice * (1 + changePercent / 100);
}

function initializeCryptoData() {
    cryptoData = INITIAL_CRYPTO_DATA.map(coin => ({
        ...coin,
        previousPrice: coin.current_price,
        priceDirection: 'neutral'
    }));
    filteredData = [...cryptoData];
    renderCryptoCards();
    updateMarketStats();
}

function updateMarketStats() {
    const totalMarketCap = cryptoData.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
    const total24hVolume = cryptoData.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
    document.getElementById('totalMarketCap').textContent = formatNumber(totalMarketCap);
    document.getElementById('total24hVolume').textContent = formatNumber(total24hVolume);
}

function updatePricesLive() {
    updateCount++;
    
    cryptoData = cryptoData.map(coin => {
        const previousPrice = coin.current_price;
        let volatility = 0.3;
        if (coin.symbol === 'BTC' || coin.symbol === 'ETH') volatility = 0.2;
        if (coin.symbol === 'DOGE' || coin.symbol === 'SHIB') volatility = 0.5;
        
        const newPrice = simulatePriceChange(coin.current_price, volatility);
        let priceDirection = 'neutral';
        if (newPrice > previousPrice) priceDirection = 'up';
        if (newPrice < previousPrice) priceDirection = 'down';
        
        const price24hAgo = coin.current_price / (1 + coin.price_change_percentage_24h / 100);
        const newChange24h = ((newPrice - price24hAgo) / price24hAgo) * 100;
        
        return {
            ...coin,
            previousPrice: coin.current_price,
            current_price: newPrice,
            price_change_percentage_24h: newChange24h,
            priceDirection
        };
    });
    
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filterCryptos(searchTerm);
    } else {
        filteredData = [...cryptoData];
        renderCryptoCards();
    }
    
    if (updateCount % 5 === 0) updateMarketStats();
    document.getElementById('lastUpdate').textContent = 'Just now';
}

function renderCryptoCards() {
    const grid = document.getElementById('cryptoGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredData.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    grid.innerHTML = filteredData.map((coin, index) => {
        const isPositive = coin.price_change_percentage_24h >= 0;
        const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
        const bgChange = isPositive ? 'bg-green-500 bg-opacity-10' : 'bg-red-500 bg-opacity-10';
        const arrow = isPositive ? '↑' : '↓';
        const glowClass = index < 3 ? 'glow-effect' : '';
        let priceClass = 'price-neutral';
        if (coin.priceDirection === 'up') priceClass = 'price-up';
        if (coin.priceDirection === 'down') priceClass = 'price-down';
        
        return `
            <div class="crypto-card ${glowClass} bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <img src="${coin.image}" alt="${coin.name}" class="w-12 h-12 rounded-full shadow-lg" onerror="this.src='https://via.placeholder.com/64'">
                        <div>
                            <h3 class="font-display font-bold text-lg">${coin.name}</h3>
                            <p class="text-gray-400 text-sm font-mono uppercase">${coin.symbol}</p>
                        </div>
                    </div>
                    ${index < 3 ? `<span class="rank-badge">#${index + 1}</span>` : `<span class="text-gray-500 text-sm font-semibold">#${index + 1}</span>`}
                </div>
                <div class="mb-4">
                    <p class="text-3xl font-bold font-mono ${priceClass} transition-all duration-300" data-coin-id="${coin.id}">
                        $${formatPrice(coin.current_price)}
                    </p>
                </div>
                <div class="flex items-center gap-2 mb-4">
                    <span class="${bgChange} ${changeColor} px-3 py-1 rounded-lg text-sm font-semibold font-mono flex items-center gap-1">
                        <span>${arrow}</span>
                        <span>${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
                    </span>
                    <span class="text-gray-500 text-xs">24h</span>
                </div>
                <div class="border-t border-gray-700 pt-4 space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-400 text-sm">Market Cap</span>
                        <span class="font-mono font-semibold text-sm">${formatNumber(coin.market_cap)}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-400 text-sm">Volume (24h)</span>
                        <span class="font-mono font-semibold text-sm">${formatNumber(coin.total_volume)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterCryptos(searchTerm) {
    filteredData = cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderCryptoCards();
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterCryptos(searchTerm);
});

window.addEventListener('DOMContentLoaded', () => {
    initializeCryptoData();
    setInterval(updatePricesLive, 1000);
    console.log('✅ CryptoFlow initialized successfully!');
    console.log('📊 Tracking ' + cryptoData.length + ' cryptocurrencies');
    console.log('🔄 Live price updates every 1 second');
});