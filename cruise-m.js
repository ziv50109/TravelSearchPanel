(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{317:function(n,e,t){"use strict";t.d(e,"b",function(){return i}),t.d(e,"g",function(){return c}),t.d(e,"d",function(){return o}),t.d(e,"c",function(){return l}),t.d(e,"e",function(){return s}),t.d(e,"f",function(){return u}),t.d(e,"a",function(){return p});var r=t(336),a=t.n(r);function i(n,e){fetch(n,{method:"GET"}).then(function(n){return n.text()}).then(function(n){var e=n.replace(/\r?\n|\r/g,"").replace(/(?:var|let|const)\s(\w+)\s=/g,'"$1":').replace(/;/g,",").replace(/,$/g,"").replace(/'/g,'"');return JSON.parse("{"+e+"}")}).then(function(n){e(n)})}function c(n){var e=n,t="",r=Object.keys(e).length,a=0;for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t+=r<=++a?i+"="+e[i]:i+"="+e[i]+"&");return t}function o(n){var e=n.split("-"),t=a()(e,2),r=t[0],i=t[1];return[r=Number(r),i=Number(i)]}function l(){return new Date((new Date).getFullYear(),(new Date).getMonth(),1,8).toISOString().slice(0,7)}function s(n){try{JSON.parse(n)}catch(n){return!1}return!0}function u(n){var e=/^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/;if(!e.test(n))return!1;var t=n.match(e),r=parseInt(t[1],10),a=parseInt(t[2],10),i=parseInt(t[3],10),c=[31,28,31,30,31,30,31,31,30,31,30,31];return(r%400==0||r%100!=0&&r%4==0)&&(c[1]=29),i<=c[a-1]}var p={fetchJsToObj:i,findHighestZIndex:function(n){for(var e=document.getElementsByTagName(n),t=0,r=0;r<e.length;r++){var a=document.defaultView.getComputedStyle(e[r],null).getPropertyValue("z-index");t<a&&"auto"!==a&&(t=a)}return parseInt(t,10)},getDomPosition:function(n,e){return"top"===e?n.getBoundingClientRect()[e]+window.pageYOffset:n.getBoundingClientRect()[e]},toQueryString:c,getYearAndMonth:o,getNowMonth:l,addDate:function(n,e){var t=function(n){return n<10?"0"+n:String(n)},r=new Date(n).getTime(),a=new Date(r+864e5*e),i=t(a.getFullYear()),c=t(a.getMonth()+1),o=t(a.getDate());return[i+c+o,i,c,o]},isJsonString:s,isLeapYear:u}},326:function(n,e,t){"use strict";var r=t(317),a=t(330),i=t(325),c=t.n(i),o=t(333),l=t.n(o),s=t(318),u=t.n(s),p=t(319),d=t.n(p),m=t(320),h=t.n(m),f=t(321),v=t.n(f),_=t(322),g=t.n(_),b=t(323),w=t.n(b),x=t(324),y=t.n(x),k=t(16),D=t.n(k),S=t(117),E=t.n(S),C=function(n){function e(n){var t;return u()(this,e),t=h()(this,v()(e).call(this,n)),y()(w()(w()(t)),"handle",function(n){if(t.isClickInSide)t.isClickInSide=!1;else if("touchend"===n.type&&(t.isTouch=!0),"click"!==n.type||!t.isTouch){var e=t.props.onClickOutside;!1===t.isUnMounted&&e(n)}}),y()(w()(w()(t)),"handleClick",function(){t.isClickInSide=!0}),t.isTouch=!1,t.isClickInSide=!1,t.isUnMounted=!1,t}return g()(e,n),d()(e,[{key:"componentDidMount",value:function(){document.addEventListener("touchend",this.handle,!1),document.addEventListener("click",this.handle,!1)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("touchend",this.handle,!1),document.removeEventListener("click",this.handle,!1)}},{key:"render",value:function(){var n=this.props,e=n.children,t=(n.onClickOutside,l()(n,["children","onClickOutside"]));return D.a.createElement("div",c()({},t,{onClick:this.handleClick}),e)}}]),e}(k.Component);y()(C,"propTypes",{onClickOutside:E.a.func.isRequired});var L=t(329);t.d(e,"b",function(){return r.a}),t.d(e,"c",function(){return r.b}),t.d(e,"h",function(){return r.g}),t.d(e,"e",function(){return r.d}),t.d(e,"d",function(){return r.c}),t.d(e,"f",function(){return r.e}),t.d(e,"g",function(){return r.f}),t.d(e,"a",function(){return a.a}),t.d(e,"i",function(){return L.a})},329:function(n,e,t){"use strict";var r=t(325),a=t.n(r);e.a=function(n,e){var t=n.panel,r=n.methods,i=n.data,c=t+"_queryKey",o=localStorage.getItem(c),l=JSON.parse(o);if(["travel","internationalFlight","chineseFlight","taiwanFlight","hotel","personalVacation","groupVacation","taiwanVacation","themeTravel","cruise","highSpeedRail","activity"].indexOf(t)<0)throw"'".concat(t,"' is not a panel name.");var s=function(){var n=a()({},l);if(Array.isArray(i)){i.forEach(function(e){return delete n[e]});var t=JSON.stringify(n);localStorage.setItem(c,t),"function"==typeof e&&e(n)}else localStorage.removeItem(c)};switch(r){case"get":!function(){if(o&&function(n){try{JSON.parse(n)}catch(n){return!1}return!0}(o)){var n=JSON.parse(o);"function"==typeof e&&e(n)}else s()}();break;case"post":!function(){var n=a()({},l,i),t=JSON.stringify(n);if(!t)throw"Data: '".concat(i,"' can't stringify.");localStorage.setItem(c,t),"function"==typeof e&&e(n)}();break;case"delete":s();break;default:throw"'".concat(r,"' is undefined. You can use 'get', 'post', 'delete'.")}}},330:function(n,e,t){"use strict";t.d(e,"a",function(){return C});var r=t(325),a=t.n(r),i=t(333),c=t.n(i),o=t(318),l=t.n(o),s=t(319),u=t.n(s),p=t(320),d=t.n(p),m=t(321),h=t.n(m),f=t(322),v=t.n(f),_=t(323),g=t.n(_),b=t(324),w=t.n(b),x=t(16),y=t.n(x),k=t(57),D=t.n(k),S=t(117),E=t.n(S),C=function(n){function e(n){var t;return l()(this,e),t=d()(this,h()(e).call(this,n)),w()(g()(g()(t)),"handle",function(n){if(!t.__domNode.contains(n.target)){var e=t.props.onClickOutside;"function"==typeof e&&e(n)}}),t.isTouch=!1,t.isClickInSide=!1,t.isUnMounted=!1,t.__domNode=null,t.__wrappedInstance=null,t}return v()(e,n),u()(e,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handle,!0)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("click",this.handle,!0)}},{key:"render",value:function(){var n=this,e=this.props,t=e.children,r=(e.onClickOutside,c()(e,["children","onClickOutside"]));return y.a.createElement("div",a()({},r,{ref:function(e){n.__domNode=D.a.findDOMNode(e),n.__wrappedInstance=e}}),t)}}]),e}(x.Component);w()(C,"propTypes",{onClickOutside:E.a.func.isRequired})},331:function(n,e,t){"use strict";t.d(e,"g",function(){return a}),t.d(e,"c",function(){return i}),t.d(e,"b",function(){return c}),t.d(e,"d",function(){return o}),t.d(e,"e",function(){return l}),t.d(e,"i",function(){return s}),t.d(e,"h",function(){return u}),t.d(e,"j",function(){return p}),t.d(e,"k",function(){return d}),t.d(e,"f",function(){return m}),t.d(e,"a",function(){return h}),t(344);var r,a=(r={travel:{place:"./json/TRS1NEWTRAVEL.js"},"flight.international":{place:"./json/flightsInternationalDestinationCsutomMenu.js",placeAutoComplete:"./json/getarraytkt6.js",filter:"./json/country.json"},"flight.chinese":{place:"./json/GetArrayTkt5.js"},"flight.taiwan":{place:"./json/twflightdest.json"},hotel:{destination:"./json/hotelMenu.json",destinationAutoComplete:"https://hotel.liontravel.com/search/keyword"},"vacation.personal":{departure:"./json/vacationDeparture.json",destination:"./json/vacationdata.json",destinationAutoComplete:"https://vacation.liontravel.com/ajax/getdestination",keyword:"https://vacation.liontravel.com/search/keyword"},"vacation.group":{place:"./json/TRS1NEWTRAVELFIT.js"},"vacation.taiwan":{destination:"./json/freeTaiwan.js",keyword:"./json/gethotelnamelist.json"},"vacation.taiwan.search":{departure:"./json/departurelocaltw.json",destinationS:"./json/destinationlocalTW_S.json",destination:"./json/destinationlocalTW.json",traffic:"./json/traffic.json"},themeTravel:{place:"./json/TRS1PSUBJECT.js"},activity:{ticketAbroad:"./json/abroad.json",ticketTaiwan:"./json/home.json",keyword:"https://hotel.liontravel.com/search/keyword"}}).travel,i=r["flight.international"],c=r["flight.chinese"],o=r["flight.taiwan"],l=r.hotel,s=r["vacation.personal"],u=r["vacation.group"],p=r["vacation.taiwan"],d=r["vacation.taiwan.search"],m=r.themeTravel,h=r.activity},335:function(n,e,t){(n.exports=t(327)(!1)).push([n.i,".input_group {\n  display: flex;\n  margin-bottom: 10px;\n  border: 1px solid #ddd;\n  cursor: default; }\n  .input_group label {\n    cursor: pointer; }\n  .input_group .int_rcln .int_rcln_input {\n    color: #0077b3;\n    font-weight: bold;\n    border: none;\n    background-color: transparent; }\n    .input_group .int_rcln .int_rcln_input:focus {\n      border-color: #ddd; }\n  .input_group .int_rcln:last-of-type {\n    height: 50px; }\n    .input_group .int_rcln:last-of-type .int_rcln_input {\n      padding-top: 26px; }\n  .input_group .cal_icon {\n    color: #999;\n    display: inline-flex;\n    align-items: center; }\n  .input_group > div {\n    flex: 1; }\n  .input_group .vacation_select_group {\n    padding: 6px 0; }\n    .input_group .vacation_select_group > label,\n    .input_group .vacation_select_group > select {\n      padding: 0 6px;\n      line-height: 1;\n      background-color: #fff; }\n    .input_group .vacation_select_group > label {\n      display: block;\n      color: #aaa;\n      margin: 0;\n      font-size: 16px; }\n      .input_group .vacation_select_group > label.request:after {\n        content: '*';\n        display: inline-block;\n        color: #e10500;\n        vertical-align: middle;\n        line-height: 1;\n        margin-top: 4px; }\n    .input_group .vacation_select_group > select {\n      border: none;\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      width: 100%;\n      font-size: 16px;\n      color: #0077b3;\n      font-weight: bold; }\n",""])},343:function(n,e,t){var r=t(335);"string"==typeof r&&(r=[[n.i,r,""]]);var a=t(328)(r,{hmr:!0,transform:void 0,insertInto:void 0});r.locals&&(n.exports=r.locals),n.hot.accept(335,function(){var e=t(335);if("string"==typeof e&&(e=[[n.i,e,""]]),!function(n,e){var t,r=0;for(t in n){if(!e||n[t]!==e[t])return!1;r++}for(t in e)r--;return 0===r}(r.locals,e.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");a(e)}),n.hot.dispose(function(){a()})},380:function(n,e,t){(n.exports=t(327)(!1)).push([n.i,".cruise > *:not(:last-child) {\n  margin-bottom: 10px;\n  cursor: pointer; }\n\n.cruise input {\n  color: #0077b3;\n  font-size: 16px; }\n  .cruise input::-webkit-input-placeholder {\n    /* Chrome/Opera/Safari */\n    color: #999; }\n  .cruise input::-moz-placeholder {\n    /* Firefox 19+ */\n    color: #999; }\n  .cruise input:-ms-input-placeholder {\n    /* IE 10+ */\n    color: #999; }\n  .cruise input:-moz-placeholder {\n    /* Firefox 18- */\n    color: #999; }\n\n.cruise .floatL {\n  float: left;\n  vertical-align: top;\n  width: calc(50% - 5px); }\n  .cruise .floatL.int_rcln {\n    border: 1px solid #bbb; }\n\n.cruise .intRclnWrap {\n  border: 1px solid #bbb; }\n  .cruise .intRclnWrap .breakline {\n    margin: 0 !important; }\n\n.cruise .pp-w {\n  max-width: 360px; }\n\n.cruise .m-t-30 {\n  margin-top: 30px; }\n\n.cruise .lightgray {\n  color: #999; }\n\n.cruise .st_rcln .dropdown-place-holder {\n  font-weight: bold; }\n\n.cruise .st_rcln .dropdown-label {\n  font-weight: normal; }\n\n.cruise .int_rcln_input {\n  padding-top: 20px !important; }\n\n.cruise .int_rcln_input {\n  padding: 0;\n  font-weight: bold;\n  border: none;\n  background: transparent;\n  color: #0077b3; }\n  .cruise .int_rcln_input:focus {\n    border-color: #bbb; }\n\n.cruise .int_rcln .int_rcln_label {\n  font-size: 14px; }\n\n.cruise .int_rcln.breakline .int_rcln_label {\n  cursor: pointer; }\n\n.cruise .int_rcln .clearBtn {\n  bottom: 8px; }\n\n.cruise .int_rctg {\n  line-height: 1; }\n\n.cruise .int_rctg label {\n  text-overflow: clip;\n  cursor: pointer; }\n\n.cruise .m-dtm_wrap {\n  position: relative; }\n  .cruise .m-dtm_wrap .int_rctg {\n    position: absolute; }\n  .cruise .m-dtm_wrap .int-tag {\n    max-width: calc((100% - 10px) / 3); }\n    .cruise .m-dtm_wrap .int-tag:last-of-type {\n      margin: 0; }\n    .cruise .m-dtm_wrap .int-tag span {\n      text-align: right;\n      right: 0;\n      width: 28px;\n      padding-right: 10px;\n      background-color: #eaeaea;\n      z-index: 1; }\n\n.cruise .int-tag {\n  font-size: 16px; }\n\n.cruise .pp_rcln_custom_content .ic_rcln, .cruise .pp_rcln.ic_rcln {\n  color: #8894a9;\n  cursor: pointer; }\n\n.cruise .st_rcln.action .dropdown-place-holder {\n  border-color: #bbb; }\n\n.cruise .st_rcln .dropdown-place-holder.selected {\n  color: #0077b3; }\n\n.cruise .st_rcln .dropdown-label {\n  font-size: 14px; }\n\n.cruise .cr_rcln {\n  margin-top: 7px;\n  margin-bottom: 0; }\n  .cruise .cr_rcln input:focus + .indicator {\n    border-color: #bbb; }\n  .cruise .cr_rcln .indicator {\n    border: solid 1px #bbb; }\n\n.cruise .pp_rcln {\n  margin-top: 7px;\n  margin-bottom: 0; }\n\n.cruise .calendar_compose .int_rcln {\n  height: 48px; }\n  .cruise .calendar_compose .int_rcln.breakline .int_rcln_label {\n    left: 30px; }\n  .cruise .calendar_compose .int_rcln .int_rcln_input {\n    position: relative; }\n  .cruise .calendar_compose .int_rcln .int_rcln_input:not(input):empty::before {\n    color: #999;\n    left: 1px; }\n\n.cruise .calendar_compose .ic_rcln {\n  cursor: pointer; }\n\n.cruise-pp_rcln-popup {\n  font-size: 14px;\n  color: #222; }\n  .cruise-pp_rcln-popup ul {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n  .cruise-pp_rcln-popup li {\n    display: flex;\n    margin-top: 10px; }\n  .cruise-pp_rcln-popup p, .cruise-pp_rcln-popup span {\n    display: inline-block; }\n  .cruise-pp_rcln-popup.lbx_wrap {\n    padding: 30px 10px 10px; }\n\n.popup ul {\n  padding: 0; }\n  .popup ul li {\n    list-style: none;\n    display: flex; }\n\n.cruise .dtm_rcfr,\n.cruise-nvb .dtm_rcfr {\n  position: relative;\n  width: auto;\n  height: auto; }\n  .cruise .dtm_rcfr-row,\n  .cruise-nvb .dtm_rcfr-row {\n    display: flex;\n    margin: 0 15px; }\n    .cruise .dtm_rcfr-row .int_rcln_input,\n    .cruise-nvb .dtm_rcfr-row .int_rcln_input {\n      color: #0077b3;\n      border: none; }\n    .cruise .dtm_rcfr-row .bt_rcnb,\n    .cruise-nvb .dtm_rcfr-row .bt_rcnb {\n      min-width: 50px;\n      margin-left: 10px; }\n  .cruise .dtm_rcfr-input-wrap,\n  .cruise-nvb .dtm_rcfr-input-wrap {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    padding: 0 0 0 10px;\n    border: 2px solid #ff8b88; }\n  .cruise .dtm_rcfr-wrap,\n  .cruise-nvb .dtm_rcfr-wrap {\n    display: none;\n    position: static;\n    width: 100%;\n    height: calc(100vh - 130px);\n    overflow: auto;\n    background-color: #fff; }\n    .cruise .dtm_rcfr-wrap.open,\n    .cruise-nvb .dtm_rcfr-wrap.open {\n      display: block; }\n  .cruise .dtm_rcfr-label,\n  .cruise-nvb .dtm_rcfr-label {\n    margin: 8px 0 10px 16px;\n    font-size: 14px;\n    color: #24a07d; }\n  .cruise .dtm_rcfr-close_btn,\n  .cruise-nvb .dtm_rcfr-close_btn {\n    display: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 10px;\n    cursor: pointer; }\n    .cruise .dtm_rcfr-close_btn svg,\n    .cruise-nvb .dtm_rcfr-close_btn svg {\n      width: 16px;\n      height: 16px; }\n  .cruise .dtm_rcfr .ic_rcln,\n  .cruise-nvb .dtm_rcfr .ic_rcln {\n    color: #fff; }\n  .cruise .dtm_rcfr-selected-wrap,\n  .cruise-nvb .dtm_rcfr-selected-wrap {\n    white-space: nowrap; }\n  .cruise .dtm_rcfr-selected,\n  .cruise-nvb .dtm_rcfr-selected {\n    display: inline-flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 22.13333vw;\n    line-height: 1.3;\n    margin: 0 4px 0 0;\n    padding-left: 4px;\n    font-size: 16px;\n    font-weight: bold;\n    color: #0077b3;\n    background-color: #eaeaea;\n    cursor: pointer; }\n    .cruise .dtm_rcfr-selected:last-of-type,\n    .cruise-nvb .dtm_rcfr-selected:last-of-type {\n      margin: 0; }\n    .cruise .dtm_rcfr-selected span,\n    .cruise-nvb .dtm_rcfr-selected span {\n      width: 100%;\n      overflow: hidden;\n      white-space: nowrap; }\n    .cruise .dtm_rcfr-selected i,\n    .cruise-nvb .dtm_rcfr-selected i {\n      position: relative;\n      top: -1px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 20px;\n      height: 20px;\n      line-height: 1;\n      font-size: 12px;\n      font-style: normal;\n      font-weight: normal;\n      color: #999; }\n    .cruise .dtm_rcfr-selected svg,\n    .cruise-nvb .dtm_rcfr-selected svg {\n      width: 6px;\n      height: 6px;\n      fill: #999; }\n\n.cruise .act_racp,\n.cruise-nvb .act_racp {\n  box-shadow: none;\n  outline: none;\n  left: 0;\n  min-width: 100%;\n  height: calc(100vh - 130px);\n  max-height: 100%;\n  margin-top: 40px; }\n  .cruise .act_racp-future .m-place .close,\n  .cruise .act_racp-future .noMatchText .close,\n  .cruise-nvb .act_racp-future .m-place .close,\n  .cruise-nvb .act_racp-future .noMatchText .close {\n    display: none; }\n  .cruise .act_racp-future .noMatchText,\n  .cruise-nvb .act_racp-future .noMatchText {\n    color: #24a07d;\n    padding: 0; }\n  .cruise .act_racp .section,\n  .cruise-nvb .act_racp .section {\n    max-width: 100%; }\n\n.cruise.pc .dtm_rcfr-wrap {\n  width: 690px; }\n\n.cruise.pc .dtm_rcfr-row {\n  height: 20px;\n  margin: 0; }\n  .cruise.pc .dtm_rcfr-row .clearBtnWrap {\n    top: 24px;\n    right: -10px; }\n  .cruise.pc .dtm_rcfr-row .int_rcln {\n    height: auto; }\n    .cruise.pc .dtm_rcfr-row .int_rcln .int_rcln_input {\n      padding-top: 0 !important; }\n\n.cruise.pc .dtm_rcfr-wrap {\n  position: absolute;\n  top: 100%;\n  left: -1px;\n  width: 690px;\n  height: auto;\n  overflow: visible;\n  padding: 16px 14px 0;\n  border: 1px solid rgba(153, 153, 153, 0.7);\n  z-index: 11; }\n\n.cruise.pc .dtm_rcfr-close_btn {\n  display: block; }\n\n.cruise.pc .dtm_rcfr-selected {\n  width: auto; }\n  .cruise.pc .dtm_rcfr-selected span {\n    width: 82px; }\n  .cruise.pc .dtm_rcfr-selected i {\n    top: 0; }\n\n.cruise.pc .act_racp {\n  height: auto;\n  max-height: 360px;\n  margin-top: auto;\n  box-shadow: 0 2px 4px 0 rgba(153, 153, 153, 0.7); }\n  .cruise.pc .act_racp-future .m-place .close,\n  .cruise.pc .act_racp-future .noMatchText .close {\n    display: block; }\n  .cruise.pc .act_racp-future .noMatchText {\n    color: #24a07d;\n    padding: 12px 46px 7px 10px; }\n\n.cruise.pc .calendar_compose .input_group {\n  margin: 0; }\n\n.cruise.pc .calendar_compose .int_rcln_label {\n  cursor: pointer; }\n\n.cruise.pc .calendar_compose .input_group .int_rcln {\n  height: 50px !important; }\n  .cruise.pc .calendar_compose .input_group .int_rcln .int_rcln_input {\n    line-height: 1;\n    padding-bottom: 0;\n    padding-top: 24px !important;\n    background-color: transparent; }\n\n.cruise.pc .calendar_compose .nights {\n  display: none; }\n\n.cruise.pc .calendar_compose .clearBtn {\n  bottom: 6px;\n  right: 6px; }\n\n.cruise.pc .calendar_compose .cal_icon {\n  padding-top: 22px; }\n\n.cruise.pc .cr_rcln .indicator {\n  border: solid 1px #bbb; }\n\n.cruise.pc .btn-wrap {\n  position: absolute;\n  right: 10px;\n  bottom: 10px; }\n\n.cruise-cyRcmnWrap {\n  height: 100vh; }\n  .cruise-cyRcmnWrap .active .today:after {\n    display: none; }\n  .cruise-cyRcmnWrap .confirm_btn span {\n    display: none; }\n\n.cruise_panel-m_destination {\n  height: 100%;\n  padding-top: 125px; }\n\n.cruise_panel-m_header-wrap {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  height: 125px;\n  background-color: #fff;\n  z-index: 1; }\n\n.cruise_panel-m_dtm-wrap {\n  touch-action: manipulation;\n  height: 100%;\n  overflow-y: auto;\n  background-color: #fff; }\n  .cruise_panel-m_dtm-wrap .act_racp {\n    margin: 0 !important;\n    box-shadow: none !important; }\n    .cruise_panel-m_dtm-wrap .act_racp-future .m-place .close,\n    .cruise_panel-m_dtm-wrap .act_racp-future .noMatchText .close {\n      display: none !important; }\n    .cruise_panel-m_dtm-wrap .act_racp-future .noMatchText {\n      padding: 0; }\n  .cruise_panel-m_dtm-wrap .cr_rcln .indicator {\n    border: solid 1px #bbb; }\n\n.cruise .st_rcln .dropdown-place-holder, .cruise .int_rctg.require, .cruise .input_group, .cruise .floatL.int_rcln {\n  border: 1px solid #bbb; }\n\n.cruise .st_rcln .dropdown-label, .cruise .int_rctg .int-col .int-label, .cruise .int_rcln > .int_rcln_label {\n  color: #222; }\n\n.cruise::-webkit-input-placeholder, .cruise::-webkit-input-placeholder, .cruise::-moz-placeholder, .cruise:-ms-input-placeholder, .cruise:-moz-placeholder {\n  font-weight: normal; }\n\n.cruise::placeholder, .cruise::-webkit-input-placeholder, .cruise::-moz-placeholder, .cruise:-ms-input-placeholder, .cruise:-moz-placeholder {\n  font-weight: normal; }\n\n.cruise .int-tags > .int-tag, .cruise .st_rcln .dropdown-place-holder.selected, .cruise .dtm_rcfr-selected, .cruise .input_group .int_rcln .int_rcln_input, .cruise .int_rcln_input, .cruise-nvb .dtm_rcfr-row .int_rcln_input, .cruise-nvb .dtm_rcfr-selected, .cruise .dtm_rcfr-row .int_rcln_input {\n  font-weight: normal; }\n",""])},450:function(n,e,t){var r=t(380);"string"==typeof r&&(r=[[n.i,r,""]]);var a=t(328)(r,{hmr:!0,transform:void 0,insertInto:void 0});r.locals&&(n.exports=r.locals),n.hot.accept(380,function(){var e=t(380);if("string"==typeof e&&(e=[[n.i,e,""]]),!function(n,e){var t,r=0;for(t in n){if(!e||n[t]!==e[t])return!1;r++}for(t in e)r--;return 0===r}(r.locals,e.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");a(e)}),n.hot.dispose(function(){a()})},659:function(n,e,t){"use strict";t.r(e);var r=t(318),a=t.n(r),i=t(319),c=t.n(i),o=t(320),l=t.n(o),s=t(321),u=t.n(s),p=t(322),d=t.n(p),m=t(323),h=t.n(m),f=t(324),v=t.n(f),_=t(16),g=t.n(_),b=t(339),w=t.n(b),x=t(326),y=t(331),k=t(348),D=t(341),S=t(334),E=t(338),C=t(332),L=t(346),T=t(356),j=t(363),O=t(342),I=t.n(O),M=t(117),N=t.n(M),R=t(347),P=t(352),Y=[{catalogueName:"城市",catafilter:function(n){return n}}],A=function(n){return n.forEach(function(n){"_"===n.vLinewebarea?n.txt="".concat(n.text).concat(n.vLinetravelText):n.txt="".concat(n.text,"-").concat(n.vLinetravelText)}),n},z=function(n){var e=n.text,t=n.removeData;return g.a.createElement("p",{className:"dtm_rcfr-selected",onClick:t},g.a.createElement("span",{title:e},e),g.a.createElement("i",null,"x"))},W=function(n){function e(n){var t;return a()(this,e),t=l()(this,u()(e).call(this,n)),v()(h()(h()(t)),"_getDataCallBack",function(n){var e=n.vLine,r=n.vLinetravel,a=n.vLinewebarea,i=[],c=function(n,t){for(var c in a[t])a[t].hasOwnProperty(c)&&i.push({vLine:n,vLinetravel:t,vLinewebarea:c,vLineText:e[n],vLinetravelText:r[n][t],text:"".concat(a[t][c]),value:"".concat(n,"-").concat(t,"-").concat(c)})};for(var o in e)if(e.hasOwnProperty(o))for(var l in r[o])r[o].hasOwnProperty(l)&&(i.push({vLine:o,vLinetravel:l,vLinewebarea:"_",vLineText:e[o],vLinetravelText:"_"===l?"全區":"全部",text:"_"===l?e[o]:r[o][l],value:"".concat(o,"-").concat(l,"-_")}),c(o,l));var s=i.filter(function(n){return-1===n.text.indexOf("不限")});t.setState({fetchData:s})}),v()(h()(h()(t)),"emitPushData",function(n){t.props.emitPushData&&t.props.emitPushData(n)}),v()(h()(h()(t)),"handlePushData",function(n){var e=t.state.selectedData;if(e.some(function(e){return n.value===e.value}))t.setState({selectedData:t.changeDestination.remove(n)});else{if(!(e.length<t.props.max))return;t.setState({selectedData:t.changeDestination.add(n)})}}),v()(h()(h()(t)),"changeDestination",{add:function(n){var e=t.state.selectedData,r=t.changeDestination.checkLevel,a=[];if("_"===n.vLinetravel){var i=I()(e).filter(function(e){return e.vLine!==n.vLine});a=[].concat(I()(i),[n])}else if("_"===n.vLinewebarea){var c=I()(e).filter(function(e){return e.vLinetravel!==n.vLinetravel});a=r(n,"vLinetravel","vLine")?[].concat(I()(c),[n]).filter(function(e){return"_"!==e.vLinetravel||e.vLine!==n.vLine}):[].concat(I()(c),[n])}else a=r(n,"vLinetravel","vLine")?[].concat(I()(e),[n]).filter(function(e){return"_"!==e.vLinetravel||e.vLine!==n.vLine}):r(n,"vLinewebarea","vLinetravel")?[].concat(I()(e),[n]).filter(function(e){return"_"!==e.vLinewebarea||e.vLinetravel!==n.vLinetravel}):[].concat(I()(e),[n]);return a},remove:function(n){return t.state.selectedData.filter(function(e){return n.value!==e.value})},checkLevel:function(n,e,r){return t.state.selectedData.some(function(t){return"_"===t[e]&&t[r]===n[r]})}}),v()(h()(h()(t)),"handleOpenMenu",function(){t.setState({showAct:!1,showDtm:!0})}),v()(h()(h()(t)),"handleCloseMenu",function(){t.setState({showAct:!1,showDtm:!1,keyword:""})}),v()(h()(h()(t)),"handleLabelWrapClick",function(){t.searchInput.current.inputDOM.focus()}),t.searchInput=g.a.createRef(),t.state={fetchData:[],keyword:"",showDtm:!0,showAct:!1,selectedData:t.props.selectedData},t}return d()(e,n),c()(e,[{key:"componentDidMount",value:function(){this._getDataCallBack(this.props.travelDataSource)}},{key:"render",value:function(){var n=this,e=this.props,t=e.placeholder,r=e.minimumStringQueryLength,a=e.minimumStringQuery,i=e.noMatchText,c=e.sublabel,o=e.travelDataSource,l=this.state,s=l.fetchData,u=l.keyword,p=l.showAct,d=l.showDtm,m=l.selectedData,h=m.map(function(e){var t;return t="_"===e.vLinewebarea?e.txt||e.text:"".concat(e.text,"-").concat(e.vLinetravelText),g.a.createElement(z,{key:e.value,text:t,removeData:function(){return n.handlePushData(e)}})}),f=m.map(function(n){return n.value});return g.a.createElement("div",{className:"themeTravel_panel-m_destination"},g.a.createElement("svg",{viewBox:"0 0 10 10",display:"none"},g.a.createElement("path",{id:"dtm_rcfr-x",d:"M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z"})),g.a.createElement("header",{className:"themeTravel_panel-m_header-wrap"},g.a.createElement("h3",{className:"txt-center page_title m-t-sm m-b-sm"},"目的地"),g.a.createElement("div",{className:"dtm_rcfr-row"},g.a.createElement("div",{className:"dtm_rcfr-input-wrap"},g.a.createElement("div",{className:"dtm_rcfr-selected-wrap-m"},h),g.a.createElement(C.a,{ref:this.searchInput,placeholder:m.length?"":t,onFocus:this.handleOpenMenu,value:u,onChange:function(e){e.target.value?n.setState({keyword:e.target.value,showAct:!0,showDtm:!1}):n.setState({keyword:"",showAct:!1,showDtm:!0})},onClearValue:function(){return n.setState({keyword:"",showAct:!1,showDtm:!0})}})),g.a.createElement(E.a,{className:"dtm-btn",md:!0,radius:!0,whenClick:function(){return n.emitPushData(m)}},"確定")),g.a.createElement("p",{className:"dtm_rcfr-label"},c)),g.a.createElement("div",{className:"themeTravel_panel-m_dtm-wrap"},g.a.createElement(P.a,{InputIsFocus:p,url:s,minimumStringQueryLength:r,minimumStringQuery:a,searchKeyWord:u,noMatchText:i,ClassName:!p&&"d-no",footer:!1,theme:"future",closeActcallback:function(e){void 0!==e&&(n.setState({showAct:!1,keyword:""}),n.handlePushData(e)),n.handleOpenMenu()},emitSecondData:function(e){u.length>=r&&0<e.length&&(n.handlePushData(e[0]),n.setState({keyword:"",showAct:!1,showDtm:!0}))},changeKey:A,catalogue:Y}),g.a.createElement("div",{className:"dtm_rcfr-wrap ".concat(d?"open":"")},Object.keys(o).length&&g.a.createElement(R.a,{levelKey:["vLine","vLinetravel","vLinewebarea"],orderMaps:{vLine:["_6","_5","_7","_3","_1","_4","_2","_9"]},onClickItem:this.handlePushData,selectedData:f,dataResouce:o}))))}}]),e}(_.PureComponent);v()(W,"defaultProps",{max:3,minimumStringQueryLength:2,autoShowDtm:!1}),v()(W,"propTypes",{fetchPath:N.a.string.isRequired,selectedData:N.a.array.isRequired,max:N.a.number,placeholder:N.a.string,minimumStringQueryLength:N.a.number.isRequired,minimumStringQuery:N.a.string,noMatchText:N.a.string,autoShowDtm:N.a.bool,label:N.a.string,onChange:N.a.func});var B=W,J=t(350),q=t(401),F=(t(343),t(450),function(n){return g.a.createElement("div",{className:"themeTravel-pp_rcln-popup ".concat(n.className)},g.a.createElement("p",null,"本公司「成團」之旅遊團體，係指報名參團人數已達出團標準，但團體出發前若遇有以下情事，將依國外（內）團體旅遊定型化契約書取消出團："),g.a.createElement("ul",null,g.a.createElement("li",null,g.a.createElement("span",null,"一、"),g.a.createElement("p",null,"不可抗力、不可歸責於雙方當事人之事由，如颱 風、海嘯、地震、洪災等不可抗力之天然災害；或罷工、戰亂抗爭、官方封閉旅遊地區、重大疫情等不可歸責之人為因素。")),g.a.createElement("li",null,g.a.createElement("span",null,"二、"),g.a.createElement("p",null,"「成團」之旅遊團體所遊覽地區或國家，經外交部領事事務局或交通部觀光局或其他官方單位列為橙色警示、或紅色警示。"))))}),G=function(n){var e=n.onClick;return g.a.createElement("span",{className:"nvb_rslb_goBack",onClick:e},g.a.createElement(S.a,{name:"toolbefore"}))},V=function(n){function e(n){var t;return a()(this,e),t=l()(this,u()(e).call(this,n)),v()(h()(h()(t)),"objToOption",function(n){var e=[];for(var t in n)n.hasOwnProperty(t)&&e.push({text:n[t],value:t});return e}),v()(h()(h()(t)),"handleSubmit",function(){t.validate(function(n,e){n?window.open("https://travel.liontravel.com/search?"+t.filterAllState(),t.props.hrefTarget):alert(e.join("、"))})}),v()(h()(h()(t)),"validate",function(n){var e=t.state,r=e.destination,a=e.CyRcln1,i=(e.GoDateStart,e.GoDateEnd,[]);r.length<1&&i.push("請輸入 / 選擇目的地"),a.length<2&&i.push("請選擇出發日期"),n(0===i.length,i)}),v()(h()(h()(t)),"filterAllState",function(){var n=t.state,e=n.ThemeID,r=n.DepartureID,a=n.destination,i=n.CyRcln1,c=n.Days,o=n.Keywords,l=n.IsEnsureGroup,s=n.IsSold,u=a.map(function(n){return"_"===n.vLinewebarea&&"_"===n.vLinetravel?"-".concat(n.vLine.split("_").join("-"),","):"_"===n.vLinetravel?"".concat(n.vLine.split("_").join("-"),","):"".concat(n.vLinewebarea.match(/^.(.*)$/)[1]).concat(n.vLinetravel.split("_").join("-"),",")}),p=e.split("_").join(""),d=r.split("_").join(""),m=a.map(function(n){return"".concat(n.text,"-").concat(n.vLinetravelText)});return"Country=TW&WebCode=B2C&TravelType=0&Page=1&PageSize=20&ThemeID=".concat(p,"&DepartureID=").concat(d,"&GoDateStart=").concat(i[0],"&GoDateEnd=").concat(i[1],"&Days=").concat(c,"&IsEnsureGroup=").concat(l,"&IsSold=").concat(s,"&Keywords=").concat(o,"&ArriveID=").concat(u.join(""),"&ArriveTEXT=").concat(m)}),v()(h()(h()(t)),"handleOpenPage",function(n){t.setState({activeInput:n})}),v()(h()(h()(t)),"handleClosePage",function(){t.setState({activeInput:null})}),v()(h()(h()(t)),"handleMultipleClick",function(n){null!=n.current&&n.current.blur()}),v()(h()(h()(t)),"toggleLbxRcln",function(){t.setState(function(n){return{lbxRclnisOpen:!n.lbxRclnisOpen}})}),t.WrapperDtmRclnMax=3,t.fetchPath=y.f.place,t.date=new Date,t.year=t.date.getFullYear(),t.month=t.date.getMonth()+1,t.day=t.date.getDate(),t.today="".concat(t.year,"-").concat(t.month,"-").concat(t.day),t.defaultStartDate=w()().add(15,"day").format("YYYY-MM-DD"),t.defaultEndtDate=w()().add(30,"day").format("YYYY-MM-DD"),t.state={data:{},ThemeID:"_11",DepartureID:"",destination:[],CyRcln1:[t.defaultStartDate,t.defaultEndtDate],Days:"",Keywords:"",IsEnsureGroup:!1,IsSold:!1,activeInput:null,themeOptions:[],option1:[],option2:[{text:"不限",value:""},{text:"1~5天",value:"1,2,3,4,5"},{text:"6~10天",value:"6,7,8,9,10"},{text:"10天以上",value:"10"}],lbxRclnisOpen:!1},t}return d()(e,n),c()(e,[{key:"componentDidMount",value:function(){var n=this,e=sessionStorage.getItem(this.fetchPath);if(e&&Object(x.f)(e)){var t=JSON.parse(e);this.setState({data:t,themeOptions:this.objToOption(t.vPsubject),option1:this.objToOption(t.vCity)})}else Object(x.c)(this.fetchPath,function(e){var t=JSON.stringify(e);n.setState({data:e,themeOptions:n.objToOption(e.vPsubject),option1:n.objToOption(e.vCity)}),sessionStorage.setItem(n.fetchPath,t)})}},{key:"shouldComponentUpdate",value:function(n,e){return this.state!==e}},{key:"submitBtn",value:function(){}},{key:"render",value:function(){var n=this,e=this.state,t=e.data,r=e.activeInput,a=(e.ThemeID,e.DepartureID),i=e.destination,c=e.CyRcln1,o=e.Days,l=e.Keywords,s=e.IsEnsureGroup,u=e.IsSold,p=(e.themeOptions,e.option1),d=e.option2,m=e.lbxRclnisOpen,h=0===r||1===r,f=2===r,v=h||f,_=i.map(function(n){return"_"===n.vLinewebarea?n.txt||n.text:"".concat(n.text,"-").concat(n.vLinetravelText)});return g.a.createElement("div",{className:"cruise mobile"},g.a.createElement(D.a,{option:p,placeholder:"請選擇",label:"出發地",icon:g.a.createElement(S.a,{name:"toolmap"}),defaultValue:a||"_",ClassName:"strcln_custom m-b-sm",req:!0,breakline:!0,onChangeCallBack:function(e){return n.setState({DepartureID:e})}}),g.a.createElement(J.a,{isRequired:!0,label:"目的地",iconName:"toolmap",onClick:function(){return n.handleOpenPage(2)},subComponent:g.a.createElement("div",{className:"m-dtm_wrap",onClick:function(){return n.handleOpenPage(2)}},g.a.createElement(q.a,{maxLength:this.WrapperDtmRclnMax,placeholder:i.length?"":"請選擇/可輸入目的地、景點",query:_,onClick:this.handleMultipleClick}))}),g.a.createElement("div",{className:"input_group calendar_compose"},g.a.createElement(C.a,{request:!0,readOnly:!0,placeholder:"YYYY/MM/DD",label:"出發日期",icon:g.a.createElement(S.a,{name:"tooldate"}),onClick:function(){return n.handleOpenPage(0)},value:c[0]&&c[0].replace(/\-/g,"/")}),g.a.createElement("span",{className:"cal_icon"},"~"),g.a.createElement(C.a,{readOnly:!0,placeholder:"YYYY/MM/DD",onClick:function(){return n.handleOpenPage(1)},value:c[1]&&c[1].replace(/\-/g,"/")})),g.a.createElement(D.a,{option:d,placeholder:"請選擇",label:"旅遊天數",icon:g.a.createElement(S.a,{name:"tooldate"}),defaultValue:o||"",ClassName:"strcln_custom m-b-sm",breakline:!0,onChangeCallBack:function(e){return n.setState({Days:e})}}),g.a.createElement("div",{className:"intRclnWrap"},g.a.createElement(C.a,{placeholder:"可輸入團號",label:"產品名/關鍵字",className:"m-b-sm",value:l,breakline:!0,onChange:function(e,t){n.setState({Keywords:t})},onClearValue:function(e){e.value="",n.setState({Keywords:""})}})),g.a.createElement(L.a,{type:"checkbox",textContent:"只找成團",className:"d-ib",checked:s,whenChange:function(e){return n.setState({IsEnsureGroup:e})}}),g.a.createElement(S.a,{name:"toolif",size:"x1",className:"pp_rcln m-l-xs m-r-md",onClick:this.toggleLbxRcln}),g.a.createElement(j.a,{open:m,closeLbxRcln:this.toggleLbxRcln},g.a.createElement(F,{className:"lbx_wrap"})),g.a.createElement(L.a,{type:"checkbox",textContent:"只找可報名團體",className:"d-ib m-l-xl",checked:u,whenChange:function(e){return n.setState({IsSold:e})}}),g.a.createElement(E.a,{prop:"string",className:"h-sm fluid m-t-30",whenClick:this.handleSubmit,md:!0,radius:!0},"搜尋"),g.a.createElement(k.a,{className:"themeTravel-nvb",visible:v,direction:"right"},g.a.createElement(G,{onClick:this.handleClosePage}),f&&g.a.createElement(B,{travelDataSource:t,fetchPath:this.fetchPath,selectedData:i,max:this.WrapperDtmRclnMax,placeholder:"請選擇/可輸入目的地、景點",minimumStringQueryLength:2,minimumStringQuery:"請輸入至少兩個文字",noMatchText:"很抱歉，找不到符合的項目",sublabel:"找不到選項?請輸入關鍵字查詢 / 最多可選擇3則目的地",parentData:i,emitPushData:function(e){n.setState({destination:e,activeInput:null})}}),h&&g.a.createElement("div",{className:"themeTravel-cyRcmnWrap"},g.a.createElement(T.a,{doubleChoose:!0,selectedStartDate:c[0],selectedEndDate:c[1],startLabelTitle:"最早出發日",endLabelTitle:"最晚出發日",startTxt:"最早",endTxt:"最晚",activeInput:r,endMonth:w()().add(3,"years").format("YYYY-MM"),ref:function(e){n.calendar=e},onClickConfirm:function(){var e=n.calendar.state,t=e.selectedStartDate,r=e.selectedEndDate;n.setState({CyRcln1:[t,r],activeInput:null})},customDiffTxt:function(n){return"共"+(n+1)+"天"}}))))}}]),e}(_.Component);t.d(e,"default",function(){return V})}}]);