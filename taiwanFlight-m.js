(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{309:function(n,t,e){"use strict";e.r(t);var a=e(316),i=e.n(a),o=e(317),r=e.n(o),l=e(318),c=e.n(l),s=e(319),u=e.n(s),d=e(320),h=e.n(d),f=e(321),p=e.n(f),m=e(322),v=e.n(m),g=e(17),_=e.n(g),E=e(339),w=e.n(E),T=e(83),C=e.n(T),R=e(328),b=e(340),k=e(333),D=e(329),N=e(337),A=e(353),I=e(363),x=(e(390),[{text:"台北松山",value:"TSA"},{text:"台東豐年",value:"TTT"},{text:"高雄小港",value:"KHH"},{text:"台中",value:"RMQ"},{text:"花蓮",value:"HUN"},{text:"澎湖馬公",value:"MZG"},{text:"金門",value:"KNH"}]),P=[{text:"1位",value:"1"},{text:"2位",value:"2"},{text:"3位",value:"3"},{text:"4位",value:"4"}],O=[{text:"0位",value:"0"},{text:"1位",value:"1"},{text:"2位",value:"2"},{text:"3位",value:"3"}];var S=function(n){function t(){var n,e;i()(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return e=c()(this,(n=u()(t)).call.apply(n,[this].concat(o))),v()(p()(p()(e)),"handleClose",function(){e.props.showCalendar(null)}),v()(p()(p()(e)),"handleConfirm",function(){var n=e.calendar.state,t=n.selectedStartDate,a=n.selectedEndDate;e.props.hadelChangeDate(t,a,null)}),e}return h()(t,n),r()(t,[{key:"showCalendar",value:function(n){this.props.showCalendar(n)}},{key:"render",value:function(){var n=this,t=this.props,e=t.activeInput,a=t.DEPARTURE_DATE,i=t.RETURN_DATE,o=t.TRIP,r=0===e||1===e;return _.a.createElement("div",null,_.a.createElement("div",{className:"input_group aroundInput"},_.a.createElement(D.a,{placeholder:"YYYYMMDD",label:1===o?"出發日期":"去程日期",icon:_.a.createElement(k.a,{name:"tooldate"}),value:a.replace(/\-/g,"/"),className:1===o?"":"bor-right",onClick:function(){n.showCalendar(0)}}),1===o?null:_.a.createElement(D.a,{placeholder:"YYYYMMDD",label:"回程日期",breakline:!0,onClick:function(){n.showCalendar(1)},value:i.replace(/\-/g,"/")})),_.a.createElement(A.a,{visible:r,direction:"right"},_.a.createElement("span",{className:"nvb_rslb_goBack",onClick:this.handleClose},_.a.createElement(k.a,{name:"toolbefore"})),r&&_.a.createElement(I.a,{doubleChoose:1!==o,selectedStartDate:a,selectedEndDate:1===o?"":i,activeInput:e,startMonth:w()().format("YYYY-MM"),endMonth:w()().add(12,"months").format("YYYY-MM"),startDate:"2018-10-15",endDate:"2019-08-12",startLabelTitle:"入住日期",endLabelTitle:"退房日期",ref:function(t){n.calendar=t},onClickConfirm:this.handleConfirm.bind(this),customDiffTxt:function(n){return"共"+(n+1)+"天"}})))}}]),t}(g.Component),y=function(n){function t(n){var e;return i()(this,t),e=c()(this,u()(t).call(this,n)),v()(p()(p()(e)),"handleServerItemsLoad",function(n){var t=Object.keys(n).map(function(t,e){return n[t]}),a=function(n){for(var t=[],e=0;e<n.length;e++)t[e]={},t[e].text=n[e]["<BOARD_POINT_NAME>"],t[e].value=n[e]["<BOARD_POINT_CODE>"];return t.filter(function(n,t,e){return 0<t?e[t-1].text.toString()!==e[t].text.toString():e[t].text})}(t);e.setState({isLoaded:!0,depList:a,itemList:t,BOARD_POINT:a[0].value,depPlaceholder:a[0].text}),e.changeOption(a[0].value)}),e.state={BOARD_POINT:"",OFF_POINT:"",TRIP:1,DEPARTURE_DATE:"",RETURN_DATE:"",PASSENGER_ADULTNUM:1,PASSENGER_CHILDNUM:0,activeInput:null,isLoaded:!1,itemList:[],depList:x,arrList:x,depPlaceholder:"松山",arrPlaceholder:"馬公"},e}return h()(t,n),r()(t,[{key:"UNSAFE_componentWillMount",value:function(){var n=this;fetch(R.c.place).then(function(n){if(!n.ok)throw new Error(n.statusText);return n.json()}).then(function(t){n.handleServerItemsLoad(t)}).catch(function(n){})}},{key:"boardPointChange",value:function(n){var t=this.state.depList.filter(function(t,e,a){return a[e].value===n});this.setState({BOARD_POINT:n,depPlaceholder:t[0].text}),this.changeOption(n)}},{key:"offPointChange",value:function(n){var t=this.state.arrList.filter(function(t,e,a){return a[e].value===n});this.setState({OFF_POINT:n,arrPlaceholder:t[0].text})}},{key:"changeOption",value:function(n){var t=this.state.itemList;if(0!==t.length){for(var e=n,a=t.filter(function(n,t,a){return a[t]["<BOARD_POINT_CODE>"]===e}),i=[],o=0;o<a.length;o++)i[o]={},i[o].text=a[o]["<OFF_POINT_NAME>"],i[o].value=a[o]["<OFF_POINT_CODE>"];var r,l=this.state.OFF_POINT;if(""!==l)for(var c=0;c<i.length;c++)r=i[c].value===l?c:0;else r=0;this.setState({arrList:i,arrPlaceholder:i[r].text,OFF_POINT:i[r].value})}}},{key:"passengerChange",value:function(n,t){if("p"===t)this.setState({PASSENGER_ADULTNUM:n});else{if("c"!==t)return;this.setState({PASSENGER_CHILDNUM:n})}}},{key:"tripChange",value:function(n){this.setState({TRIP:n})}},{key:"clearVaule",value:function(n){this.setState({DEPARTURE_DATE:""})}},{key:"roundDate",value:function(n){this.setState({DEPARTURE_DATE:n.startInputValue,RETURN_DATE:n.endInputValue})}},{key:"showCalendar",value:function(n){this.setState({activeInput:n})}},{key:"hadelChangeDate",value:function(n,t,e){this.setState({DEPARTURE_DATE:n,RETURN_DATE:t,activeInput:e})}},{key:"handleSubmit",value:function(){!function(n){var t=n,e={};for(var a in t)1===t.TRIP?"RETURN_DATE"!==a&&(e[a]=t[a]):e[a]=t[a];!function(n){var t,e=n;for(var a in e){if(!e[a]){t=!1;break}if("DEPARTURE_DATE"===a){var i=e[a].replace(/\//g,"-");e[a]=i}if("RETURN_DATE"===a){var o=e[a].replace(/\//g,"-");e[a]=o}t=!0}t&&function(n){var t=n,e="",a=Object.keys(t).length,i=0;for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e+=a<=++i?o+"="+t[o]:o+"="+t[o]+"&");window.open("https://twflight.liontravel.com/search?"+e,this.props.hrefTarget)}(e)}(e)}({TRIP:this.state.TRIP,BOARD_POINT:this.state.BOARD_POINT,OFF_POINT:this.state.OFF_POINT,DEPARTURE_DATE:this.state.DEPARTURE_DATE,RETURN_DATE:this.state.RETURN_DATE,PASSENGER_ADULTNUM:this.state.PASSENGER_ADULTNUM,PASSENGER_CHILDNUM:this.state.PASSENGER_CHILDNUM})}},{key:"render",value:function(){var n=this,t=this.state,e=t.TRIP,a=t.DEPARTURE_DATE,i=t.RETURN_DATE,o=t.activeInput,r=t.depList,l=t.depPlaceholder,c=t.arrList,s=t.arrPlaceholder,u=t.PASSENGER_ADULTNUM,d=t.PASSENGER_CHILDNUM;return _.a.createElement("div",{className:"flight_taiwan"},_.a.createElement("div",null,_.a.createElement("ul",{className:"Rtow"},_.a.createElement("li",{className:C()({active:1===e}),onClick:function(){n.tripChange(1)}},"單程"),_.a.createElement("li",{className:C()({active:2===e}),onClick:function(){n.tripChange(2)}},"來回"))),_.a.createElement("div",{className:"m-t-sm"},_.a.createElement(b.a,{ClassName:"m-b-sm",option:r,placeholder:l,label:"出發地",icon:_.a.createElement(k.a,{name:"planeairplane"}),req:!0,breakline:!0,onChangeCallBack:function(t){n.boardPointChange(t)}}),_.a.createElement(b.a,{ClassName:"m-b-sm",option:c,placeholder:s,label:"目的地",icon:_.a.createElement(k.a,{name:"toolmap"}),req:!0,breakline:!0,onChangeCallBack:function(t){n.offPointChange(t)}}),_.a.createElement(S,{TRIP:e,showCalendar:function(t){n.showCalendar(t)},activeInput:o,hadelChangeDate:function(t,e,a){n.hadelChangeDate(t,e,a)},DEPARTURE_DATE:a,RETURN_DATE:i}),_.a.createElement("div",{className:"m-b-sm m-t-sm"},_.a.createElement(b.a,{ClassName:"m-b-sm",option:P,placeholder:"".concat(u,"位"),label:"大人",icon:_.a.createElement(k.a,{name:"toolstaff"}),req:!0,breakline:!0,whenMouseDown:function(){},onChangeCallBack:function(t){n.passengerChange(t,"p")}}),_.a.createElement(b.a,{ClassName:"m-b-sm",option:O,placeholder:"".concat(d,"位"),label:"孩童",icon:_.a.createElement(k.a,{name:"toolchild"}),req:!0,breakline:!0,whenMouseDown:function(){},onChangeCallBack:function(t){n.passengerChange(t,"c")}})),_.a.createElement("div",{className:"footer"},_.a.createElement("div",{className:"footerInfo"},_.a.createElement(k.a,{name:"toolif"}),"注意事項：目前僅華信航空提供線上即時訂購。",_.a.createElement("a",null,"參考其他航空"))),_.a.createElement(N.a,{radius:!0,prop:"string",className:"h-sm w-full",lg:!0,whenClick:function(){n.handleSubmit()}},"搜尋")))}}]),t}(g.Component);e.d(t,"default",function(){return y})},315:function(n,t,e){"use strict";e.d(t,"b",function(){return o}),e.d(t,"e",function(){return r}),e.d(t,"d",function(){return l}),e.d(t,"c",function(){return c}),e.d(t,"a",function(){return s});var a=e(334),i=e.n(a);function o(n,t){fetch(n,{method:"GET"}).then(function(n){return n.text()}).then(function(n){var t=n.replace(/\r?\n|\r/g,"").replace(/(?:var|let|const)\s(\w+)\s=/g,'"$1":').replace(/;/g,",").replace(/,$/g,"").replace(/'/g,'"');return JSON.parse("{"+t+"}")}).then(function(n){t(n)})}function r(n){var t=n,e="",a=Object.keys(t).length,i=0;for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e+=a<=++i?o+"="+t[o]:o+"="+t[o]+"&");return e}function l(n){var t=n.split("-"),e=i()(t,2),a=e[0],o=e[1];return[a=Number(a),o=Number(o)]}function c(){return new Date((new Date).getFullYear(),(new Date).getMonth(),1,8).toISOString().slice(0,7)}var s={fetchJsToObj:o,findHighestZIndex:function(n){for(var t=document.getElementsByTagName(n),e=0,a=0;a<t.length;a++){var i=document.defaultView.getComputedStyle(t[a],null).getPropertyValue("z-index");e<i&&"auto"!==i&&(e=i)}return parseInt(e,10)},getDomPosition:function(n,t){return"top"===t?n.getBoundingClientRect()[t]+window.pageYOffset:n.getBoundingClientRect()[t]},toQueryString:r,getYearAndMonth:l,getNowMonth:c}},325:function(n,t,e){"use strict";e.d(t,"a",function(){return N});var a=e(327),i=e.n(a),o=e(330),r=e.n(o),l=e(316),c=e.n(l),s=e(317),u=e.n(s),d=e(318),h=e.n(d),f=e(319),p=e.n(f),m=e(320),v=e.n(m),g=e(321),_=e.n(g),E=e(322),w=e.n(E),T=e(17),C=e.n(T),R=e(84),b=e.n(R),k=e(115),D=e.n(k),N=function(n){function t(n){var e;return c()(this,t),e=h()(this,p()(t).call(this,n)),w()(_()(_()(e)),"handle",function(n){if(!e.__domNode.contains(n.target)){var t=e.props.onClickOutside;"function"==typeof t&&t(n)}}),e.isTouch=!1,e.isClickInSide=!1,e.isUnMounted=!1,e.__domNode=null,e.__wrappedInstance=null,e}return v()(t,n),u()(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handle,!0)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("click",this.handle,!0)}},{key:"render",value:function(){var n=this,t=this.props,e=t.children,a=(t.onClickOutside,r()(t,["children","onClickOutside"]));return C.a.createElement("div",i()({},a,{ref:function(t){n.__domNode=b.a.findDOMNode(t),n.__wrappedInstance=t}}),e)}}]),t}(T.Component);w()(N,"propTypes",{onClickOutside:D.a.func.isRequired})},326:function(n,t,e){"use strict";var a=e(315),i=e(325),o=e(327),r=e.n(o),l=e(330),c=e.n(l),s=e(316),u=e.n(s),d=e(317),h=e.n(d),f=e(318),p=e.n(f),m=e(319),v=e.n(m),g=e(320),_=e.n(g),E=e(321),w=e.n(E),T=e(322),C=e.n(T),R=e(17),b=e.n(R),k=e(115),D=e.n(k),N=function(n){function t(n){var e;return u()(this,t),e=p()(this,v()(t).call(this,n)),C()(w()(w()(e)),"handle",function(n){if(e.isClickInSide)e.isClickInSide=!1;else if("touchend"===n.type&&(e.isTouch=!0),"click"!==n.type||!e.isTouch){var t=e.props.onClickOutside;!1===e.isUnMounted&&t(n)}}),C()(w()(w()(e)),"handleClick",function(){e.isClickInSide=!0}),e.isTouch=!1,e.isClickInSide=!1,e.isUnMounted=!1,e}return _()(t,n),h()(t,[{key:"componentDidMount",value:function(){document.addEventListener("touchend",this.handle,!1),document.addEventListener("click",this.handle,!1)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("touchend",this.handle,!1),document.removeEventListener("click",this.handle,!1)}},{key:"render",value:function(){var n=this.props,t=n.children,e=(n.onClickOutside,c()(n,["children","onClickOutside"]));return b.a.createElement("div",r()({},e,{onClick:this.handleClick}),t)}}]),t}(R.Component);C()(N,"propTypes",{onClickOutside:D.a.func.isRequired}),e.d(t,"b",function(){return a.a}),e.d(t,"c",function(){return a.b}),e.d(t,"f",function(){return a.e}),e.d(t,"e",function(){return a.d}),e.d(t,"d",function(){return a.c}),e.d(t,"a",function(){return i.a})},328:function(n,t,e){"use strict";e.d(t,"f",function(){return i}),e.d(t,"b",function(){return o}),e.d(t,"a",function(){return r}),e.d(t,"c",function(){return l}),e.d(t,"d",function(){return c}),e.d(t,"h",function(){return s}),e.d(t,"g",function(){return u}),e.d(t,"i",function(){return d}),e.d(t,"e",function(){return h}),e(341);var a,i=(a={travel:{place:"./json/TRS1NEWTRAVEL.js"},"flight.international":{place:"./json/flightsInternationalDestinationCsutomMenu.js",placeAutoComplete:"./json/getarraytkt6.js",filter:"./json/country.json"},"flight.chinese":{place:"./json/GetArrayTkt5.js"},"flight.taiwan":{place:"./json/twflightdest.json"},hotel:{destination:"./json/hotelMenu.json",destinationAutoComplete:"https://hotel.liontravel.com/search/keyword"},"vacation.personal":{departure:"./json/vacationDeparture.json",destination:"./json/vacationdata.json",destinationAutoComplete:"https:////vacation.liontravel.com/ajax/getdestination",keyword:"https:////vacation.liontravel.com/search/keyword"},"vacation.group":{place:"./json/TRS1NEWTRAVELFIT.js"},"vacation.taiwan":{destination:"./json/freeTaiwan.js",keyword:"https://www.liontravel.com/webhl/gethotelnamelist.ashx"},themeTravel:{place:"./json/TRS1PSUBJECT.js"}}).travel,o=a["flight.international"],r=a["flight.chinese"],l=a["flight.taiwan"],c=a.hotel,s=a["vacation.personal"],u=a["vacation.group"],d=a["vacation.taiwan"],h=a.themeTravel},359:function(n,t,e){(n.exports=e(323)(!1)).push([n.i,".flight_taiwan .st_rcln .ic_rcln {\n  color: #999; }\n\n.flight_taiwan .st_rcln .dropdown-place-holder {\n  font-weight: bold;\n  font-size: 16px;\n  color: #0077b3; }\n  .flight_taiwan .st_rcln .dropdown-place-holder .dropdown-label {\n    font-weight: normal;\n    font-size: 14px;\n    color: #999; }\n\n.flight_taiwan .icon .ic_rcln {\n  font-size: 20px;\n  padding-left: 5px;\n  color: #999; }\n\n.flight_taiwan .int_rcln.icon > i {\n  left: 0; }\n\n.flight_taiwan .int_rcln_label {\n  color: #999; }\n\n.flight_taiwan .int_rcln_input {\n  color: #0077b3;\n  font-weight: bold; }\n  .flight_taiwan .int_rcln_input::-webkit-input-placeholder {\n    color: #0077b3; }\n\n.flight_taiwan .calendar_compose .int_rcln.breakline.icon {\n  padding: 5px 0; }\n\n.flight_taiwan .calendar_compose .content {\n  padding-top: 35px; }\n  .flight_taiwan .calendar_compose .content .close_btn {\n    font-size: 24px;\n    padding: 0 8px;\n    right: 0;\n    top: 0; }\n\n.flight_taiwan .bor-right .int_rcln_input {\n  border-right: 1px solid #e3e3e3; }\n\n.flight_taiwan .aroundInput {\n  display: flex; }\n  .flight_taiwan .aroundInput .int_rcln.breakline.icon {\n    padding: 0; }\n  .flight_taiwan .aroundInput .int_rcln .int_rcln_input {\n    padding-top: 25px; }\n  .flight_taiwan .aroundInput .int_rcln .int_rcln_label {\n    font-size: 14px; }\n  .flight_taiwan .aroundInput .int_rcln:first-child .int_rcln_input {\n    padding-left: 38px !important; }\n  .flight_taiwan .aroundInput .int_rcln:first-child .int_rcln_label {\n    left: 37px; }\n  .flight_taiwan .aroundInput .clearBtn {\n    display: none; }\n    @media (min-width: 980px) {\n      .flight_taiwan .aroundInput .clearBtn {\n        display: block; } }\n\n.flight_taiwan .footer {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 18px; }\n  .flight_taiwan .footer .footerInfo {\n    color: #24a07d;\n    line-height: 1.43; }\n    .flight_taiwan .footer .footerInfo a {\n      color: #24a07d;\n      text-decoration: underline;\n      cursor: pointer; }\n  .flight_taiwan .footer + button {\n    margin-top: 80px; }\n    @media (min-width: 980px) {\n      .flight_taiwan .footer + button {\n        margin-top: 0; } }\n\n.flight_taiwan .Rtow {\n  flex: 0 0 30%;\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n  border-bottom: 1px solid #b0b0b0;\n  background-color: transparent;\n  border-right: none;\n  font-size: 16px; }\n  .flight_taiwan .Rtow li {\n    cursor: pointer;\n    width: auto;\n    color: #888;\n    font-weight: 700;\n    display: inline-block;\n    border-bottom: 2px solid transparent;\n    margin: 0 10px -1px 0;\n    text-align: center;\n    padding: 7px 8px; }\n    .flight_taiwan .Rtow li.active {\n      color: #e10500;\n      border-color: #e10500;\n      background-color: transparent;\n      width: auto; }\n\n.flight_taiwan .pos-bottom {\n  bottom: 0; }\n",""])},390:function(n,t,e){var a=e(359);"string"==typeof a&&(a=[[n.i,a,""]]);var i=e(324)(a,{hmr:!0,transform:void 0,insertInto:void 0});a.locals&&(n.exports=a.locals),n.hot.accept(359,function(){var t=e(359);if("string"==typeof t&&(t=[[n.i,t,""]]),!function(n,t){var e,a=0;for(e in n){if(!t||n[e]!==t[e])return!1;a++}for(e in t)a--;return 0===a}(a.locals,t.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");i(t)}),n.hot.dispose(function(){i()})}}]);