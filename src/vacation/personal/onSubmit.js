// 個人自由行 PC 版 & M 版 按下送出後處裡的程式
import { toQueryString } from '../../../utils';

const targetUrl = 'https://vacation.liontravel.com/';

function onSubmit (panelState) {
    const {
        Departure,
        Destination,
        roomlist,
        roomage,
        Days,
        Airline,
        clskd,
        noTrans,
        Keywords,
        FromDate,
        ToDate,
        fthotel,
    } = panelState;

    if (!FromDate.length) {
        return alert('請輸入出發時間');
    }

    if (!ToDate.length) {
        return alert('請輸入回程時間');
    }

    if (!(Destination.length || Keywords.length)) {
        return alert('目的地或關鍵字擇一必填');
    }

    const queryData = {
        Departure,
        Destination,
        roomlist,
        roomage,
        Days,
        Airline,
        clskd,
        noTrans,
        Keywords,
        FromDate: FromDate.replace(/\-/g, ''),
        ToDate: ToDate.replace(/\-/g, ''),
        fthotel,
    };

    const queryString = toQueryString(queryData);
    window.location.href = `${targetUrl}?${queryString}`;
}


export default onSubmit;