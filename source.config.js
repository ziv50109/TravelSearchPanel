import { resolve } from 'path';

const env = process.env.ENV || 'dev';
let sourcePath;

const soucreConfig = {
    // 本地測試環境
    'dev': {
        // 團體
        'travel': {
            'place': './json/TRS1NEWTRAVEL.js',
        },
        // 機票.國際機票
        'flight.international': {
            'place': './json/flightsInternationalDestinationCsutomMenu.js',
            'placeAutoComplete': './json/getarraytkt6.js',
            'filter': './json/country.json'
        },
        // 機票.中國機票
        'flight.chinese': {
            'place': './json/GetArrayTkt5.js'
        },
        // 機票.台灣機票
        'flight.taiwan': {
            'place': './json/twflightdest.json'
        },
        // 訂房
        'hotel': {
            'destination': './json/hotelMenu.json',
            'destinationAutoComplete': 'https://hotel.liontravel.com/search/keyword' // keyword
        },
        // 自由行.動態自由行
        'vacation.personal': {
            'departure': './json/vacationDeparture.json',
            'destination': './json/vacationdata.json',
            'destinationAutoComplete': 'https:////vacation.liontravel.com/ajax/getdestination', // *動態自由行第二組搜尋 API. keyWord
            'keyword': 'https:////vacation.liontravel.com/search/keyword' // Destination(e.g. JP_TYO), sKeyWord
        },
        // 自由行.團體
        'vacation.group': {
            'place': './json/TRS1NEWTRAVELFIT.js'
        },
        // 自由行.台灣
        'vacation.taiwan': {
            'destination': './json/freeTaiwan.js',
            'keyword': 'https://www.liontravel.com/webhl/gethotelnamelist.ashx' // citycode(e.g. TPE), countrycode(e.g. TW)
        },
        // 主題旅遊
        'themeTravel': {
            'place': './json/TRS1PSUBJECT.js'
        }
    },
    // 測試機環境
    'rel': {
        // 團體
        'travel': {
            'place': '//uwww.liontravel.com/_shared/lightspeed/searchpanel/data/TRS1NEWTRAVEL.js'
        },
        // 機票.國際機票
        'flight.international': {
            'place': '//uflight.liontravel.com/_shared/bundle/js/searchengine/flightsinternationaldestinationcsutommenu.js',
            'placeAutoComplete': '//uflight.liontravel.com/_shared/json/getarraytkt6.js',
            'filter': '//uflight.liontravel.com/_shared/lightspeed/searchpanel/data/country.json'
        },
        // 機票.中國機票
        'flight.chinese': {
            'place': '//uwww.liontravel.com/WebSearch/Scripts/GetArrayTkt5.ashx?Species=F'
        },
        // 機票.台灣機票
        'flight.taiwan': {
            'place': '//uwww.liontravel.com/_shared/bundle/js/searchengine/twflightdest.json'
        },
        // 訂房
        'hotel': {
            'destination': '//uwww.liontravel.com/_shared/bundle/js/searchengine/hotelCustomMenu.js',
            'destinationAutoComplete': '//uhotel.liontravel.com/search/keyword' // keyword
        },
        // 自由行.動態自由行
        'vacation.personal': {
            'departure': '//uvacation.liontravel.com/gendata/jsondata/departuretw',
            'destination': '//uvacation.liontravel.com/gendata/jsondata/destination',
            'destinationAutoComplete': '//uvacation.liontravel.com/ajax/getdestination', // *動態自由行第二組搜尋 API. keyWord
            'keyword': '//uvacation.liontravel.com/search/keyword' // Destination(e.g. JP_TYO), sKeyWord
        },
        // 自由行.團體
        'vacation.group': {
            'place': '//uwww.liontravel.com/_shared/lightspeed/searchpanel/data/TRS1NEWTRAVELFIT.js'
        },
        // 自由行.台灣
        'vacation.taiwan': {
            'destination': '//uwww.liontravel.com/_shared/bundle/js/searchengine/freeTaiwan.js',
            'keyword': '//uwww.liontravel.com/webhl/gethotelnamelist.ashx' // citycode(e.g. TPE), countrycode(e.g. TW)
        },
        // 主題旅遊
        'themeTravel': {
            'place': '//uwww.liontravel.com/WebSearch/Scripts/Array/TRS1PSUBJECT.js'
        }
    },
    // 正式機環境
    'prod': {
        // 團體
        'travel': {
            'place': '//www.liontravel.com/_shared/lightspeed/searchpanel/data/TRS1NEWTRAVEL.js'
        },
        // 機票.國際機票
        'flight.international': {
            'place': '//flight.liontravel.com/_shared/bundle/js/searchengine/flightsinternationaldestinationcsutommenu.js',
            'placeAutoComplete': '//flight.liontravel.com/_shared/json/getarraytkt6.js',
            'filter': '//flight.liontravel.com/_shared/lightspeed/searchpanel/data/country.json'
        },
        // 機票.中國機票
        'flight.chinese': {
            'place': '//www.liontravel.com/WebSearch/Scripts/GetArrayTkt5.ashx?Species=F'
        },
        // 機票.台灣機票
        'flight.taiwan': {
            'place': '//www.liontravel.com/_shared/bundle/js/searchengine/twflightdest.json'
        },
        // 訂房
        'hotel': {
            'destination': '//www.liontravel.com/_shared/bundle/js/searchengine/hotelCustomMenu.js',
            'destinationAutoComplete': '//hotel.liontravel.com/search/keyword' // keyword
        },
        // 自由行.動態自由行
        'vacation.personal': {
            'departure': '//vacation.liontravel.com/gendata/jsondata/departuretw',
            'destination': '//vacation.liontravel.com/gendata/jsondata/destination',
            'destinationAutoComplete': '//vacation.liontravel.com/ajax/getdestination', // *動態自由行第二組搜尋 API. keyWord
            'keyword': '//vacation.liontravel.com/search/keyword' // Destination(e.g. JP_TYO), sKeyWord
        },
        // 自由行.團體
        'vacation.group': {
            'place': '//www.liontravel.com/_shared/lightspeed/searchpanel/data/TRS1NEWTRAVELFIT.js'
        },
        // 自由行.台灣
        'vacation.taiwan': {
            'destination': '//www.liontravel.com/_shared/bundle/js/searchengine/freeTaiwan.js',
            'keyword': '//www.liontravel.com/webhl/gethotelnamelist.ashx' // citycode(e.g. TPE), countrycode(e.g. TW)
        },
        // 主題旅遊
        'themeTravel': {
            'place': '//www.liontravel.com/WebSearch/Scripts/Array/TRS1PSUBJECT.js'
        }
    }
};

sourcePath = soucreConfig[env];

export const travel = sourcePath['travel'];
export const flightInternational = sourcePath['flight.international'];
export const flightChinese = sourcePath['flight.chinese'];
export const flightTaiwan = sourcePath['flight.taiwan'];
export const hotel = sourcePath['hotel'];
export const vacationPersonal = sourcePath['vacation.personal'];
export const vacationGroup = sourcePath['vacation.group'];
export const vacationTaiwan = sourcePath['vacation.taiwan'];
export const themeTravel = sourcePath['themeTravel'];

export default sourcePath;