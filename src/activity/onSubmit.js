import { toQueryString } from '../../utils/utils';

const targetUrl = 'http://uactivity.liontravel.com';


function onSubmit (panelState) {
    let url;
    if (panelState.Foreign === 1) {
        if (panelState.value) {
            url = {
                Foreign: panelState.Foreign,
                SearchCountryID: panelState.vLine,
                SearchCityID: panelState.vCity,
                OriginSearchText: panelState.text
            };

        } else {
            url = {
                Foreign: panelState.Foreign,
                SearchKeyword: panelState.txt,
                OriginSearchText: panelState.txt,
            };
        }
    }

    if (panelState.Foreign === 0) {
        if (panelState.value) {
            url = {
                Foreign: panelState.Foreign,
                SearchCountryID: panelState.vLine,
                SearchAreaID: panelState.vLinetravel,
                SearchCityID: panelState.vLinewebarea,
                OriginSearchText: panelState.text
            };
        } else {
            url = {
                Foreign: panelState.Foreign,
                SearchKeyword: panelState.txt,
                OriginSearchText: panelState.txt,
            };
        }
    }

    const queryString = toQueryString(url);
    console.log(targetUrl + '?' + encodeURIComponent(queryString));

    if (url.SearchKeyword === 'undefined') {
        return;
    } else {
        window.location.href = targetUrl + '?' + encodeURIComponent(queryString);
    }
}

export default onSubmit;