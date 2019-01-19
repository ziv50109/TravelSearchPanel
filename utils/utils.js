function fetchJsToObj (soure, callback) {
    fetch(soure, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            let newVariable = data.replace(/\r?\n|\r/g, '').replace(/(?:var|let|const)\s(\w+)\s=/g, '"$1":').replace(/;/g, ',').replace(/,$/g, '').replace(/'/g, '"');
            return JSON.parse('{' + newVariable + '}');
        }).then(DataObj => {
            callback(DataObj);
        });
}
function findHighestZIndex (elem) {
    const elems = document.getElementsByTagName(elem);
    let highest = 0;
    for (let i = 0; i < elems.length; i++) {
        const zindex = document.defaultView.getComputedStyle(elems[i], null).getPropertyValue('z-index');
        if ((zindex > highest) && (zindex !== 'auto')) {
            highest = zindex;
        }
    }
    return parseInt(highest, 10);
}

function getDomPosition (elem, property) {
    if (property === 'top') return elem.getBoundingClientRect()[property] + window.pageYOffset;
    return elem.getBoundingClientRect()[property];
}

function toQueryString (data) {
    let option = data;
    let string = '';
    let optionLength = Object.keys(option).length;
    let i = 0;
    for (let key in option) {
        if ((Object.prototype.hasOwnProperty.call(option, key))) {
            i++;
            if (i >= optionLength) {
                string += key + '=' + option[key];
            } else {
                string += key + '=' + option[key] + '&';
            }
        }
    }
    return string;
}

function getYearAndMonth (dateStr) {
    let [year, month] = dateStr.split('-');
    year = Number(year);
    month = Number(month);
    return [year, month];
}

function getNowMonth () {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1, 8).toISOString().slice(0, 7);
}

function addDate (startDate, plusDay) {
    const ONE_DAY = 86400000;
    const stringDate = (n) => (n < 10 ? '0' + n : String(n));

    const startDay = new Date(startDate).getTime();
    const newDate = new Date(startDay + ONE_DAY * plusDay);
    const year = stringDate(newDate.getFullYear());
    const month = stringDate(newDate.getMonth() + 1);
    const day = stringDate(newDate.getDate());
    const all = year + month + day;
    return [all, year, month, day];
}

function isJsonString (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const utils = {
    fetchJsToObj: fetchJsToObj,
    findHighestZIndex: findHighestZIndex,
    getDomPosition: getDomPosition,
    toQueryString: toQueryString,
    getYearAndMonth: getYearAndMonth,
    getNowMonth: getNowMonth,
    addDate: addDate,
    isJsonString: isJsonString
};

export { fetchJsToObj, findHighestZIndex, getDomPosition, toQueryString, getYearAndMonth, getNowMonth, addDate, isJsonString };
export { utils as default };