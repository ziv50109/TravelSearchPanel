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
        hrefTarget
    } = panelState;

    if (!FromDate.length) {
        return alert('請輸入出發日期');
    }

    if (!ToDate.length) {
        return alert('請輸入回程日期');
    }

    if (new Date(FromDate) > new Date(ToDate)) {
        return alert('出發日起日需小於迄日');
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
    window.open(`${targetUrl}?${queryString}`, hrefTarget);
}


export default onSubmit;