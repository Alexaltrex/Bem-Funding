export const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]

export type TradingHoursType = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
]

export interface IExchange {
    abbreviation: string
    fullName: {
        "ENG": string
        "TUR": string
    }
    contractSize: string
    marginPercent: string
    leverageNormal: string
    leverageSwing: string
    commission: string
    commissionType: string
    tradingHours: TradingHoursType
}

export interface IDataNewItem {
    marketName: {
        "ENG": string
        "TUR": string
    }
    exchanges: IExchange[]
}

//========= FOREX =========//
const forexTradingHours = [
    "00:05 - 23:55",
    "00:05 - 23:55",
    "00:05 - 23:55",
    "00:05 - 23:55",
    "00:05 - 23:55",
    "Trading is closed",
    "Trading is closed"
] as TradingHoursType

const forexData = {
    contractSize: "100,000",
    marginPercent: "1.0",
    leverageNormal: "1:100",
    leverageSwing: "1:30",
    commission: "4.0",
    commissionType: "USD/LOT",
    tradingHours: forexTradingHours
}

const forexAbbreviations = [
    "AUD/CAD",
    "AUD/CHF",
    "AUD/JPY",
    "AUD/NZD",
    "AUD/USD",
    "CAD/CHF",
    "CHF/JPY",
    "EUR/AUD",
    "EUR/CAD",
    "EUR/CHF",
    "EUR/GBP",
    "EUR/JPY",
    "EUR/NZD",
    "EUR/USD",
    "GBP/AUD",
    "GBP/CAD",
    "GBP/CHF",
    "GBP/JPY",
    "GBP/USD",
    "GBP/NZD",
    "NZD/CAD",
    "NZD/CHF",
    "NZD/JPY",
    "NZD/USD",
    "USD/CAD",
    "USD/CHF",
    "USD/JPY",
]

const forexFullNameEng = [
    "Australian Dollar vs Canadian Dollar",
    "Australian Dollar vs Swiss Franc",
    "Australian Dollar vs Japanese Yen",
    "Australian Dollar vs New Zealand Dollar",
    "Australian Dollar vs United States Dollar",
    "Canadian Dollar vs Swiss Franc",
    "Swiss Frank vs Japanese Yen",
    "Euro vs Australian Dollar",
    "Euro vs Canadian Dollar",
    "Euro vs Swiss Franc",
    "Euro vs British Pound",
    "Euro vs Japanese Yen",
    "Euro vs New Zealand Dollar",
    "Euro vs United States Dollar",
    "British Pound vs Australian Dollar",
    "British Pound vs Canadian Dollar",
    "British Pound vs Swiss Franc",
    "British Pound vs Japanese Yen",
    "British Pound vs United States Dollar",
    "British Pound vs New Zealand Dollar",
    "New Zealand Dollar vs Canadian Dollar",
    "New Zealand Dollar vs Swiss Franc",
    "New Zealand Dollar vs Japanese Yen",
    "New Zealand Dollar vs United States Dollar",
    "United States Dollar vs Canadian Dollar",
    "United States Dollar vs Swiss Franc",
    "United States Dollar vs Japanese Yen",
]

const forexFullNameTur = [
    "Avustralya Doları vs Kanada Doları",
    "Avustralya Doları vs İsviçre Frangı",
    "Avustralya Doları vs Japon Yeni",
    "Avustralya Doları vs Yeni Zelanda Doları",
    "Avustralya Doları vs Amerikan Doları",
    "Kanada Doları vs İsviçre Frangı",
    "İsviçre Frangı vs Japon Yeni",
    "Euro vs Avustralya Doları",
    "Euro vs Kanada Doları",
    "Euro vs İsviçre Frangı",
    "Euro vs İngiliz Sterlini",
    "Euro vs Japon Yeni",
    "Euro vs Yeni Zelanda Doları",
    "Euro vs Amerikan Doları",
    "İngiliz Sterlini vs Avustralya Doları",
    "İngiliz Sterlini vs Kanada Doları",
    "İngiliz Sterlini vs İsviçre Frangı",
    "İngiliz Sterlini vs Japon Yeni",
    "İngiliz Sterlini vs Amerikan Doları",
    "İngiliz Sterlini vs Yeni Zelanda Doları",
    "Yeni Zelanda Doları vs Kanada Doları",
    "Yeni Zelanda Doları vs İsviçre Frangı",
    "Yeni Zelanda Doları vs Japon Yeni",
    "Yeni Zelanda Doları vs Amerikan Doları",
    "Amerikan Doları vs Kanada Doları",
    "Amerikan Doları vs İsviçre Frangı",
    "Amerikan Doları vs Japon Yeni",
]

//========= EXOTICS =========//
const exoticsAbbreviations = [
    "EUR/CZK",
    "EUR/HUF",
    "EUR/NOK",
    "EUR/PLN",
    "USD/CZK",
    "USD/HKD",
    "USD/HUF",
    "USD/ILS",
    "USD/MXN",
    "USD/NOK",
    "USD/ZAR",
    "USD/SEK",
]
const exoticsFullNameEng = [
    "Euro vs Czech Republic Koruna",
    "Euro vs Hungarian Forint",
    "Euro vs Norwegian Krone",
    "Euro vs Polish Zloty",
    "United States Dollar vs Czech Republic Koruna",
    "United States Dollar vs Hong Kong Dollar",
    "United States Dollar vs Hungarian Forint",
    "United States Dollar vs Israeli Shekel",
    "United States Dollar vs Mexican Peso",
    "United States Dollar vs Norwegian Krone",
    "United States Dollar vs South African Rand",
    "United States Dollar vs Swedish Krona",
]
const exoticsFullNameTur = [
    "Euro vs Çek Cumhuriyeti Korunası",
    "Euro vs Macar Forinti",
    "Euro vs Norveç Kronu",
    "Euro vs Polonya Zlotisi",
    "ABD Doları vs Çek Cumhuriyeti Korunası",
    "ABD Doları vs Hong Kong Doları",
    "ABD Doları vs Macar Forinti",
    "ABD Doları vs İsrail Şekeli",
    "ABD Doları vs Meksika Pesosu",
    "ABD Doları vs Norveç Kronu",
    "ABD Doları vs Güney Afrika Randı",
    "ABD Doları vs İsveç Kronu",
]

//========= CASH =========//
const cashAbbreviations = [
    "AUS200",
    "US30",
    "EU50",
    "GER40",
    "HK50",
    "JP225",
    "US500",
    "UK100",
    "UKOIL",
    "USOIL",
]
const cashFullNameEng = [
    "Australia 200 Index",
    "United States 30 Index",
    "Euro Stoxx 50 Index",
    "German 40 Index",
    "Hong Kong Index",
    "Japan 225 Index",
    "US 500 Index",
    "UK 100 Index",
    "Crude Oil Brent Cash",
    "West Texas Intermediate Crude Oil",
]
const cashFullNameTur = [
    "Avustralya 200 Endeksi",
    "ABD 30 Endeksi",
    "Euro Stoxx 50 Endeksi",
    "Almanya 40 Endeksi",
    "Hong Kong Endeksi",
    "Japonya 225 Endeksi",
    "ABD 500 Endeksi",
    "İngiltere 100 Endeksi",
    "Crude Oil Brent Cash",
    "West Texas Intermediate Crude Oil",
]
const cashContractSize = [
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "100",
    "100",
]
const cashMarginPercent = [
    "2.00",
    "2.00",
    "2.00",
    "2.00",
    "2.00",
    "2.00",
    "2.00",
    "2.00",
    "3.33",
    "3.33",
]
const cashLeverageNormal = [
    "1:50",
    "1:50",
    "1:50",
    "1:50",
    "1:50",
    "1:50",
    "1:50",
    "1:50",
    "1:30",
    "1:30",
]
const cashLeverageSwing = [
    "1:15",
    "1:15",
    "1:15",
    "1:15",
    "1:15",
    "1:15",
    "1:15",
    "1:15",
    "1:9",
    "1:9",
]
const cashTradingHours = [
    "01:05 - 23:50",
    "01:05 - 23:50",
    "01:05 - 23:50",
    "01:05 - 23:50",
    "01:05 - 23:50",
    "01:05 - 23:50",
    "01:05 - 23:50",
    "01:05 - 23:50",
    "03:05 - 23:50",
    "01:05 - 23:50",
] as TradingHoursType

//========= METALS =========//
const metalsAbbreviations = [
    "XAG/USD",
    "XAU/USD",
    "XPD/USD",
    "XPT/USD",
]
const metalsFullNameEng = [
    "Silver Spot vs United States Dollar",
    "Gold Spot vs United States Dollar",
    "Palladium Spot vs United States Dollar",
    "Platinum Spot vs United States Dollar",
]
const metalsFullNameTur = [
    "Gümüş Spot vs ABD Doları",
    "Altın Spot vs ABD Doları",
    "Paladyum Spot vs ABD Doları",
    "Platin Spot vs ABD Doları",
]
const metalsContractSize = [
    "5000",
    "100",
    "1",
    "1",
]

//========= CRYPTO =========//
const cryptoAbbreviations = [
    "BTC/USD",
    "ADA/USD",
    "ETHJ/USD",
    "DOT/USD",
    "LTC/USD",
    "BNB/USD",
    "SOL/USD",
    "XRP/USD",
    "DOGE/USD",
]
const cryptoFullNameEng = [
    "Bitcoin",
    "Cardano",
    "Ethereum",
    "Polkadot",
    "Litecoin",
    "Binance Coin",
    "Solana",
    "Ripple",
    "Dogecoin",
]
const cryptoFullNameTur = [
    "Bitcoin",
    "Cardano",
    "Ethereum",
    "Polkadot",
    "Litecoin",
    "Binance Coin",
    "Solana",
    "Ripple",
    "Dogecoin",
]
const cryptoMarginPercent = [
    "20",
    "30",
    "20",
    "30",
    "30",
    "30",
    "30",
    "30",
    "30",
]
const cryptoLeverageNormal = [
    "1:5",
    "1:3.3",
    "1:5",
    "1:3.3",
    "1:3.3",
    "1:3.3",
    "1:3.3",
    "1:3.3",
    "1:3.3",
]
const cryptoTradingHours = [
    "00:05 - 23:55",
    "00:05 - 23:55",
    "00:05 - 23:55",
    "00:05 - 23:55",
    "00:05 - 23:59",
    "00:05 - 23:55",
    "00:05 - 23:55",
    "00:05 - 23:55",
    "00:05 - 23:55",
] as TradingHoursType

//========= DATA =========//
export const dataNew: IDataNewItem[] = [
    // Forex
    {
        marketName: {
            "ENG": "Forex",
            "TUR": "Forex",
        },
        exchanges: forexAbbreviations.map((abbreviation, key) => ({
            abbreviation,
            fullName: {
                "ENG": forexFullNameEng[key],
                "TUR": forexFullNameTur[key],
            },
            ...forexData
        }))
    },
    // Exotics
    {
        marketName: {
            "ENG": "Exotics",
            "TUR": "Egzotikler",
        },
        exchanges: exoticsAbbreviations.map((abbreviation, key) => ({
            abbreviation,
            fullName: {
                "ENG": exoticsFullNameEng[key],
                "TUR": exoticsFullNameTur[key],
            },
            ...forexData
        }))
    },
    // Cash CFD
    {
        marketName: {
            "ENG": "Cash CFD",
            "TUR": "Cash CFD",
        },
        exchanges: cashAbbreviations.map((abbreviation, key) => ({
            abbreviation,
            fullName: {
                "ENG": cashFullNameEng[key],
                "TUR": cashFullNameTur[key],
            },
            contractSize: cashContractSize[key],
            marginPercent: cashMarginPercent[key],
            leverageNormal: cashLeverageNormal[key],
            leverageSwing: cashLeverageSwing[key],
            commission: "0",
            commissionType: "",
            tradingHours: [
                cashTradingHours[key],
                cashTradingHours[key],
                cashTradingHours[key],
                cashTradingHours[key],
                cashTradingHours[key],
                "Trading is closed",
                "Trading is closed"
            ] as TradingHoursType
        })),
    },
    // Metals CFD
    {
        marketName: {
            "ENG": "Metals CFD",
            "TUR": "Metals CFD",
        },
        exchanges: metalsAbbreviations.map((abbreviation, key) => ({
            abbreviation,
            fullName: {
                "ENG": metalsFullNameEng[key],
                "TUR": metalsFullNameTur[key],
            },
            contractSize: metalsContractSize[key],
            marginPercent: "3.33",
            leverageNormal: "1:30",
            leverageSwing: "1:9",
            commission: "0.001",
            commissionType: "Percent/Volume",
            tradingHours: [
                "01:05 - 23:50",
                "01:05 - 23:50",
                "01:05 - 23:50",
                "01:05 - 23:50",
                "01:05 - 23:50",
                "Trading is closed",
                "Trading is closed"
            ] as TradingHoursType
        }))
    },
    // Crypto
    {
        marketName: {
            "ENG": "Crypto",
            "TUR": "Kripto",
        },
        exchanges: cryptoAbbreviations.map((abbreviation, key) => ({
            abbreviation,
            fullName: {
                "ENG": cryptoFullNameEng[key],
                "TUR": cryptoFullNameTur[key],
            },
            contractSize: "1",
            marginPercent: cryptoMarginPercent[key],
            leverageNormal: cryptoLeverageNormal[key],
            leverageSwing: cryptoLeverageNormal[key],
            commission: "0.025",
            commissionType: "Percent/Volume",
            tradingHours: [
                cryptoTradingHours[key],
                cryptoTradingHours[key],
                cryptoTradingHours[key],
                cryptoTradingHours[key],
                cryptoTradingHours[key],
                "Trading is closed",
                "Trading is closed"
            ] as TradingHoursType
        }))
    },


]