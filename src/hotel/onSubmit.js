// 訂房 PC 版 & M 版 按下送出後處裡的程式
const targetUrl = 'https://hotel.liontravel.com/';
function toQueryString (data) {
    let option = data;
    let string = '';
    let optionLength = Object.keys(option).length;
    let i = 0;
    for (let key in option) {
        if ((Object.prototype.hasOwnProperty.call(option, key))) {
            i++;
            if (i >= optionLength) {
                string += '"' + key + '":"' + option[key] + '"';
            } else {
                string += '"' + key + '":"' + option[key] + '",';
            }
        }
    }
    return string;
}


function onSubmit (panelState) {
    const {
        Destination,
        Code,
        Kind,
        Txt,
        Rooms,
        Filter,
        CheckIn,
        CheckOut,
        hrefTarget
    } = panelState;

    Destination.Code = Code;
    Destination.Kind = Kind;
    Destination.Txt = Txt;

    if (!CheckIn.length) {
        return alert('請選擇住房期間、請輸入必填欄位喔！');
    }

    if (!CheckOut.length) {
        return alert('請輸入必填欄位喔！');
    }

    if (!(Destination.length || Txt.length)) {
        return alert('目的地或關鍵字擇一必填');
    }

    const Dates = {
        CheckIn: CheckIn.replace(/\-/g, '/'),
        CheckOut: CheckOut.replace(/\-/g, '/')
    };
    const queryStrDate = toQueryString(Dates) + ',';
    let roomDetial = Rooms.map((item) => {
        let itemStr = '';
        itemStr += `{"AdultQty":"${item.AdultQty}","ChildQty":"${item.ChildQty}","ChildAges":[${item.ChildAges.map((el) => (`"${el}"`))}]}`;
        return itemStr;
    });
    const queryStrRoom = '"Rooms":[' + roomDetial + '],';
    const queryStrFilter = '"Filter":{' + toQueryString(Filter) + '},';
    const queryStrDestn = '"Destination":{' + toQueryString(Destination) + '}';
    const queryString = encodeURIComponent('{' + queryStrDate + queryStrRoom + queryStrFilter + queryStrDestn + '}');

    window.open(`${targetUrl}search?searchParam=${queryString}`, hrefTarget);
}


export default onSubmit;