(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{298:function(t,e,n){"use strict";n.r(e);var o=n(311),a=n.n(o),i=n(312),l=n.n(i),r=n(313),c=n.n(r),s=n(314),u=n.n(s),h=n(315),d=n.n(h),p=n(316),m=n.n(p),f=n(317),C=n.n(f),g=n(20),v=n.n(g),_=n(83),x=n.n(_),D=n(613),y=n.n(D),k=n(322),b=n(327),E=n(330),R=n(337),S=n(328),w=n(335),P=n.n(w),A=n(363),N=n(332),I=n(450);function M(t){for(var e=t.length,n="共".concat(e,"間，"),o=0,a=0,i=0;i<t.length;i++)o+=t[i].AdultQty,a+=t[i].ChildAges.length;return(n+="".concat(o,"位大人、").concat(a,"位小孩")).replace(/\、$/g,"人")}var Y=[{text:"共1間",value:1},{text:"共2間",value:2},{text:"共3間",value:3},{text:"共4間",value:4},{text:"共5間",value:5},{text:"共6間",value:6},{text:"共7間",value:7}],O=function(t){var e=t.onchange,n=t.defaultValue;return v.a.createElement("label",{className:"children_age_select"},v.a.createElement("select",{onChange:e,defaultValue:n},v.a.createElement("option",{value:"0"},"0歲"),v.a.createElement("option",{value:"1"},"1歲"),v.a.createElement("option",{value:"2"},"2歲"),v.a.createElement("option",{value:"3"},"3歲"),v.a.createElement("option",{value:"4"},"4歲"),v.a.createElement("option",{value:"5"},"5歲"),v.a.createElement("option",{value:"6"},"6歲"),v.a.createElement("option",{value:"7"},"7歲"),v.a.createElement("option",{value:"8"},"8歲"),v.a.createElement("option",{value:"9"},"9歲"),v.a.createElement("option",{value:"10"},"10歲"),v.a.createElement("option",{value:"11"},"11歲"),v.a.createElement("option",{value:"12"},"12歲")))},T=function(t){var e=t.ageArray,n=t.onChange,o=t.roomCount,a=t.target;return v.a.createElement("div",{className:"children_ages_section"},v.a.createElement("span",{className:"row_title"},"小孩年齡"),v.a.createElement("div",{className:"age_select_section"},e.map(function(t,e){return v.a.createElement(O,{key:e,onchange:function(t){n(o,a,e,t.target.value)},defaultValue:t})})))},V=function(t){var e=t.roomCount,n=t.AdultQty,o=t.ChildAges,a=t.maxAdult,i=t.maxChild,l=t.onClickAdd,r=t.onClickMinus,c=t.onInputChange,s=t.onInputBlur,u=t.onChangeChildAge,h=o.length;return v.a.createElement("section",{className:"room_list_section"},v.a.createElement("h4",{className:"room_count_title"},"第".concat(e+1,"間")),v.a.createElement("div",{className:"room_list_row"},v.a.createElement("span",{className:"row_title"},"成人"),v.a.createElement(A.a,{max:20,min:1,readOnly:!1,count:n,btnClassMinus:"ic_rcln toolcancelb",btnClassAdd:"ic_rcln tooladdb",onClickAdd:function(){n<a&&l(e,"AdultQty")},onClickMinus:function(){r(e,"AdultQty")},onInputChange:function(t){c(t,e,"AdultQty")},onInputBlur:function(t){s(t,e,"AdultQty")}})),v.a.createElement("div",{className:"room_list_row"},v.a.createElement("div",{className:"st_child"},v.a.createElement("span",{className:"row_title"},"小孩"),v.a.createElement(A.a,{max:3,min:0,readOnly:!1,count:h,btnClassMinus:"ic_rcln toolcancelb",btnClassAdd:"ic_rcln tooladdb",onClickAdd:function(){h<i&&l(e,"ChildAges")},onClickMinus:function(){r(e,"ChildAges")},onInputChange:function(t){c(t,e,"ChildAges")}})),v.a.createElement("div",{className:"st_childAge"},0<h?v.a.createElement(T,{ageArray:o,onChange:u,roomCount:e,target:"ChildAges"}):null)))},Q=function(t){function e(){var t,n;a()(this,e);for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];return n=c()(this,(t=u()(e)).call.apply(t,[this].concat(i))),C()(m()(m()(n)),"state",{Rooms:[{AdultQty:2,ChildAges:[],ChildQty:0}],maxAdult:20,maxChild:3,minAdult:1,inputText:"共1間，2位大人、0位小孩"}),C()(m()(m()(n)),"changeRoomCount",function(t){var e=n.state.Rooms,o=Number(t),a={AdultQty:1,ChildAges:[],ChildQty:0};if(o!==e.length){for(var i=[],l=0;l<o;l++)i.push(a);var r=M(i);n.setState(function(t){return P()({},t,{inputText:r,Rooms:i})})}}),C()(m()(m()(n)),"onClickAdd",function(t,e){n.setState(function(n){var o=JSON.parse(JSON.stringify(n.Rooms)),a=o[t][e];Object(I.isArray)(a)?(a.push(12),o[t].ChildQty=a.length):a+=1,o[t][e]=a;var i=M(o);return P()({},n,{Rooms:o,inputText:i})})}),C()(m()(m()(n)),"onClickMinus",function(t,e){var o=n.state.minAdult,a=JSON.parse(JSON.stringify(n.state.Rooms)),i=a[t][e];if("AdultQty"===e){if(i===o)return;a[t][e]=i-1}else{if(0===i.length)return;i.pop(),a[t].ChildQty=i.length}var l=M(a);n.setState(function(t){return P()({},t,{Rooms:a,inputText:l})})}),C()(m()(m()(n)),"handleChange",function(t,e,o){var a=t.target.value,i=JSON.parse(JSON.stringify(n.state.Rooms)),l=Number(a);if(!isNaN(l)){var r=n.state,c=r.maxAdult,s=r.maxChild,u=r.minAdult,h=0;if("AdultQty"===o)c<l?(i[e][o]=c,alert("最大人數為20人")):i[e][o]=l<u?0:l;else{i[e][o]=[];var d=i[e][o];h=s<l?s:l;for(var p=0;p<h;p++)d.push(12);i[e][o]=d,i[e].ChildQty=d.length}var m=M(i);n.setState(function(t){return{Rooms:i,inputText:m}})}}),C()(m()(m()(n)),"handleBlur",function(t,e,o){var a=n.state.minAdult,i=JSON.parse(JSON.stringify(n.state.Rooms));if(t.target.value/1==0){i[e][o]=a;var l=M(i);n.setState({Rooms:i,inputText:l})}}),C()(m()(m()(n)),"onChangeChildAge",function(t,e,o,a){var i=JSON.parse(JSON.stringify(n.state.Rooms)),l=Number(a);i[t][e][o]=l,n.setState(function(t){return P()({},t,{Rooms:i})})}),n}return d()(e,t),l()(e,[{key:"componentDidMount",value:function(){this.props.changeSum(this.state)}},{key:"componentDidUpdate",value:function(){this.props.changeSum(this.state)}},{key:"render",value:function(){var t=this,e=this.state,n=e.Rooms,o=e.maxAdult,a=e.maxChild;return v.a.createElement("div",{className:"nvb_content"},v.a.createElement("div",{className:"page_content"},v.a.createElement(N.a,{option:Y,placeholder:"請選擇",label:"間數:",defaultValue:n.length,onChangeCallBack:this.changeRoomCount,ClassName:"m-b-sm"}),n.map(function(e,n){return v.a.createElement(V,{key:n,roomCount:n,AdultQty:e.AdultQty,ChildAges:e.ChildAges,maxAdult:o,maxChild:a,onClickAdd:t.onClickAdd,onClickMinus:t.onClickMinus,onInputChange:t.handleChange,onInputBlur:t.handleBlur,onChangeChildAge:t.onChangeChildAge})})))}}]),e}(g.PureComponent),B=n(342),K=n(415),j=n(339),J=n(320),F=function(t){var e=t.onClick;return v.a.createElement("span",{className:"close_btn",onClick:e})},z=function(t){function e(t){var n;return a()(this,e),n=c()(this,u()(e).call(this,t)),C()(m()(m()(n)),"transformActFetchData",function(t){for(var e=t.Destinations,n=[],o=0;o<e.length;o++){var a={txt:e[o].Name,level2:e[o].KindName,level3:e[o].Code,Kind:e[o].Kind};n.push(a)}return n}),C()(m()(m()(n)),"transformDtmData",function(t){var e=10,o=t.vCountry.split("_")[1],a=t.vCity.split("_");switch(o){case"PCT":e=10;break;case"PCTZ":e=18;break;case"PCTP":e=80}"PCT"===o&&"TW"===a[0]&&3===a.length&&(e=85),"PCTZ"===o&&"string"==typeof a[0]&&"TW"===a[0]&&(e=84),n.setState(function(t){return{Kind:e}})}),C()(m()(m()(n)),"onClickDestnDtmItem",function(t){n.transformDtmData(t);var e=t.vCity;n.setState(function(n){return{selectedData:[t],inputText:t.text,Txt:t.text,hasValue:!1,showDtm:!1,Code:e}})}),C()(m()(m()(n)),"openDestnMenu",function(){var t=n.state,e=t.hasValue,o=t.actShowData;n.state.inputText?(e?n.setState({showAct:!0,showDtm:!1}):n.setState({showAct:!1,showDtm:!0}),0<o.length&&n.setState({showAct:!0,showDtm:!1})):n.setState({showAct:!1,showDtm:!0})}),C()(m()(m()(n)),"closeDestnMenu",function(){var t=n.state,e=t.actShowData,o=t.inputText,a=t.showAct;if(0<e.length){if(0===e.filter(function(t){return t.txt===o}).length){var i=e[0];n.setState({inputText:i.txt,Kind:i.Kind,Code:i.level3,Txt:i.txt})}}else a&&n.setState({inputText:""});n.setState({showAct:!1,showDtm:!1,hasValue:!1})}),C()(m()(m()(n)),"handleDestnKeyDown",function(t){8===t.keyCode&&n.setState(function(t){return{hasValue:!0}})}),C()(m()(m()(n)),"onClickDestnAct",function(t,e){var o=t.Kind,a=t.level3,i=t.txt;"choosed"===e?n.setState(function(e){return{Code:a,Kind:o,Txt:i,inputText:i,dtmSelected:[],selectedData:[t],showAct:!1,hasValue:!1}}):n.setState(function(t){return{Txt:i}})}),C()(m()(m()(n)),"clearDestnValue",function(){n.setState({selectedData:[],inputText:"",showAct:!1,showDtm:!0,actShowData:[],Code:"",Kind:"",Txt:""})}),C()(m()(m()(n)),"onDestnInputChange",function(t){var e=t.target.value,o=t.target.value,a=n.state.rajxHead,i=0<e.length;n.setState(function(t){return{inputText:e,Txt:o,selectedData:[],dtmSelected:[],showAct:i,showDtm:!i}}),clearTimeout(n.timer),n.timer=setTimeout(function(){var t=a+encodeURI(e);n.fetchDestnActData(t,e)},500)}),C()(m()(m()(n)),"fetchDestnActData",function(t){fetch(t).then(function(t){return t.json()}).then(function(t){var e=n.transformActFetchData(t);n.setState(function(t){return{actShowData:e}})})}),C()(m()(m()(n)),"handleBooking",function(t){var e=t.selectedStartDate,o=t.selectedEndDate;n.setState({CheckIn:e,CheckOut:o})}),C()(m()(m()(n)),"openRoomOption",function(){n.setState(function(t){return{roomOptionState:!0}})}),C()(m()(m()(n)),"closehRoomOption",function(){n.setState(function(t){return{roomOptionState:!1}})}),C()(m()(m()(n)),"roomPeopleSum",function(t){var e=t.inputText,o=t.Rooms;n.setState({roomListInput:e,Rooms:o})}),C()(m()(m()(n)),"handleAllotment",function(t){var e=JSON.parse(JSON.stringify(n.state.Filter));e.Allotment=t?"1":"0",n.setState({Filter:e})}),n.searchInput=v.a.createRef(),n.state={Destination:{},Code:"",Kind:"",Txt:"",Rooms:[],CheckIn:"",CheckOut:"",Filter:{Allotment:"0"},selectedData:[],roomOptionState:!1,roomListInput:"",inputText:"",showDtm:!1,showAct:!1,hasValue:!1,actAllData:null,actShowData:[],rajxDataUrl:"",rajxHead:"https://hotel.liontravel.com/search/keyword?keyWord=",dtmDataSrc:"./json/hotelMenu.json",actRules:[{title:"城市",icon:v.a.createElement(b.a,{name:"toolmapf",key:1})},{title:"區域",icon:v.a.createElement(b.a,{name:"traffictrafficcruiseshipf",key:2})},{title:"行政區",icon:v.a.createElement(b.a,{name:"hotelbusinesscen",key:3})},{title:"商圈",icon:v.a.createElement(b.a,{name:"productpricef",key:4})},{title:"地標",icon:v.a.createElement(b.a,{name:"hotelwify",key:5})},{title:"飯店",icon:v.a.createElement(b.a,{name:"hotelforeignBookingf",key:6})}]},n.timer=null,n}return d()(e,t),l()(e,[{key:"render",value:function(){var t=this,e=x.a.bind(y.a)("hotelsRectPC"),n=this.state,o=n.selectedData,a=n.roomListInput,i=n.roomOptionState,l=n.inputText,r=n.showAct,c=n.showDtm,s=n.dtmDataSrc,u=n.actRules,h=n.actShowData,d=o.map(function(t){return t.value}),p=x()("wrap_container",{"d-no":!c}),m=x()("act_wrap_container",{"d-no":!r});return v.a.createElement("div",{className:e},v.a.createElement("div",{className:"".concat(e,"_hotelCont")},v.a.createElement(J.a,{onClickOutside:this.closeDestnMenu},v.a.createElement("div",{className:"destination"},v.a.createElement("div",{className:"input_group"},v.a.createElement(k.a,{placeholder:"目的地、地標、區域、飯店名稱",label:"目的地",request:!0,icon:v.a.createElement(b.a,{name:"toolmap"}),value:this.state.Txt,onChange:this.onDestnInputChange,onClearValue:this.clearDestnValue,onKeyDown:this.handleDestnKeyDown,onClick:this.openDestnMenu})),v.a.createElement("div",{className:p},v.a.createElement("p",{style:{color:"#24a07d"},className:"dtm_rcfr-label"},"找不到選項？請輸入關鍵字查詢"),v.a.createElement(F,{onClick:this.closeDestnMenu}),v.a.createElement(E.a,{levelKey:["inTaiwan","vLine","vCountry","vCity"],onClickItem:this.onClickDestnDtmItem,dataResouce:s,replaceRegular:/[a-zA-Z\(\)\s]/g,selectedData:d})),v.a.createElement("div",{className:m},v.a.createElement(F,{onClick:this.closeDestnMenu}),v.a.createElement(B.a,{titleClass:r?"":"d-no",isFocus:r,data:h,matchWord:l,getItemClickValue:this.onClickDestnAct,minimumStringQuery:"請至少輸入兩個字",noMatchText:"很抱歉，找不到符合的項目",minimumStringQueryLength:2,footer:!1,rules:u})))),v.a.createElement("div",{className:"booking"},v.a.createElement(j.a,{titleTxt:"住房期間",totleNights:!0,onChange:this.handleBooking,setStartDate:1,setOtherEnd:14})),v.a.createElement(J.a,{onClickOutside:this.closehRoomOption},v.a.createElement("div",{className:"roomSetting"},v.a.createElement("div",{className:"input_group"},v.a.createElement(k.a,{placeholder:"共1間，2位大人、0位小孩",label:"間數/人數",icon:v.a.createElement(b.a,{name:"toolmember"}),request:!0,value:a,onClick:this.openRoomOption}),v.a.createElement("div",{className:"stCont ".concat(i?"show":"")},v.a.createElement(F,{onClick:this.closehRoomOption}),v.a.createElement("div",null,v.a.createElement(Q,{changeSum:this.roomPeopleSum}),v.a.createElement("p",{style:{color:"#24a07d"}},"※單次訂購提供相同房型，相同房型不同入住人數依選購的專案售價。")))))),v.a.createElement("div",null,v.a.createElement(R.a,{type:"checkbox",whenChange:this.handleAllotment,textContent:"顯示可立即確認訂房"})),v.a.createElement("div",{className:"searchBtn"},v.a.createElement("a",{className:"bookingToday",href:"http://globalhotel.liontravel.com/?_ga=2.18510781.561999660.1540257880-885419176.1540257880",target:"_blank"},v.a.createElement(b.a,{name:"toolchoosen"}),"我要訂購今日住宿"),v.a.createElement(S.a,{className:"search_button",radius:!0,lg:!0,whenClick:function(){Object(K.a)(t.state)}},"搜尋"))))}}]),e}(g.Component);n.d(e,"default",function(){return z})},320:function(t,e,n){"use strict";var o=n(324),a=n.n(o);function i(t,e){fetch(t,{method:"GET"}).then(function(t){return t.text()}).then(function(t){var e=t.replace(/\r?\n|\r/g,"").replace(/(?:var|let|const)\s(\w+)\s=/g,'"$1":').replace(/;/g,",").replace(/,$/g,"").replace(/'/g,'"');return JSON.parse("{"+e+"}")}).then(function(t){e(t)})}function l(t){var e=t,n="",o=Object.keys(e).length,a=0;for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n+=o<=++a?i+"="+e[i]:i+"="+e[i]+"&");return n}function r(t){var e=t.split("-"),n=a()(e,2),o=n[0],i=n[1];return[o=Number(o),i=Number(i)]}function c(){return new Date((new Date).getFullYear(),(new Date).getMonth(),1,8).toISOString().slice(0,7)}var s=n(321),u=n(323),h=n.n(u),d=n(325),p=n.n(d),m=n(311),f=n.n(m),C=n(312),g=n.n(C),v=n(313),_=n.n(v),x=n(314),D=n.n(x),y=n(315),k=n.n(y),b=n(316),E=n.n(b),R=n(317),S=n.n(R),w=n(20),P=n.n(w),A=n(115),N=n.n(A),I=function(t){function e(t){var n;return f()(this,e),n=_()(this,D()(e).call(this,t)),S()(E()(E()(n)),"handle",function(t){if(n.isClickInSide)n.isClickInSide=!1;else if("touchend"===t.type&&(n.isTouch=!0),"click"!==t.type||!n.isTouch){var e=n.props.onClickOutside;!1===n.isUnMounted&&e(t)}}),S()(E()(E()(n)),"handleClick",function(){n.isClickInSide=!0}),n.isTouch=!1,n.isClickInSide=!1,n.isUnMounted=!1,n}return k()(e,t),g()(e,[{key:"componentDidMount",value:function(){document.addEventListener("touchend",this.handle,!1),document.addEventListener("click",this.handle,!1)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("touchend",this.handle,!1),document.removeEventListener("click",this.handle,!1)}},{key:"render",value:function(){var t=this.props,e=t.children,n=(t.onClickOutside,p()(t,["children","onClickOutside"]));return P.a.createElement("div",h()({},n,{onClick:this.handleClick}),e)}}]),e}(w.Component);S()(I,"propTypes",{onClickOutside:N.a.func.isRequired}),n.d(e,"b",function(){return i}),n.d(e,"e",function(){return l}),n.d(e,"d",function(){return r}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return s.a})},321:function(t,e,n){"use strict";n.d(e,"a",function(){return S});var o=n(323),a=n.n(o),i=n(325),l=n.n(i),r=n(311),c=n.n(r),s=n(312),u=n.n(s),h=n(313),d=n.n(h),p=n(314),m=n.n(p),f=n(315),C=n.n(f),g=n(316),v=n.n(g),_=n(317),x=n.n(_),D=n(20),y=n.n(D),k=n(84),b=n.n(k),E=n(115),R=n.n(E),S=function(t){function e(t){var n;return c()(this,e),n=d()(this,m()(e).call(this,t)),x()(v()(v()(n)),"handle",function(t){if(!n.__domNode.contains(t.target)){var e=n.props.onClickOutside;"function"==typeof e&&e(t)}}),n.isTouch=!1,n.isClickInSide=!1,n.isUnMounted=!1,n.__domNode=null,n.__wrappedInstance=null,n}return C()(e,t),u()(e,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handle,!0)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("click",this.handle,!0)}},{key:"render",value:function(){var t=this,e=this.props,n=e.children,o=(e.onClickOutside,l()(e,["children","onClickOutside"]));return y.a.createElement("div",a()({},o,{ref:function(e){t.__domNode=b.a.findDOMNode(e),t.__wrappedInstance=e}}),n)}}]),e}(D.Component);x()(S,"propTypes",{onClickOutside:R.a.func.isRequired})},326:function(t,e,n){(t.exports=n(318)(!1)).push([t.i,".input_group {\n  display: flex;\n  margin-bottom: 10px;\n  border: 1px solid #ddd; }\n  .input_group .int_rcln .int_rcln_input {\n    color: #0077b3;\n    font-weight: bold;\n    border: none; }\n    .input_group .int_rcln .int_rcln_input:focus {\n      border-color: #ddd; }\n  .input_group .int_rcln:last-of-type {\n    height: 50px; }\n    .input_group .int_rcln:last-of-type .int_rcln_input {\n      padding-top: 26px; }\n  .input_group .cal_icon {\n    color: #999;\n    display: inline-flex;\n    align-items: center; }\n  .input_group > div {\n    flex: 1; }\n  .input_group .vacation_select_group {\n    padding: 6px 0; }\n    .input_group .vacation_select_group > label,\n    .input_group .vacation_select_group > select {\n      padding: 0 6px;\n      line-height: 1; }\n    .input_group .vacation_select_group > label {\n      display: block;\n      color: #aaa;\n      font-size: 16px; }\n      .input_group .vacation_select_group > label.request:after {\n        content: '*';\n        display: inline-block;\n        color: #e10500;\n        vertical-align: middle;\n        line-height: 1;\n        margin-top: 4px; }\n    .input_group .vacation_select_group > select {\n      border: none;\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      width: 100%;\n      font-size: 16px;\n      color: #0077b3;\n      font-weight: bold; }\n",""])},329:function(t,e,n){(t.exports=n(318)(!1)).push([t.i,".calendar_compose {\n  position: relative; }\n  .calendar_compose .content {\n    padding: 30px 10px 10px;\n    border: solid 1px #ddd;\n    background-color: #fff;\n    position: absolute;\n    top: 100%;\n    left: 0;\n    z-index: 5; }\n    .calendar_compose .content .close_btn {\n      position: absolute;\n      right: 5px;\n      top: 5px;\n      z-index: 1;\n      background-color: transparent;\n      border: none;\n      font-weight: bold;\n      outline: none; }\n",""])},336:function(t,e,n){var o=n(326);"string"==typeof o&&(o=[[t.i,o,""]]);var a=n(319)(o,{hmr:!0,transform:void 0,insertInto:void 0});o.locals&&(t.exports=o.locals),t.hot.accept(326,function(){var e=n(326);if("string"==typeof e&&(e=[[t.i,e,""]]),!function(t,e){var n,o=0;for(n in t){if(!e||t[n]!==e[n])return!1;o++}for(n in e)o--;return 0===o}(o.locals,e.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");a(e)}),t.hot.dispose(function(){a()})},339:function(t,e,n){"use strict";var o=n(324),a=n.n(o),i=n(335),l=n.n(i),r=n(311),c=n.n(r),s=n(312),u=n.n(s),h=n(313),d=n.n(h),p=n(314),m=n.n(p),f=n(315),C=n.n(f),g=n(316),v=n.n(g),_=n(317),x=n.n(_),D=n(20),y=n.n(D),k=n(331),b=n.n(k),E=n(345),R=n(322),S=n(327),w=n(320),P=(n(340),n(336),function(t){function e(t){var n;return c()(this,e),n=d()(this,m()(e).call(this,t)),x()(v()(v()(n)),"clearValue",function(t){return"start"===t?n.setState(function(t){return l()({},t,{startInputValue:"",selectedStartDate:""})},n.onChange):n.setState(function(t){return l()({},t,{selectedEndDate:"",endInputValue:""})},n.onChange)}),x()(v()(v()(n)),"closeCalendar",function(){n.setState(function(t){return l()({},t,{activeInput:null})})}),x()(v()(v()(n)),"checkDate",function(t){var e="start"===t,o=n.state,i=o.selectedStartDate,l=o.selectedEndDate,r=o.startInputValue,c=o.endInputValue,s=e?r:c,u=e?s===i:s===l;if(s.length&&!u){var h=s.match(/^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/);if(null===h)return alert("請輸入正確的日期格式(YYYYMMDD) EX: 20180101");var d=a()(h,4),p=(d[0],d[1]),m=d[2],f=d[3],C="".concat(p,"-").concat(m,"-").concat(f),g=b()(C),v=n.calcStartDate();return g.isValid()?g.isBefore(v)?alert("日期小於最小可選日期"):void n.clickDate(C):alert("無效的日期")}}),x()(v()(v()(n)),"inputChange",function(t){var e=t.target.value,o=n.state.activeInput,a="".concat(o,"InputValue");n.setState(function(t){return l()({},t,x()({},a,e))},n.onChange)}),x()(v()(v()(n)),"inputFocus",function(t){n.setState(function(e){return l()({},e,{activeInput:t})})}),x()(v()(v()(n)),"clickDate",function(t){var e=n.state,o=e.activeInput,a=e.selectedStartDate,i="start"===o,l=i?t:a,r=i?"":t;n.setState(function(t){return{activeInput:i?"end":null,selectedStartDate:l,selectedEndDate:r,startInputValue:l,endInputValue:r}},n.onChange)}),n.state={selectedStartDate:"",selectedEndDate:"",startInputValue:"",endInputValue:"",activeInput:null},n}return C()(e,t),u()(e,[{key:"onChange",value:function(){this.props.onChange(this.state)}},{key:"calcStartDate",value:function(){var t=this.state,e=t.selectedStartDate,n=t.activeInput,o=this.props.setStartDate,a=b()();return"end"===n?e.length?e:a.format("YYYY-MM-DD"):"number"==typeof o?0<o?a.add(o,"day").format("YYYY-MM-DD"):a.subtract(o,"day").format("YYYY-MM-DD"):a.format("YYYY-MM-DD")}},{key:"diffDate",value:function(){var t=this.state,e=t.startInputValue,n=t.endInputValue;if(!e.length||!n.length||e.length!==n.length)return"";var o=new Date(e.replace(/\-/g,"/")).getTime();return(new Date(n.replace(/\-/g,"/")).getTime()-o)/864e5}},{key:"setActiveEndDay",value:function(){var t=this.props,e=t.setActiveEnd,n=t.setOtherEnd,o=this.state.selectedStartDate;return"number"==typeof n&&o?b()().add(n,"days").format("YYYY-MM-DD"):b()().add(e,"months").format("YYYY-MM")}},{key:"setEndDay",value:function(){var t=this.props,e=t.setEndDate,n=t.setOtherEnd,o=this.state.selectedStartDate;return"number"==typeof n?o?b()(o).add(n,"days").format("YYYY-MM-DD"):b()().add(e,"months").format("YYYY-MM"):b()().add(e,"months").format("YYYY-MM-DD")}},{key:"render",value:function(){var t=this,e=this.state,n=e.selectedStartDate,o=e.selectedEndDate,a=e.startInputValue,i=e.endInputValue,l=e.activeInput,r=this.props.totleNights,c=this.calcStartDate(),s=this.setActiveEndDay(),u=this.setEndDay();return y.a.createElement(w.a,{onClickOutside:this.closeCalendar},y.a.createElement("div",{className:"calendar_compose"},y.a.createElement("div",{className:"input_group"},y.a.createElement(R.a,{request:!0,placeholder:"YYYY/MM/DD",label:this.props.titleTxt?this.props.titleTxt:"出發區間",icon:y.a.createElement(S.a,{name:"tooldate"}),onFocus:function(){t.inputFocus("start")},onChange:this.inputChange,onBlur:function(){t.checkDate("start")},onClearValue:function(){t.clearValue("start")},value:a.replace(/\-/g,"/")}),y.a.createElement("span",{className:"cal_icon"},"~"),y.a.createElement(R.a,{request:!0,placeholder:"YYYY/MM/DD",onChange:this.inputChange,onFocus:function(){t.inputFocus("end")},onBlur:function(){t.checkDate("end")},onClearValue:function(){t.clearValue("end")},value:i.replace(/\-/g,"/")}),0<this.diffDate()&&r?y.a.createElement("span",{className:"nights"},"共".concat(this.diffDate(),"晚")):null),null===l?null:y.a.createElement("div",{className:"content"},y.a.createElement("button",{className:"close_btn",onClick:this.closeCalendar},"X"),y.a.createElement(E.a,{doubleMonth:!0,doubleChoose:!0,startDate:c,activeStart:b()().format("YYYY-MM"),activeEnd:s,endDate:u,selectedStartDate:n,selectedEndDate:o,onDateClick:this.clickDate}))))}}]),e}(D.PureComponent));x()(P,"defaultProps",{onChange:function(){},setEndDate:12,setActiveEnd:12}),e.a=P},340:function(t,e,n){var o=n(329);"string"==typeof o&&(o=[[t.i,o,""]]);var a=n(319)(o,{hmr:!0,transform:void 0,insertInto:void 0});o.locals&&(t.exports=o.locals),t.hot.accept(329,function(){var e=n(329);if("string"==typeof e&&(e=[[t.i,e,""]]),!function(t,e){var n,o=0;for(n in t){if(!e||t[n]!==e[n])return!1;o++}for(n in e)o--;return 0===o}(o.locals,e.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");a(e)}),t.hot.dispose(function(){a()})},415:function(t,e,n){"use strict";function o(t){var e=t,n="",o=Object.keys(e).length,a=0;for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n+=o<=++a?'"'+i+'":"'+e[i]+'"':'"'+i+'":"'+e[i]+'",');return n}e.a=function(t){var e=t.Destination,n=t.Code,a=t.Kind,i=t.Txt,l=t.Rooms,r=t.Filter,c=t.CheckIn,s=t.CheckOut;if(e.Code=n,e.Kind=a,e.Txt=i,!c.length)return alert("請選擇住房期間、請輸入必填欄位喔！");if(!s.length)return alert("請輸入必填欄位喔！");if(!e.length&&!i.length)return alert("目的地或關鍵字擇一必填");var u=o({CheckIn:c.replace(/\-/g,"/"),CheckOut:s.replace(/\-/g,"/")})+",",h='"Rooms":['+l.map(function(t){return""+'{"AdultQty":"'.concat(t.AdultQty,'","ChildQty":"').concat(t.ChildQty,'","ChildAges":[').concat(t.ChildAges.map(function(t){return'"'.concat(t,'"')}),"]}")})+"],",d='"Filter":{'+o(r)+"},",p='"Destination":{'+o(e)+"}",m=encodeURIComponent("{"+u+h+d+p+"}");window.location.href="".concat("https://hotel.liontravel.com/","search?searchParam=").concat(m)}},416:function(t,e,n){(t.exports=n(318)(!1)).push([t.i,"/**\r\n * Import core mixins, variables, or others\r\n */\n/**\r\n  * Define your classname\r\n  */\n.hotelsRectPC {\n  min-height: 390px;\n  position: relative; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .int_rcln .int_rcln_input {\n    border: none; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .int_rctg {\n    font-size: 16px;\n    position: relative; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .int_rctg .int-col {\n      flex: 1; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .int_rctg .cyrcmnInput > div {\n      display: inline-block;\n      vertical-align: bottom; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .int_rctg .cyrcmnInput input {\n      border: none; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .int_rctg .dtm_rcfr-row .int_rcln .int_rcln_input {\n      padding: 1px 6px; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .close_btn {\n    display: block;\n    width: 30px;\n    height: 30px;\n    position: absolute;\n    top: 0px;\n    right: 0px;\n    z-index: 15;\n    color: transparent;\n    cursor: pointer; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .close_btn:before, .hotelsRectPC > .hotelsRectPC_hotelCont .close_btn:after {\n      content: '';\n      display: block;\n      width: 20px;\n      height: 2px;\n      background-color: #444444;\n      position: absolute;\n      top: 14px;\n      left: 5px; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .close_btn:before {\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg); }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .close_btn:after {\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg); }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .destination {\n    position: relative;\n    margin-bottom: 10px; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .destination .wrap_container {\n      position: absolute;\n      top: 50px;\n      left: 0;\n      z-index: 10;\n      background-color: #fff;\n      border: 1px solid #ddd; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .destination .act_wrap_container {\n      position: absolute;\n      top: 50px;\n      left: 0;\n      z-index: 10;\n      background-color: #fff;\n      border: 1px solid #ddd; }\n      .hotelsRectPC > .hotelsRectPC_hotelCont .destination .act_wrap_container .act_rajx .section .title {\n        border-top: none;\n        font-size: 16px;\n        font-weight: bold;\n        color: #222; }\n        .hotelsRectPC > .hotelsRectPC_hotelCont .destination .act_wrap_container .act_rajx .section .title i {\n          display: none; }\n      .hotelsRectPC > .hotelsRectPC_hotelCont .destination .act_wrap_container .act_rajx .item {\n        line-height: 30px;\n        padding: 10px; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .booking .cal_icon {\n    padding-top: 18px; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .booking .nights {\n    display: inline-flex;\n    align-items: center;\n    padding-top: 24px;\n    color: #0077b3;\n    font-weight: bold;\n    font-size: 16px; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .booking .clearBtn {\n    display: none !important; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .searchBtn {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    text-align: right; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .searchBtn .bookingToday {\n      margin-right: 12px; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .clearBtn {\n    display: none !important; }\n  .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group {\n    position: relative; }\n    .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont {\n      position: absolute;\n      top: 50px;\n      left: 0;\n      display: none;\n      width: 657px;\n      min-height: 100px;\n      background-color: #fff;\n      z-index: 10;\n      box-shadow: 0 2px 4px 0 rgba(153, 153, 153, 0.7);\n      border: solid 1px #ddd;\n      padding: 20px 15px 15px; }\n      .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .st_rcln {\n        width: 50%; }\n      .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont.show {\n        display: block; }\n      .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .int_rcln:last-of-type {\n        height: auto; }\n        .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .int_rcln:last-of-type .int_rcln_input {\n          padding-top: 0; }\n      .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .room_list_section {\n        margin-bottom: 10px; }\n        .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .room_list_section .room_count_title {\n          display: inline-block;\n          vertical-align: middle; }\n        .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .room_list_section .room_list_row {\n          display: inline-block;\n          vertical-align: middle; }\n          .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .room_list_section .room_list_row .row_title {\n            min-width: auto;\n            margin: 0 10px;\n            text-align: right; }\n          .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .room_list_section .room_list_row .st_child {\n            display: inline-block;\n            vertical-align: top; }\n          .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .room_list_section .room_list_row .st_childAge {\n            display: inline-block;\n            vertical-align: top; }\n          .hotelsRectPC > .hotelsRectPC_hotelCont .roomSetting .input_group .stCont .room_list_section .room_list_row .children_age_select {\n            width: 70px; }\n  @media screen and (min-width: 980px) {\n    .hotelsRectPC .room_list_section .room_count_title {\n      line-height: 30px;\n      margin-right: 0px;\n      margin-bottom: 10px; }\n    .hotelsRectPC .ntb_rcln.search_panel_two > .tabs {\n      margin-bottom: 10px; } }\n",""])},613:function(t,e,n){var o=n(416);"string"==typeof o&&(o=[[t.i,o,""]]);var a=n(319)(o,{hmr:!0,transform:void 0,insertInto:void 0});o.locals&&(t.exports=o.locals),t.hot.accept(416,function(){var e=n(416);if("string"==typeof e&&(e=[[t.i,e,""]]),!function(t,e){var n,o=0;for(n in t){if(!e||t[n]!==e[n])return!1;o++}for(n in e)o--;return 0===o}(o.locals,e.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");a(e)}),t.hot.dispose(function(){a()})}}]);