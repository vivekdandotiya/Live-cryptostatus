const INITIAL_CRYPTO_DATA = [
            {
                id: 'bitcoin',
                symbol: 'BTC',
                name: 'Bitcoin',
                current_price: 42580.50,
                price_change_percentage_24h: 2.45,
                market_cap: 835000000000,
                total_volume: 28500000000,
                image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
            },
            {
                id: 'ethereum',
                symbol: 'ETH',
                name: 'Ethereum',
                current_price: 2245.75,
                price_change_percentage_24h: -1.23,
                market_cap: 270000000000,
                total_volume: 15200000000,
                image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
            },
            {
                id: 'solana',
                symbol: 'SOL',
                name: 'Solana',
                current_price: 98.45,
                price_change_percentage_24h: 5.67,
                market_cap: 42000000000,
                total_volume: 2100000000,
                image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
            },
            {
                id: 'dogecoin',
                symbol: 'DOGE',
                name: 'Dogecoin',
                current_price: 0.08234,
                price_change_percentage_24h: -3.21,
                market_cap: 11500000000,
                total_volume: 845000000,
                image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png'
            },
            {
                id: 'cardano',
                symbol: 'ADA',
                name: 'Cardano',
                current_price: 0.5234,
                price_change_percentage_24h: 1.89,
                market_cap: 18400000000,
                total_volume: 425000000,
                image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png'
            },
            {
                id: 'ripple',
                symbol: 'XRP',
                name: 'XRP',
                current_price: 0.6145,
                price_change_percentage_24h: 4.32,
                market_cap: 33200000000,
                total_volume: 1850000000,
                image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png'
            },
            {
                id: 'polkadot',
                symbol: 'DOT',
                name: 'Polkadot',
                current_price: 7.23,
                price_change_percentage_24h: -2.15,
                market_cap: 9800000000,
                total_volume: 285000000,
                image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png'
            },
            {
                id: 'avalanche',
                symbol: 'AVAX',
                name: 'Avalanche',
                current_price: 36.78,
                price_change_percentage_24h: 3.67,
                market_cap: 13500000000,
                total_volume: 575000000,
                image: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png'
            },
            {
                id: 'chainlink',
                symbol: 'LINK',
                name: 'Chainlink',
                current_price: 14.52,
                price_change_percentage_24h: 1.45,
                market_cap: 8200000000,
                total_volume: 425000000,
                image: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png'
            },
            {
                id: 'polygon',
                symbol: 'MATIC',
                name: 'Polygon',
                current_price: 0.8456,
                price_change_percentage_24h: -1.87,
                market_cap: 7800000000,
                total_volume: 385000000,
                image: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png'
            },
            {
                id: 'litecoin',
                symbol: 'LTC',
                name: 'Litecoin',
                current_price: 72.34,
                price_change_percentage_24h: 2.11,
                market_cap: 5400000000,
                total_volume: 425000000,
                image: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png'
            },
            {
                id: 'shiba-inu',
                symbol: 'SHIB',
                name: 'Shiba Inu',
                current_price: 0.00000945,
                price_change_percentage_24h: -4.56,
                market_cap: 5600000000,
                total_volume: 285000000,
                image: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png'
            },
            {
                id: 'uniswap',
                symbol: 'UNI',
                name: 'Uniswap',
                current_price: 6.78,
                price_change_percentage_24h: 1.23,
                market_cap: 5100000000,
                total_volume: 185000000,
                image: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png'
            },
            {
                id: 'stellar',
                symbol: 'XLM',
                name: 'Stellar',
                current_price: 0.1234,
                price_change_percentage_24h: 0.89,
                market_cap: 3500000000,
                total_volume: 125000000,
                image: 'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png'
            },
            {
                id: 'cosmos',
                symbol: 'ATOM',
                name: 'Cosmos',
                current_price: 9.87,
                price_change_percentage_24h: -0.65,
                market_cap: 3800000000,
                total_volume: 165000000,
                image: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png'
            }
        ];

        // Store for cryptocurrency data
        let cryptoData = [];
        let filteredData = [];
        let updateCount = 0;