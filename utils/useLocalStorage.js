/* eslint-disable no-throw-literal */
const useLocalStorage = ({ panel, methods, data }, cbfn) => {
    const panelKeys = [
        'travel',
        'internationalFlight', 'chineseFlight', 'taiwanFlight',
        'hotel',
        'personalVacation', 'groupVacation', 'taiwanVacation',
        'themeTravel',
        'activity'
    ];
    const queryKey = '_queryKey';
    const panelName = panel + queryKey;
    const prevDataStringify = localStorage.getItem(panelName);
    const prevData = JSON.parse(prevDataStringify);

    if (panelKeys.indexOf(panel) < 0) { throw `'${panel}' is not a panel name.` }

    const getData = () => {
        if (!prevDataStringify || !isJsonString(prevDataStringify)) {
            deleteData();
            return;
        }

        const jsonData = JSON.parse(prevDataStringify);
        if (typeof cbfn === 'function') { cbfn(jsonData) }
    };
    const postData = () => {
        const newData = Object.assign({}, prevData, data);
        const stringifyNewData = JSON.stringify(newData);

        if (!stringifyNewData) {
            throw `Data: '${data}' can't stringify.`;
        }

        localStorage.setItem(panelName, stringifyNewData);
        if (typeof cbfn === 'function') { cbfn(newData) }
    };
    const deleteData = () => {
        const newData = Object.assign({}, prevData);

        if (!Array.isArray(data)) {
            localStorage.removeItem(panelName);
            return;
        }

        data.forEach(item => delete newData[item]);

        const stringifyData = JSON.stringify(newData);
        localStorage.setItem(panelName, stringifyData);
        if (typeof cbfn === 'function') { cbfn(newData) }
    };
    const isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    switch (methods) {
        case 'get':
            getData();
            break;
        case 'post':
            postData();
            break;
        case 'delete':
            deleteData();
            break;
        default:
            throw `'${methods}' is undefined. You can use 'get', 'post', 'delete'.`;
    }
};
export default useLocalStorage;