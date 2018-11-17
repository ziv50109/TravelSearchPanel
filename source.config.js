import { resolve } from 'path';

let sourcePath;

const soucreConfig = {
    'dev': {
        'flightSeo': {
            'dtm': resolve(__dirname, './_shared/json/flightsInternationalDestinationCsutomMenu.js'),
            'act': resolve(__dirname, './_shared/json/GetArrayTkt6.js'),
            'noPreferTrans': resolve(__dirname, './_shared/json/country.json')
        },
        'hotelSeo': {
            'dtm': resolve(__dirname, './_shared/json/hotelCustomMenu.json'),
            'act': resolve(__dirname, './_shared/json/source2.json'),
        }
    },
    'prod': {
        'flightSeo': {
            'dtm': './_shared/json/flightsInternationalDestinationCsutomMenu.js',
            'act': './_shared/json/GetArrayTkt6.js',
            'noPreferTrans': './_shared/json/country.json'
        },
        'hotelSeo': {
            'dtm': './_shared/json/hotelCustomMenu.json',
            'act': './_shared/json/source2.json',
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    sourcePath = soucreConfig.prod;
} else {
    sourcePath = soucreConfig.dev;
}


export const flightSeoPathConfig = sourcePath.flightSeo;
export const hotelSeoPathConfig = sourcePath.hotelSeo;
export default sourcePath;