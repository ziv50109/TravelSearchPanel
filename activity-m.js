(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{295:function(t,e,n){"use strict";n.r(e);var a=n(311),i=n.n(a),o=n(312),r=n.n(o),c=n(313),s=n.n(c),l=n(314),u=n.n(l),p=n(315),h=n.n(p),d=n(316),m=n.n(d),v=n(317),f=n.n(v),x=n(20),g=n.n(x),b=n(348),w=(n(361),n(328)),y=n(327),_=n(330),C=function(t){function e(t){var n;return i()(this,e),(n=s()(this,u()(e).call(this,t))).state={inputValue:"",innerValue:""},n.textInput=g.a.createRef(),n}return h()(e,t),r()(e,[{key:"focusTextInput",value:function(){this.textInput.current.focus()}},{key:"blurTextInput",value:function(){this.textInput.current.blur()}},{key:"render",value:function(){var t=this,e=this.props,n=e.clearInput,a=e.closePage,i=!1,o=!!window.chrome&&!!window.chrome.webstore,r=function(e){e.target instanceof HTMLInputElement&&(i="compositionend"!==e.type||(o&&(t.setState({innerValue:e.target.value}),t.props.onTypingFinish(e.target.value)),!1))};return g.a.createElement("div",{className:"p-t-sm search_input_container_wraper"},g.a.createElement("div",{className:"search_input_container"},g.a.createElement("input",{type:"text",className:"inputContainer outSideSearchInput insideSearchInput fz-md font-bold wrapper-xs",value:this.props.inputValue,ref:this.textInput,placeholder:"",onCompositionStart:r,onCompositionUpdate:r,onCompositionEnd:r,onChange:function(e){i?(t.setState({inputValue:e.target.value}),t.props.onTyping(e.target.value)):(t.setState({inputValue:e.target.value,innerValue:e.target.value}),t.props.onTypingFinish(e.target.value))},onFocus:function(e){t.props.onFocus&&t.props.onFocus(e)},onBlur:function(e){t.props.onBlur&&t.props.onBlur(e)}}),g.a.createElement("span",{onClick:function(){return n()},className:"_crossIcon"},g.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"11",height:"11",viewBox:"0 0 14 14",className:this.props.inputValue?"":"d-no"},g.a.createElement("g",{fill:"none",fillRule:"nonzero"},g.a.createElement("path",{fill:"gray",d:"M7 0C3.129 0 0 3.129 0 7s3.129 7 7 7 7-3.129 7-7-3.129-7-7-7zm3.5 9.513l-.987.987L7 7.987 4.487 10.5 3.5 9.513 6.013 7 3.5 4.487l.987-.987L7 6.013 9.513 3.5l.987.987L7.987 7 10.5 9.513z"}),g.a.createElement("path",{d:"M-1-1h16v16H-1z"}))))),g.a.createElement(w.a,{className:"sureBtn m-smn m-r-sm",whenClick:a},"確定"))}}]),e}(x.Component),k=n(342),S=n(321),I=function(t){function e(t){var n;return i()(this,e),n=s()(this,u()(e).call(this,t)),f()(m()(m()(n)),"_onClickItem",function(t){n.setState({selectedData:[t],inputValue:t.text,showSearchResult:n.state.width<980,selectedVal:t}),n.props.onClickItem&&n.props.onClickItem({selectedData:[t],inputValue:t.text,selectedVal:t})}),f()(m()(m()(n)),"_onClickListItem",function(t){n.setState({selectedData:[t],inputValue:t.txt,showSearchResult:n.state.width<980,selectedVal:t}),n.props.onClickItem&&n.props.onClickItem({selectedData:[t],inputValue:t.txt,selectedVal:t})}),f()(m()(m()(n)),"_onFocusHandle",function(t){n.setState({showSearchResult:!0})}),f()(m()(m()(n)),"_onClickOutSide",function(){var t=n.state,e=t.selectedData,a=t.innerValue,i=t.fetchFinish,o=t.actData,r=t.selectedVal;e.length<=0&&2<=a.length&&i&&0<=o.length&&!r&&n.selectActFirstItem(),n.setState({showSearchResult:n.state.width<980})}),f()(m()(m()(n)),"updateDimensions",function(){n.setState({width:window.innerWidth,height:window.innerHeight})}),f()(m()(m()(n)),"selectActFirstItem",function(){var t=n.state.actData.sort(function(t,e){return t.txt.length-e.txt.length})[0].txt,e=n.state.actData.sort(function(t,e){return t.txt.length-e.txt.length})[0];e.dataIndex=0,n.setState({showSearchResult:n.state.width<980,inputValue:t,selectedVal:e})}),f()(m()(m()(n)),"getDataFromServer",function(t){n.AbortController&&n.AbortController.abort(),n.AbortController=new AbortController;var e=n.AbortController.signal;n.setState({fetchFinish:!1}),n.setState({showText:g.a.createElement("div",{className:""},g.a.createElement("span",null,"載入中...")),actData:[]}),fetch("https://uhotel.liontravel.com/search/keyword?KeyWord="+t,{method:"GET",mode:"cors",signal:e,headers:new Headers({"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"})}).then(function(t){return t.json()}).then(function(e){return n.processData(e,t)}).catch(function(t){})}),f()(m()(m()(n)),"getInputValue",function(){return n.state.selectedVal}),f()(m()(m()(n)),"onTypingFinish",function(t){m()(m()(n)),n.setState({innerValue:t,inputValue:t,selectedData:[],selectedVal:null}),2<=t.length&&n.getDataFromServer(t)}),f()(m()(m()(n)),"_clearInput",function(){n.onTypingFinish("")}),n.state={selectedData:[],showSearchResult:!0,inputValue:"",innerValue:"",actData:[],selectedVal:null,fetchFinish:null,clientW:window.innerWidth,width:null,height:null},n.AbortController=null,n.textInput=g.a.createRef(),n}return h()(e,t),r()(e,[{key:"componentWillMount",value:function(){this.updateDimensions()}},{key:"componentDidMount",value:function(){window.addEventListener("resize",this.updateDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateDimensions)}},{key:"processData",value:function(t,e){var n=new Promise(function(e,n){t.Destinations.map(function(t){t.level1=t.Kind,t.level2=t.KindName,t.level3=t.Code,t.txt=t.Name,delete t.Kind,delete t.KindName,delete t.Code,delete t.Name}),e(t)});return this.setState({actData:t.Destinations,searchKeyWord:e,showText:"",fetchFinish:!0}),n}},{key:"render",value:function(){var t=this,e=this.props,n=e.home,a=e.closePage,i=this.state.selectedData.map(function(t){return t.value});return g.a.createElement(S.a,{className:"searchContainer",onClickOutside:function(){return t._onClickOutSide()}},g.a.createElement(C,{ref:this.textInput,inputValue:this.state.inputValue,innerValue:this.state.innerValue,onTypingFinish:this.onTypingFinish,onTyping:function(e){return t.setState({inputValue:e})},onFocus:this._onFocusHandle,onBlur:this._onBlurHandle,clearInput:this._clearInput,closePage:a}),g.a.createElement("span",{className:"searchNotFoundTxt"},"找不到選項？請輸入關鍵字查詢"),g.a.createElement(k.a,{containerClass:(this.state.innerValue.length<=0||!this.state.showSearchResult)&&"d-no",sectionClass:"",itemClass:"",titleClass:"",data:this.state.actData,matchWord:this.state.innerValue,closeBtnOnClick:function(){return t.setState({showSearchResult:!1})},getItemClickValue:function(e){return t._onClickListItem(e)},selectedVal:this.state.selectedVal,isFocus:this.state.showSearchResult,showText:this.state.showText,noMatchText:"很抱歉，找不到符合的項目",minimumStringQuery:"請至少輸入兩個字",minimumStringQueryLength:2,footer:!1,rules:[{title:"城市"},{title:"區域"},{title:"行政區"},{title:"商圈"},{title:"地標"},{title:"飯店"}]}),this.state.innerValue<2&&g.a.createElement("div",{className:!n&&this.state.showSearchResult?"DtmRcfrContainer":"DtmRcfrContainer d-no"},g.a.createElement(_.a,{levelKey:["vLine","vCountry","vCity"],dataResouce:"../public/abroad.json",replaceRegular:/[a-zA-Z\(\)\s]/g,onClickItem:this._onClickItem,selectedData:i})),this.state.innerValue<2&&g.a.createElement("div",{className:n&&this.state.showSearchResult?"DtmRcfrContainer":"DtmRcfrContainer d-no"},g.a.createElement(_.a,{levelKey:["vLine","vLinetravel","vLinewebarea"],dataResouce:"../public/home.json",replaceRegular:/[a-zA-Z\(\)\s]/g,onClickItem:this._onClickItem,selectedData:i})))}}]),e}(x.Component),E=function(t){function e(t){var n;return i()(this,e),n=s()(this,u()(e).call(this,t)),f()(m()(m()(n)),"openPage",function(){n.setState({visible:!0})}),f()(m()(m()(n)),"closePage",function(){n.setState({visible:!1})}),f()(m()(m()(n)),"onClickItem",function(t){n.setState(function(e){return t})}),n.state={visible:!1,isClick:!0,home:!1},n.aa=g.a.createRef(),n}return h()(e,t),r()(e,[{key:"render",value:function(){var t=this,e=this.state,n=(e.isClick,e.home),a=e.inputValue;return g.a.createElement("div",{className:"activity container m-sm"},g.a.createElement(w.a,{className:"m-smn m-l-xs mbBtn ".concat(n?"":"active"),whenClick:function(){t.setState({home:!1}),t.aa.current._clearInput()}}," 國外 "),g.a.createElement(w.a,{className:"m-smn m-l-xs mbBtn ".concat(n?"active":""),whenClick:function(){t.setState({home:!0}),t.aa.current._clearInput()}}," 國內 "),g.a.createElement("input",{type:"text",value:a,placeholder:"輸入城市、景點、體驗行程或活動名稱",className:"outSideSearchInput wrapper-xs m-l-xs m-t-md m-r-xs",onClick:this.openPage}),g.a.createElement(b.a,{visible:this.state.visible,direction:"right",width:"100%",className:"custom"},g.a.createElement("span",{className:"nvb_rslb_goBack fz-xxl",onClick:this.closePage},g.a.createElement(y.a,{name:"toolbefore"})),g.a.createElement("div",{className:"activity"},g.a.createElement("div",{className:"w-full"},g.a.createElement("h3",{className:"txt-center font-bold m-t-sm"},"目的地"),g.a.createElement(I,{home:n,ref:this.aa,placeholder:"輸入城市、景點、體驗行程或活動名稱",closePage:this.closePage,onClickItem:this.onClickItem})))),g.a.createElement("div",{className:"w-full"},g.a.createElement(w.a,{className:"search b-no pos-fix m-b-md"},"搜尋")))}}]),e}(x.Component);n.d(e,"default",function(){return E})},321:function(t,e,n){"use strict";n.d(e,"a",function(){return E});var a=n(323),i=n.n(a),o=n(325),r=n.n(o),c=n(311),s=n.n(c),l=n(312),u=n.n(l),p=n(313),h=n.n(p),d=n(314),m=n.n(d),v=n(315),f=n.n(v),x=n(316),g=n.n(x),b=n(317),w=n.n(b),y=n(20),_=n.n(y),C=n(84),k=n.n(C),S=n(115),I=n.n(S),E=function(t){function e(t){var n;return s()(this,e),n=h()(this,m()(e).call(this,t)),w()(g()(g()(n)),"handle",function(t){if(!n.__domNode.contains(t.target)){var e=n.props.onClickOutside;"function"==typeof e&&e(t)}}),n.isTouch=!1,n.isClickInSide=!1,n.isUnMounted=!1,n.__domNode=null,n.__wrappedInstance=null,n}return f()(e,t),u()(e,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handle,!0)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("click",this.handle,!0)}},{key:"render",value:function(){var t=this,e=this.props,n=e.children,a=(e.onClickOutside,r()(e,["children","onClickOutside"]));return _.a.createElement("div",i()({},a,{ref:function(e){t.__domNode=k.a.findDOMNode(e),t.__wrappedInstance=e}}),n)}}]),e}(y.Component);w()(E,"propTypes",{onClickOutside:I.a.func.isRequired})},361:function(t,e,n){var a=n(362);"string"==typeof a&&(a=[[t.i,a,""]]);var i=n(319)(a,{hmr:!0,transform:void 0,insertInto:void 0});a.locals&&(t.exports=a.locals),t.hot.accept(362,function(){var e=n(362);if("string"==typeof e&&(e=[[t.i,e,""]]),!function(t,e){var n,a=0;for(n in t){if(!e||t[n]!==e[n])return!1;a++}for(n in e)a--;return 0===a}(a.locals,e.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");i(e)}),t.hot.dispose(function(){i()})},362:function(t,e,n){(t.exports=n(318)(!1)).push([t.i,".color_09 {\n  color: #24a07d; }\n\n.color_ocean {\n  color: #0077b3 !important; }\n\n.borderRed {\n  border: 2px solid #ff8b88; }\n\n.activity .bt_rcnb {\n  border: 1px solid #dddddd;\n  background: #fff;\n  color: #444;\n  width: 55px;\n  height: 32px;\n  border-radius: 3px;\n  padding: 0;\n  margin: 0 10px 0 0;\n  line-height: 14px;\n  font-size: 14px; }\n  .activity .bt_rcnb.mbBtn {\n    width: 96px; }\n  .activity .bt_rcnb.search {\n    border-radius: 5px;\n    background-color: red;\n    color: white;\n    font-size: 16px;\n    left: 0;\n    bottom: 0;\n    height: 45px;\n    width: 95%;\n    margin: 15px 11px; }\n  .activity .bt_rcnb:hover, .activity .bt_rcnb.active {\n    border: 1px solid #ff615d;\n    background-color: #ff615d;\n    color: #fff; }\n  .activity .bt_rcnb.sureBtn {\n    background-color: #e10500;\n    color: white;\n    height: 40px;\n    min-width: 0;\n    flex-grow: 0; }\n\n.activity .outSideSearchInput {\n  cursor: pointer;\n  border: 1px solid #dddddd;\n  height: 50px;\n  border-radius: 2px;\n  line-height: 16px;\n  font-weight: bold;\n  width: 100%;\n  padding: 15px 10px;\n  color: #999999; }\n  .activity .outSideSearchInput:focus {\n    outline: none; }\n  .activity .outSideSearchInput.insideSearchInput {\n    border: solid 2px #ff8b88;\n    border-radius: 1px;\n    color: #0077b3; }\n    .activity .outSideSearchInput.insideSearchInput input {\n      color: red !important;\n      text-shadow: 0px 0px 0px #495057; }\n\n.activity .search_input_container_wraper {\n  display: flex; }\n  .activity .search_input_container_wraper .search_input_container {\n    display: flex;\n    position: relative;\n    clear: both;\n    flex: 1;\n    margin-right: 10px;\n    margin-left: 10px; }\n    .activity .search_input_container_wraper .search_input_container .inputContainer {\n      width: 100%; }\n      .activity .search_input_container_wraper .search_input_container .inputContainer .crossIcon {\n        position: absolute;\n        right: 8px;\n        top: 30%; }\n  .activity .search_input_container_wraper ._crossIcon {\n    position: absolute;\n    right: 8px;\n    top: 30%;\n    cursor: pointer; }\n\n.activity .searchContainer .act_rajx {\n  max-height: initial;\n  border-top: 2px solid #e3e3e3 !important;\n  width: 100%;\n  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.25);\n  border: none;\n  padding: 0; }\n  .activity .searchContainer .act_rajx .noMatchText {\n    font-size: 14px;\n    color: #24a07d;\n    height: 100vh;\n    margin-left: 5px; }\n    .activity .searchContainer .act_rajx .noMatchText .close {\n      display: none; }\n  .activity .searchContainer .act_rajx .section .title {\n    color: #222222;\n    font-weight: bold;\n    font-size: 16px;\n    border-top: none; }\n  .activity .searchContainer .act_rajx .section .item {\n    display: block;\n    padding: 5px 8px;\n    line-height: 2;\n    font-size: 14px;\n    cursor: pointer;\n    border-bottom: 1px solid #ddd; }\n  .activity .searchContainer .act_rajx .m-place {\n    margin-bottom: 10px;\n    color: #24a07d;\n    display: inline-block;\n    font-size: 14px;\n    margin-left: 15px;\n    padding: 0;\n    margin-top: 5px; }\n    .activity .searchContainer .act_rajx .m-place .close {\n      display: none; }\n\n.activity .searchNotFoundTxt {\n  margin-bottom: 10px;\n  color: #24a07d;\n  margin-top: 10px;\n  display: inline-block;\n  font-size: 14px;\n  margin-left: 15px; }\n\n.activity.activePc {\n  width: 100%; }\n  .activity.activePc .pcBtn {\n    margin-top: 10px; }\n  .activity.activePc .bt_rcnb.search {\n    width: initial;\n    background-color: #e10500;\n    margin: 10px 5px; }\n  .activity.activePc .outSideSearchInput {\n    color: #0077b3; }\n  .activity.activePc .search_input_container_wraper {\n    position: relative; }\n    .activity.activePc .search_input_container_wraper .search_input_container .inputContainer .crossIcon {\n      position: absolute;\n      right: 37px;\n      top: 56%; }\n    .activity.activePc .search_input_container_wraper ._crossIcon {\n      position: absolute;\n      right: 44px;\n      top: 59%;\n      cursor: pointer; }\n  .activity.activePc .searchContainer .actrajaxWraper {\n    position: absolute; }\n  .activity.activePc .searchContainer .cross {\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    font-weight: bold;\n    cursor: pointer; }\n  .activity.activePc .searchContainer .act_rajx {\n    position: initial;\n    border-top: none !important;\n    width: auto;\n    margin-top: 0;\n    border: solid 1px #dddddd;\n    display: block;\n    background: #fff;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n    padding: 5px 20px; }\n    .activity.activePc .searchContainer .act_rajx .noMatchText {\n      width: auto;\n      padding: 0 10px 5px;\n      height: auto; }\n      .activity.activePc .searchContainer .act_rajx .noMatchText .close {\n        display: block;\n        right: 8px;\n        top: 9px;\n        border: none;\n        color: black; }\n    .activity.activePc .searchContainer .act_rajx .section {\n      width: 600px; }\n      .activity.activePc .searchContainer .act_rajx .section .title {\n        border-top: none; }\n      .activity.activePc .searchContainer .act_rajx .section .item {\n        border-bottom: 1px solid #ddd; }\n    .activity.activePc .searchContainer .act_rajx .m-place {\n      margin-bottom: 0;\n      margin-left: 0; }\n      .activity.activePc .searchContainer .act_rajx .m-place .close {\n        right: 3px;\n        top: 10px;\n        color: black;\n        display: block;\n        border: none; }\n  .activity.activePc .emptyHeight {\n    min-height: 200px; }\n",""])}}]);