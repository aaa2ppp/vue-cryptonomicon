const _tickers = [
  "Bitcoin",
  "BTC",
  "Ethereum",
  "ETH",
  "Binance Coin",
  "BNB",
  "Tether",
  "USDT",
  "Solana",
  "SOL",
  "Cardano",
  "ADA",
  "XRP",
  "XRP",
  "USD Coin",
  "USDC",
  "Polkadot",
  "DOT",
  "Dogecoin",
  "DOGE",
  "Avalanche",
  "AVAX",
  "SHIBA INU",
  "SHIB",
  "Terra",
  "LUNA",
  "Crypto.com Coin",
  "CRO",
  "Wrapped Bitcoin",
  "WBTC",
  "Litecoin",
  "LTC",
  "Binance USD",
  "BUSD",
  "Uniswap",
  "UNI",
  "Polygon",
  "MATIC",
  "Chainlink",
  "LINK",
  "Algorand",
  "ALGO",
  "Bitcoin Cash",
  "BCH",
  "Decentraland",
  "MANA",
  "Axie Infinity",
  "AXS",
  "Elrond",
  "EGLD",
  "Stellar",
  "XLM",
  "Internet Computer",
  "ICP",
  "VeChain",
  "VET",
  "TerraUSD",
  "UST",
  "FTX Token",
  "FTT",
  "Filecoin",
  "FIL",
  "TRON",
  "TRX",
  "THETA",
  "THETA",
  "The Sandbox",
  "SAND",
  "Dai",
  "DAI",
  "Ethereum Classic",
  "ETC",
  "Cosmos",
  "ATOM",
  "Hedera",
  "HBAR",
  "Bitcoin BEP2",
  "BTCB",
  "Fantom",
  "FTM",
  "NEAR Protocol",
  "NEAR",
  "Gala",
  "GALA",
  "Tezos",
  "XTZ",
  "The Graph",
  "GRT",
  "Monero",
  "XMR",
  "Helium",
  "HNT",
  "Flow",
  "FLOW",
  "IOTA",
  "MIOTA",
  "Loopring",
  "LRC",
  "EOS",
  "EOS",
  "Klaytn",
  "KLAY",
  "PancakeSwap",
  "CAKE",
  "Aave",
  "AAVE",
  "Zcash",
  "ZEC",
  "UNUS SED LEO",
  "LEO",
  "Enjin Coin",
  "ENJ",
  "Kusama",
  "KSM",
  "Maker",
  "MKR",
  "Harmony",
  "ONE",
  "Bitcoin SV",
  "BSV",
  "eCash",
  "XEC",
  "THORChain",
  "RUNE",
  "Chiliz",
  "CHZ",
  "Stacks",
  "STX",
  "Kadena",
  "KDA",
  "Amp",
  "AMP",
  "Neo",
  "NEO",
  "Quant",
  "QNT",
  "Basic Attention Token",
  "BAT",
  "Waves",
  "WAVES",
  "Holo",
  "HOT",
  "Curve DAO Token",
  "CRV",
  "BitTorrent",
  "BTT",
  "KuCoin Token",
  "KCS",
  "Arweave",
  "AR",
  "Dash",
  "DASH",
  "Compound",
  "COMP",
  "Celo",
  "CELO",
  "Theta Fuel",
  "TFUEL",
  "Huobi Token",
  "HT",
  "Qtum",
  "QTUM",
  "NEM",
  "XEM",
  "Immutable X",
  "IMX",
  "IoTeX",
  "IOTX",
  "Mina",
  "MINA",
  "OKB",
  "OKB",
  "Decred",
  "DCR",
  "Nexo",
  "NEXO",
  "WAX",
  "WAXP",
  "Horizen",
  "ZEN",
  "Ankr",
  "ANKR",
  "TrueUSD",
  "TUSD",
  "Siacoin",
  "SC",
  "Audius",
  "AUDIO",
  "Voyager Token",
  "VGX",
  "ICON",
  "ICX",
  "OMG Network",
  "OMG",
  "Oasis Network",
  "ROSE",
  "Livepeer",
  "LPT",
  "XDC Network",
  "XDC",
  "Ravencoin",
  "RVN",
  "BORA",
  "BORA",
  "yearn.finance",
  "YFI",
  "Zilliqa",
  "ZIL",
  "Hive",
  "HIVE",
  "Revain",
  "REV",
  "Storj",
  "STORJ",
  "0x",
  "ZRX",
  "renBTC",
  "RENBTC",
  "Bitcoin Gold",
  "BTG",
  "SushiSwap",
  "SUSHI",
  "Bancor",
  "BNT",
  "Pax Dollar",
  "USDP",
  "Celsius",
  "CEL",
  "Secret",
  "SCRT",
  "Synthetix",
  "SNX",
  "Velas",
  "VLX",
  "Ontology",
  "ONT",
  "Nervos Network",
  "CKB",
  "Ren",
  "REN",
  "Perpetual Protocol",
  "PERP",
  "UMA",
  "UMA",
  "CEEK VR",
  "CEEK",
  "Telcoin",
  "TEL",
  "Raydium",
  "RAY",
  "Dogelon Mars",
  "ELON",
  "Golem",
  "GLM",
  "Moonriver",
  "MOVR",
  "SKALE Network",
  "SKL",
  "IOST",
  "IOST",
  "Serum",
  "SRM",
  "Polymath",
  "POLY",
  "DigiByte",
  "DGB",
  "dYdX",
  "DYDX",
  "Kava",
  "KAVA",
  "SwissBorg",
  "CHSB",
  "XYO",
  "XYO",
  "Celer Network",
  "CELR",
  "Reserve Rights",
  "RSR",
  "1inch Network",
  "1INCH",
  "WINkLink",
  "WIN",
  "Nano",
  "NANO",
  "Ocean Protocol",
  "OCEAN",
  "OriginTrail",
  "TRAC",
  "NuCypher",
  "NU",
  "Ultra",
  "UOS",
  "Gnosis",
  "GNO",
  "MyNeighborAlice",
  "ALICE",
  "Casper",
  "CSPR",
  "Chromia",
  "CHR",
  "Fetch.ai",
  "FET",
  "DigitalBits",
  "XDB",
  "Neutrino USD",
  "USDN",
  "GateToken",
  "GT",
  "Injective Protocol",
  "INJ",
  "WOO Network",
  "WOO",
  "Mdex",
  "MDX",
  "Dvision Network",
  "DVI",
  "Cartesi",
  "CTSI",
  "Function X",
  "FX",
  "Dent",
  "DENT",
  "Syscoin",
  "SYS",
  "Request",
  "REQ",
  "Lisk",
  "LSK",
  "Swipe",
  "SXP",
  "Alpha Finance Lab",
  "ALPHA",
  "Fei USD",
  "FEI",
  "MediBloc",
  "MED",
  "COTI",
  "COTI",
  "Origin Protocol",
  "OGN",
  "Reef",
  "REEF",
  "Verge",
  "XVG",
  "WazirX",
  "WRX",
  "Status",
  "SNT",
  "Civic",
  "CVC",
  "NKN",
  "NKN",
  "Flux",
  "FLUX",
  "Bitcoin Standard Hashrate Token",
  "BTCST",
  "VeThor Token",
  "VTHO",
  "Ardor",
  "ARDR",
  "Orchid",
  "OXT",
  "BakeryToken",
  "BAKE",
  "Bitcoin Diamond",
  "BCD",
  "iExec RLC",
  "RLC",
  "Conflux",
  "CFX",
  "HUSD",
  "HUSD",
  "PAX Gold",
  "PAXG",
  "Polkastarter",
  "POLS",
  "Phantasma",
  "SOUL",
  "StormX",
  "STMX",
  "MX Token",
  "MX",
  "Ontology Gas",
  "ONG",
  "Powerledger",
  "POWR",
  "aelf",
  "ELF",
  "Energy Web Token",
  "EWT",
  "Badger DAO",
  "BADGER",
  "Unibright",
  "UBT",
  "Steem",
  "STEEM",
  "Band Protocol",
  "BAND",
  "Ark",
  "ARK",
];

const tickers = [];
for (let i = 0, j = 0; i < _tickers.length; i += 2) {
  tickers[j++] = { description: _tickers[i], name: _tickers[i + 1].toUpperCase() };
  tickers.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
}

const TIMEOUT = 3000;
const listeners = {}; // by tickerName
const oldPrices = {}; // by tickerName

// get price simulation
setInterval(() => {
  for (const tickerName in listeners) {
    const list = listeners[tickerName];

    let newPrice;
    if (!oldPrices[tickerName]) {
      newPrice = oldPrices[tickerName] = 100 * Math.random();
    } else {
      // we use three dice to get a "normal" distribution
      newPrice = (oldPrices[tickerName] * (100 + (Math.random() + Math.random() + Math.random()) / 3 - 0.5)) / 100;
      oldPrices[tickerName] = newPrice;
    }

    for (const listener of list) {
      // console.log("send price:", tickerName);
      listener(newPrice);
    }
  }
}, TIMEOUT);

export default {
  addListener(tickerName, listener) {
    if (!this.check(tickerName)) {
      return false;
    }
    let list = listeners[tickerName];
    if (!list) {
      list = listeners[tickerName] = [];
    } else if (list.indexOf(listener) != -1) {
      return true;
    }
    list.push(listener);
    return true;
  },

  removeListener(tickerName, listener) {
    const list = listeners[tickerName];
    if (!list) {
      return;
    }
    const i = list.indexOf(listener);
    if (i != -1) {
      list.splice(i, 1);
      return;
    }
  },

  removeAllListeners() {
    for (const tickerName in listeners) {
      listeners[tickerName] = [];
    }
  },

  filter(callback, count) {
    return tickers
      .filter((item) => callback(item.name, item.description))
      .slice(0, count)
      .map((item) => item.name);
  },

  check(name) {
    name = name.toUpperCase();
    return tickers.findIndex((item) => item.name == name) != -1;
  },
};
