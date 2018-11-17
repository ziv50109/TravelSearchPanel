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

const utils = {
    fetchJsToObj: fetchJsToObj,
    findHighestZIndex: findHighestZIndex,
    getDomPosition: getDomPosition,
    toQueryString: toQueryString,
    getYearAndMonth: getYearAndMonth,
    getNowMonth: getNowMonth,
};

export { fetchJsToObj, findHighestZIndex, getDomPosition, toQueryString, getYearAndMonth, getNowMonth };
export { utils as default };