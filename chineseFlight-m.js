(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{308:function(n,e,t){"use strict";t.r(e);var a=t(338),i=t.n(a),o=t(316),l=t.n(o),c=t(317),r=t.n(c),s=t(318),d=t.n(s),u=t(319),h=t.n(u),p=t(320),f=t.n(p),m=t(321),g=t.n(m),v=t(322),_=t.n(v),C=t(17),b=t.n(C),w=t(328),k=(t(388),t(340)),y=t(333),E=t(329),x=t(367),T=t(365),S=t(354),j=t(337),A=t(415),N=t(397),D=t(361),M=t(315),O=function(n){return b.a.createElement(E.a,{request:!0,value:"共".concat(n.peopleNumber,"人，").concat([n.cabin]),label:"人數/艙等",icon:b.a.createElement(y.a,{name:"toolstaff"}),readOnly:!0})},F=[{text:"經濟艙",value:"0"},{text:"商務艙",value:"1"},{text:"頭等艙",value:"2"}],I=function(n){return b.a.createElement("div",{className:"footerInfo"},b.a.createElement(y.a,{name:"toolif",className:"p-r-xs"}),"若欲訂購來回程機票，請分開訂位。")},L=function(n){return b.a.createElement("p",null,"例如:需預訂上海 → 北京 → 上海來回機票，請上海 → 北京單程票預定一張訂票，北京 → 上海單程票另外預定一張訂單")},z=function(n){function e(){var n,t;l()(this,e);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return t=d()(this,(n=h()(e)).call.apply(n,[this].concat(o))),_()(g()(g()(t)),"state",{selectedStartDate:"2018-10-22",showCalendar:!1}),_()(g()(g()(t)),"calendar",null),_()(g()(g()(t)),"showCalendar",function(){t.setState(function(n){return i()({},n,{showCalendar:!0})})}),_()(g()(g()(t)),"handleClose",function(){t.setState({showCalendar:!1})}),_()(g()(g()(t)),"handleConfirm",function(){var n=t.calendar.state.selectedStartDate;t.props.selectDate&&t.props.selectDate(n),t.setState(function(e){return{selectedStartDate:n,showCalendar:!1}})}),t}return f()(e,n),r()(e,[{key:"render",value:function(){var n=this,e=this.state,t=e.selectedStartDate,a=e.showCalendar;return b.a.createElement(b.a.Fragment,null,b.a.createElement("div",{onClick:this.showCalendar},b.a.createElement("span",null,t)),b.a.createElement(S.a,{visible:a,direction:"right"},b.a.createElement("span",{className:"nvb_rslb_goBack",onClick:this.handleClose},b.a.createElement(y.a,{name:"toolbefore"})),a&&b.a.createElement(T.a,{selectedStartDate:t,startLabelTitle:"入住日",ref:function(e){n.calendar=e},onClickConfirm:this.handleConfirm})))}}]),e}(C.Component),R=function(n){function e(n){var t;return l()(this,e),t=d()(this,h()(e).call(this,n)),_()(g()(g()(t)),"getOptionData",function(){M.a.fetchJsToObj(w.a.place,t.getData)}),_()(g()(g()(t)),"getData",function(n){t.handleGetData(n.vCity)}),_()(g()(g()(t)),"handleGetData",function(n){var e=[];for(var a in n)if(n.hasOwnProperty(a)){var i={text:n[a],value:a};e.push(i)}t.setState({isLoaded:!0,options:e})}),_()(g()(g()(t)),"selectDate",function(n){var e=n.replace(/\-/g,"");t.setState({sFdate:e})}),_()(g()(g()(t)),"selectCabin",function(n){t.setState({sClass:n,cabinText:F[n].text})}),_()(g()(g()(t)),"onClickAdd",function(){var n=t.state,e=n.sAdt,a=n.max,i=e+1;a<=i&&(i=a),t.setState({sAdt:i})}),_()(g()(g()(t)),"onClickMinus",function(){var n=t.state,e=n.sAdt,a=n.min,i=e-1;i<=a&&(i=a),t.setState({sAdt:i})}),_()(g()(g()(t)),"handleSubmit",function(){var n=t.state,e=n.sFcity,a=n.sTcity,i=n.sFdate,o=n.sAdt,l=n.sClass,c=n.sTktkind,r=n.sChd,s=n.sTairp,d=n.sFairp;t.validate(function(n,u){if(n){var h="sFcity=".concat(e,"&sTcity=").concat(a,"&sFdate=").concat(i,"&sAdt=").concat(o,"&sClass=").concat(l,"&sTktkind=").concat(c,"&sChd=").concat(r,"&sTairp=").concat(s,"&sFairp=").concat(d);window.open("https://www.liontravel.com/webtk/webtkcn01.aspx?"+h,t.props.hrefTarget)}else alert("請選擇"+u.join("、"))})}),_()(g()(g()(t)),"validate",function(n){var e=t.state,a=e.sFairp,i=e.sTairp,o=e.sFcity,l=e.sTcity,c=[];""!==a&&""!==o||c.push("出發機場"),""!==i&&""!==l||c.push("目的機場"),n(0===c.length,c)}),t.state={sFairp:"XZM",sTairp:"SHA",sFcity:"MFM",sTcity:"SHA",sFdate:"20181022",sAdt:1,sChd:0,sClass:0,sTktkind:"CN",max:10,min:1,cabinText:"經濟艙",options:[],isLoaded:!1},t}return f()(e,n),r()(e,[{key:"componentDidMount",value:function(){this.getOptionData()}},{key:"dptChange",value:function(n){var e=n.split("_"),t=e[1],a=e[2];this.setState({sFairp:t,sFcity:a})}},{key:"dtnChange",value:function(n){var e=n.split("_"),t=e[1],a=e[2];this.setState({sTairp:t,sTcity:a})}},{key:"render",value:function(){var n=this,e=this.state,t=e.isLoaded,a=e.options;return b.a.createElement(b.a.Fragment,null,b.a.createElement(A.a,{label:"大陸國內機票"},b.a.createElement("div",{className:"flight_chinese m-t-sm"},t&&0<a.length?b.a.createElement(b.a.Fragment,null,b.a.createElement(k.a,{ClassName:"m-b-sm",option:a,placeholder:"請選擇",label:"出發機場",icon:b.a.createElement(y.a,{name:"planeairplane"}),req:!0,breakline:!0,onChangeCallBack:function(e){n.dptChange(e)},defaultValue:"_PEK_PEK"}),b.a.createElement(k.a,{ClassName:"m-b-sm",option:a,placeholder:"請選擇",label:"目的機場",icon:b.a.createElement(y.a,{name:"toolmap"}),req:!0,breakline:!0,onChangeCallBack:function(e){n.dtnChange(e)},defaultValue:"_SHA_SHA"}),b.a.createElement("div",{className:"st_rcln m-b-sm dpt"},b.a.createElement("i",{className:"ic_rcln tooldate"}),b.a.createElement("div",{className:"dropdown-place-holder selected breakline withIcon"},b.a.createElement("span",{className:"dropdown-label req breakline"},"出發日期"),b.a.createElement(z,{selectDate:this.selectDate}))),b.a.createElement(N.a,{moduleClassName:"peopleAndCabin",CustomComponent:b.a.createElement(O,{cabin:this.state.cabinText,peopleNumber:this.state.sAdt}),ContentComponent:b.a.createElement(b.a.Fragment,null,b.a.createElement(k.a,{option:F,placeholder:"經濟艙",label:"艙等",req:!0,whenCloseCallBack:function(){},onChangeCallBack:function(e){return n.selectCabin(e)}}),b.a.createElement("div",{className:"peopleContent"},b.a.createElement("p",null,"人數"),b.a.createElement(x.a,{max:this.state.max,min:this.state.min,count:this.state.sAdt,btnClassMinus:"ic_rcln toolcancelb",btnClassAdd:"ic_rcln tooladdb",onClickAdd:this.onClickAdd,onClickMinus:this.onClickMinus}))),whenOpen:function(n){},whenClose:function(n){}}),b.a.createElement("div",{className:"footer"},b.a.createElement(D.a,{CustomComponent:b.a.createElement(I,null),ContentComponent:b.a.createElement(L,null),moduleClassName:"PpRcln2 m-r-xxl",events:["click","hover"],position:["bottom","horizon_center"]}),b.a.createElement(j.a,{radius:!0,prop:"string",className:"h-sm",lg:!0,whenClick:function(){n.handleSubmit()}},"搜尋"))):null)))}}]),e}(C.Component);_()(R,"defaultProps",{doubleMonth:!1});var B=R;t.d(e,"default",function(){return B})},315:function(n,e,t){"use strict";t.d(e,"b",function(){return o}),t.d(e,"e",function(){return l}),t.d(e,"d",function(){return c}),t.d(e,"c",function(){return r}),t.d(e,"a",function(){return s});var a=t(334),i=t.n(a);function o(n,e){fetch(n,{method:"GET"}).then(function(n){return n.text()}).then(function(n){var e=n.replace(/\r?\n|\r/g,"").replace(/(?:var|let|const)\s(\w+)\s=/g,'"$1":').replace(/;/g,",").replace(/,$/g,"").replace(/'/g,'"');return JSON.parse("{"+e+"}")}).then(function(n){e(n)})}function l(n){var e=n,t="",a=Object.keys(e).length,i=0;for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t+=a<=++i?o+"="+e[o]:o+"="+e[o]+"&");return t}function c(n){var e=n.split("-"),t=i()(e,2),a=t[0],o=t[1];return[a=Number(a),o=Number(o)]}function r(){return new Date((new Date).getFullYear(),(new Date).getMonth(),1,8).toISOString().slice(0,7)}var s={fetchJsToObj:o,findHighestZIndex:function(n){for(var e=document.getElementsByTagName(n),t=0,a=0;a<e.length;a++){var i=document.defaultView.getComputedStyle(e[a],null).getPropertyValue("z-index");t<i&&"auto"!==i&&(t=i)}return parseInt(t,10)},getDomPosition:function(n,e){return"top"===e?n.getBoundingClientRect()[e]+window.pageYOffset:n.getBoundingClientRect()[e]},toQueryString:l,getYearAndMonth:c,getNowMonth:r}},325:function(n,e,t){"use strict";t.d(e,"a",function(){return S});var a=t(327),i=t.n(a),o=t(330),l=t.n(o),c=t(316),r=t.n(c),s=t(317),d=t.n(s),u=t(318),h=t.n(u),p=t(319),f=t.n(p),m=t(320),g=t.n(m),v=t(321),_=t.n(v),C=t(322),b=t.n(C),w=t(17),k=t.n(w),y=t(84),E=t.n(y),x=t(115),T=t.n(x),S=function(n){function e(n){var t;return r()(this,e),t=h()(this,f()(e).call(this,n)),b()(_()(_()(t)),"handle",function(n){if(!t.__domNode.contains(n.target)){var e=t.props.onClickOutside;"function"==typeof e&&e(n)}}),t.isTouch=!1,t.isClickInSide=!1,t.isUnMounted=!1,t.__domNode=null,t.__wrappedInstance=null,t}return g()(e,n),d()(e,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handle,!0)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("click",this.handle,!0)}},{key:"render",value:function(){var n=this,e=this.props,t=e.children,a=(e.onClickOutside,l()(e,["children","onClickOutside"]));return k.a.createElement("div",i()({},a,{ref:function(e){n.__domNode=E.a.findDOMNode(e),n.__wrappedInstance=e}}),t)}}]),e}(w.Component);b()(S,"propTypes",{onClickOutside:T.a.func.isRequired})},326:function(n,e,t){"use strict";var a=t(315),i=t(325),o=t(327),l=t.n(o),c=t(330),r=t.n(c),s=t(316),d=t.n(s),u=t(317),h=t.n(u),p=t(318),f=t.n(p),m=t(319),g=t.n(m),v=t(320),_=t.n(v),C=t(321),b=t.n(C),w=t(322),k=t.n(w),y=t(17),E=t.n(y),x=t(115),T=t.n(x),S=function(n){function e(n){var t;return d()(this,e),t=f()(this,g()(e).call(this,n)),k()(b()(b()(t)),"handle",function(n){if(t.isClickInSide)t.isClickInSide=!1;else if("touchend"===n.type&&(t.isTouch=!0),"click"!==n.type||!t.isTouch){var e=t.props.onClickOutside;!1===t.isUnMounted&&e(n)}}),k()(b()(b()(t)),"handleClick",function(){t.isClickInSide=!0}),t.isTouch=!1,t.isClickInSide=!1,t.isUnMounted=!1,t}return _()(e,n),h()(e,[{key:"componentDidMount",value:function(){document.addEventListener("touchend",this.handle,!1),document.addEventListener("click",this.handle,!1)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("touchend",this.handle,!1),document.removeEventListener("click",this.handle,!1)}},{key:"render",value:function(){var n=this.props,e=n.children,t=(n.onClickOutside,r()(n,["children","onClickOutside"]));return E.a.createElement("div",l()({},t,{onClick:this.handleClick}),e)}}]),e}(y.Component);k()(S,"propTypes",{onClickOutside:T.a.func.isRequired}),t.d(e,"b",function(){return a.a}),t.d(e,"c",function(){return a.b}),t.d(e,"f",function(){return a.e}),t.d(e,"e",function(){return a.d}),t.d(e,"d",function(){return a.c}),t.d(e,"a",function(){return i.a})},328:function(n,e,t){"use strict";t.d(e,"f",function(){return i}),t.d(e,"b",function(){return o}),t.d(e,"a",function(){return l}),t.d(e,"c",function(){return c}),t.d(e,"d",function(){return r}),t.d(e,"h",function(){return s}),t.d(e,"g",function(){return d}),t.d(e,"i",function(){return u}),t.d(e,"e",function(){return h}),t(341);var a,i=(a={travel:{place:"./json/TRS1NEWTRAVEL.js"},"flight.international":{place:"./json/flightsInternationalDestinationCsutomMenu.js",placeAutoComplete:"./json/getarraytkt6.js",filter:"./json/country.json"},"flight.chinese":{place:"./json/GetArrayTkt5.js"},"flight.taiwan":{place:"./json/twflightdest.json"},hotel:{destination:"./json/hotelMenu.json",destinationAutoComplete:"https://hotel.liontravel.com/search/keyword"},"vacation.personal":{departure:"./json/vacationDeparture.json",destination:"./json/vacationdata.json",destinationAutoComplete:"https:////vacation.liontravel.com/ajax/getdestination",keyword:"https:////vacation.liontravel.com/search/keyword"},"vacation.group":{place:"./json/TRS1NEWTRAVELFIT.js"},"vacation.taiwan":{destination:"./json/freeTaiwan.js",keyword:"https://www.liontravel.com/webhl/gethotelnamelist.ashx"},themeTravel:{place:"./json/TRS1PSUBJECT.js"}}).travel,o=a["flight.international"],l=a["flight.chinese"],c=a["flight.taiwan"],r=a.hotel,s=a["vacation.personal"],d=a["vacation.group"],u=a["vacation.taiwan"],h=a.themeTravel},359:function(n,e,t){(n.exports=t(323)(!1)).push([n.i,".flight_chinese .st_rcln .ic_rcln {\n  color: #999; }\n\n.flight_chinese .st_rcln .dropdown-place-holder {\n  font-weight: bold;\n  font-size: 16px;\n  color: #0077b3; }\n  .flight_chinese .st_rcln .dropdown-place-holder .dropdown-label {\n    font-weight: normal;\n    font-size: 14px;\n    color: #999; }\n  .flight_chinese .st_rcln .dropdown-place-holder input {\n    width: 100%;\n    color: #0077b3; }\n  .flight_chinese .st_rcln .dropdown-place-holder .cy_rcln {\n    color: black; }\n  .flight_chinese .st_rcln .dropdown-place-holder.selected {\n    color: #0077b3; }\n\n.flight_chinese .icon .ic_rcln {\n  font-size: 20px;\n  padding-left: 5px;\n  color: #999; }\n\n.flight_chinese .int_rcln.icon > i {\n  left: 0; }\n\n.flight_chinese .int_rcln_input {\n  color: #0077b3;\n  font-weight: bold; }\n  .flight_chinese .int_rcln_input::-webkit-input-placeholder {\n    color: #0077b3; }\n\n.flight_chinese .dpt:after {\n  content: '';\n  display: none; }\n\n.flight_chinese .bor-right .int_rcln_input {\n  border-right: 1px solid #e3e3e3; }\n\n.flight_chinese .peopleAndCabin .int_rcln_label {\n  font-size: 14px; }\n\n.flight_chinese .peopleAndCabin .int_rcln_input {\n  padding-top: 22px; }\n\n.flight_chinese .footer button {\n  width: 100%;\n  margin-top: 80px; }\n\n.flight_chinese .footer .footerInfo {\n  color: #1c9c9d;\n  margin: 10px 0; }\n  .flight_chinese .footer .footerInfo a {\n    text-decoration: none;\n    cursor: pointer; }\n\n@media (min-width: 980px) {\n  .flight_chinese .footer button {\n    width: 90px;\n    float: right;\n    margin-top: 24px; } }\n\n.flight_chinese .st_rnls_descendant_content {\n  padding-right: 30px; }\n  .flight_chinese .st_rnls_descendant_content .st_rcln {\n    width: auto; }\n    .flight_chinese .st_rnls_descendant_content .st_rcln .dropdown-place-holder {\n      color: #0077b3; }\n  .flight_chinese .st_rnls_descendant_content .peopleContent {\n    padding-top: 10px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center; }\n  .flight_chinese .st_rnls_descendant_content .st_rnls_descendant_content_close {\n    font-size: 16px; }\n\n.flight_chinese .cy_rcln .prev,\n.flight_chinese .cy_rcln .next {\n  z-index: 100; }\n\n.flight_chinese .cy_rcln .calendar_box {\n  z-index: 99; }\n\n.flight_chinese .pcCalendarCont {\n  position: relative; }\n  .flight_chinese .pcCalendarCont .cy_rcln {\n    position: absolute;\n    top: 26px;\n    left: 0;\n    z-index: 5; }\n\n.flight_chinese .peopleAndCabin {\n  position: relative; }\n  .flight_chinese .peopleAndCabin .st_rnls_descendant_content {\n    position: absolute;\n    top: 49px;\n    left: 0;\n    width: 100% !important;\n    z-index: 5; }\n",""])},388:function(n,e,t){var a=t(359);"string"==typeof a&&(a=[[n.i,a,""]]);var i=t(324)(a,{hmr:!0,transform:void 0,insertInto:void 0});a.locals&&(n.exports=a.locals),n.hot.accept(359,function(){var e=t(359);if("string"==typeof e&&(e=[[n.i,e,""]]),!function(n,e){var t,a=0;for(t in n){if(!e||n[t]!==e[t])return!1;a++}for(t in e)a--;return 0===a}(a.locals,e.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");i(e)}),n.hot.dispose(function(){i()})}}]);