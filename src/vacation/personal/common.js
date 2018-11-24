// 個人自由行PC版&M版共用js
import React from 'react';

const CloseButton = ({ onClick }) => (
    <button
        className="close_btn"
        onClick={onClick}
    >
        X
    </button>
);

// 快速選單調整fetch到的資料格式
function transformFetchData (data) {
    const dataObj = {
        Line: {},
        Country: {},
        City: {},
    };
    const {
        Line,
        City,
        Country,
    } = data;

    Line.forEach(element => {
        const value = element.Line;
        const text = element.LineName;
        dataObj.Line[value] = text;
        dataObj.Country[value] = {};
    });
    Country.forEach(element => {
        const parent = element.Line;
        const CountryList = element.CountryList;
        CountryList.forEach(elem => {
            const value = elem.Country;
            const text = elem.CountryName;
            dataObj.Country[parent][value] = text;
            dataObj.City[value] = {};
        });
    });
    City.forEach(element => {
        const parent = element.Country;
        const CityList = element.CityList;
        CityList.forEach(elem => {
            const {
                City,
                CityName,
                CityEName,
            } = elem;
            const text = `${CityName}(${CityEName})${City}`;
            dataObj.City[parent][City] = text;
        });
    });

    return dataObj;
}

// 補字選單調整fetch到的資料格式
function transformActFetchData (data) {
    const {
        Line,
        City,
        Country,
    } = data;
    const dataArray = [];

    for (let i = 0; i < Line.length; i++) {
        const line = Line[i]; // 線別
        const CountryList = Country[i].CountryList;
        for (let j = 0; j < CountryList.length; j++) {
            const {
                Country,
                CountryName,
            } = CountryList[j];
            const cityList = City.filter(v => v.Country === Country)[0].CityList;
            for (let k = 0; k < cityList.length; k++) {
                const {
                    City,
                    CityName,
                    CityEName,
                } = cityList[k];
                const dataObj = {
                    Line: line.Line,
                    Country,
                    City,
                    level3: `${Country}-${City}`, // act-rajx的Key
                    level2: 'only', // act-rajx分區區域用的
                    txt: `${CityName}(${CityEName})${City}-${CountryName}`,
                };
                dataArray.push(dataObj);
            }
        }
    }

    return dataArray;
}
// AiportData 資料重組
function transformArpData (data) {
    let dataObj = {
        Line: '',
        Country: '',
        City: '',
        level3: '',
        level2: '機場',
        Airport: '',
        txt: ''
    };
    const arr = [];
    if (typeof data === 'object') {
        data.Airport.forEach(item => {
            item.AirportList.forEach(ele => {
                dataObj = {};
                const country = item.City;
                dataObj.Airport = ele.Airport;
                dataObj.Line = '';
                dataObj.Country = '';
                dataObj.City = country;
                dataObj.level3 = ele.Airport;
                dataObj.level2 = item.level2 ? item.level2 : '機場';
                dataObj.txt = `${ele.AirportName} (${ele.AirportEName})`;
                arr.push(dataObj);
            });
        });
    }
    return arr;
}
function transformRawProductData (data) {
    let arr = [];
    let dataObj = {
        Line: '',
        Country: '',
        City: '',
        level3: '',
        level2: '',
        Airport: '',
        txt: ''
    };
    if (typeof data === 'object') {
        data.Destinations.forEach(ele => {
            dataObj = {};
            const level2 = ele.Airport ? '機場' : '城市';
            dataObj.Airport = ele.Airport ? ele.Airport : '';
            dataObj.Line = ele.line;
            dataObj.Country = ele.country;
            dataObj.City = ele.city;
            dataObj.level3 = ele.city;
            dataObj.level2 = ele.level2 ? ele.level2 : level2;
            dataObj.txt = ele.Name;
            arr.push(dataObj);
        });
    }
    console.log(arr);
    return arr;
}
// 航空公司下拉options
const airLineOptions = [
    {
        text: '不限',
        value: '',
    },
    {
        text: 'BR - 長榮航空',
        value: 'BR',
    },
    {
        text: 'MU - 中國東方航空',
        value: 'MU',
    },
    {
        text: 'DL - 達美航空',
        value: 'DL',
    },
    {
        text: 'HX - 香港航空',
        value: 'HX',
    },
    {
        text: 'CX - 國泰航空',
        value: 'CX',
    },
    {
        text: 'KA - 港龍航空',
        value: 'KA',
    },
    {
        text: 'NH - 全日空航空',
        value: 'NH',
    },
    {
        text: 'OZ - 韓亞航空',
        value: 'OZ',
    },
    {
        text: 'CI - 中華航空',
        value: 'CI',
    },
    {
        text: 'NX - 澳門航空',
        value: 'NX',
    },
    {
        text: 'JL - 日本航空',
        value: 'JL',
    },
];

// 艙等下拉options
const clskdOptions = [
    {
        text: '不限',
        value: 3,
    },
    {
        text: '經濟艙',
        value: 0,
    },
    {
        text: '商務艙',
        value: 1,
    },
    {
        text: '頭等艙',
        value: 2,
    },
];

// 旅遊天數下拉options
const daysOptions = [
    {
        text: '不限',
        value: '',
    },
    {
        text: '2天',
        value: 2,
    },
    {
        text: '3天',
        value: 3,
    },
    {
        text: '4天',
        value: 4,
    },
    {
        text: '5天',
        value: 5,
    },
    {
        text: '6天',
        value: 6,
    },
    {
        text: '7天',
        value: 7,
    },
    {
        text: '8天以上',
        value: 8,
    },
];

// 間數options
const roomCount = [
    {
        text: '共1間',
        value: 1,
    },
    {
        text: '共2間',
        value: 2,
    },
    {
        text: '共3間',
        value: 3,
    },
    {
        text: '共4間',
        value: 4,
    },
    {
        text: '共5間',
        value: 5,
    },
    {
        text: '共6間',
        value: 6,
    },
    {
        text: '共7間',
        value: 7,
    }
];

export {
    transformFetchData,
    transformActFetchData,
    transformArpData,
    transformRawProductData,
    airLineOptions,
    clskdOptions,
    daysOptions,
    roomCount,
    CloseButton,
};