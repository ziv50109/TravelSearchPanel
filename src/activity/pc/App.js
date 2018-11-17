import React, { Component } from 'react';
import DtmRcfr from '../../../magaele/dtm_rcfr';
import SearchInput from './searchInput';
import ActRajax from '../../../magaele/act_rajx';
import ClickOutSide from '../../../utils/click_outside';
import '../activity.scss';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedData: [],
            showSearchResult: false,
            inputValue: '',
            innerValue: '',
            actData: [],
            selectedVal: null, // it's finall value
            fetchFinish: null,
            clientW: window.innerWidth,
            width: null,
            height: null
        };
        this.AbortController = null;
        this.textInput = React.createRef();
        eval('window.getInputValue' + this.props.number + ' = this.getInputValue');
    }

    componentWillMount () {
        this.updateDimensions();
    }
    componentDidMount () {
        window.addEventListener('resize', this.updateDimensions);
        eval('window._onFocusHandle' + this.props.number + '= this._onFocusHandle');
    }
    componentWillUnmount () {
        window.removeEventListener('resize', this.updateDimensions);
    }
  _onClickItem = data => {
      this.setState({
          selectedData: [data],
          inputValue: data.text,
          showSearchResult: this.state.width < 980 ? true : false,
          selectedVal: data
      });
      this.props.onClickItem && this.props.onClickItem({
          selectedData: [data],
          inputValue: data.text,
          //   showSearchResult: this.state.width < 980 ? true : false,
          selectedVal: data
      });
  };

  _onFocusHandle = e => {
      this.setState({ showSearchResult: true });
  };
  _onClickOutSide = () => {
      const {
          selectedData,
          innerValue,
          fetchFinish,
          actData,
          selectedVal
      } = this.state;
      (selectedData.length <= 0 &&
      innerValue.length >= 2 &&
      fetchFinish &&
      actData.length >= 0 &&
      !selectedVal &&
      this.selectActFirstItem()) ||
      this.setState({
          showSearchResult: this.state.width < 980 ? true : false
      });
  };

  _onClickListItem = (v, e) => {
      // const thisItem = this.state.actData.sort((a, b) => a.txt.length - b.txt.length)[v.dataIndex];
      this.setState({
          inputValue: v.txt,
          showSearchResult: this.state.width < 980 ? true : e || false,
          selectedVal: v
      });
  };
  updateDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  selectActFirstItem = () => {
      const firstItemName = this.state.actData.sort(
          (a, b) => a.txt.length - b.txt.length
      )[0].txt;
      const firstItem = this.state.actData.sort(
          (a, b) => a.txt.length - b.txt.length
      )[0];
      firstItem.dataIndex = 0;
      // console.log('沒有使用快速選單');
      // console.log(`將${firstItemName}塞回input`);
      this.setState({
          showSearchResult: this.state.width < 980 ? true : false,
          inputValue: firstItemName,
          selectedVal: firstItem
      });
      // 關閉選單                  把文字塞回input
  };

  getDataFromServer = value => {
      this.AbortController && this.AbortController.abort();
      this.AbortController = new AbortController();
      const signal = this.AbortController.signal;
      this.setState({ fetchFinish: false });
      console.log('fetching...', value);
      this.setState({
          showText: (
              <div className="">
                  <span>載入中...</span>
              </div>
          ),
          actData: []
      });

      let url = 'https://uhotel.liontravel.com/search/keyword?KeyWord=' + value;
      // console.log(url)
      fetch(url, {
          method: 'GET',
          mode: 'cors',
          signal,
          headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          })
      })
          .then(res => {
              return res.json();
          })
          .then(d => this.processData(d, value))
          .catch(res => console.error('Request失敗 原因是 :', res));
  };
  getInputValue = () => {
      return this.state.selectedVal;
  };
  processData (data, searchKeyWord) {
      // Destinations 是 fetch的第一個key name
      let p = new Promise(function (resolve, reject) {
          data.Destinations.map(item => {
              item.level1 = item.Kind;
              item.level2 = item.KindName;
              item.level3 = item.Code;
              item.txt = item.Name;
              delete item.Kind;
              delete item.KindName;
              delete item.Code;
              delete item.Name;
          });
          resolve(data);
      });
      this.setState({
          actData: data.Destinations,
          searchKeyWord: searchKeyWord,
          showText: '',
          fetchFinish: true
      });
      return p;
  }
  onTypingFinish = value => {
      let self = this;
      this.setState({
          innerValue: value,
          inputValue: value,
          selectedData: [],
          selectedVal: null
      });
      value.length >= 2 && this.getDataFromServer(value);
  };
  onTyping = inputValue => {
      this.setState({ inputValue });
  };
  closeSearch = () => {
      this.setState({
          showSearchResult: false
      });
  };
  _clearInput = () => {
      this.onTypingFinish('');
  };


  render () {
      let { home, getfunction } = this.props;
      const selectedData = this.state.selectedData;
      const selected = selectedData.map(v => v.value);
      return (
          <ClickOutSide
              className="searchContainer"
              onClickOutside={() => this._onClickOutSide()}
          >
              <SearchInput
                  ref={this.textInput}
                  inputValue={this.state.inputValue}
                  innerValue={this.state.innerValue}
                  onTypingFinish={this.onTypingFinish}
                  onTyping={this.onTyping}
                  onFocus={this._onFocusHandle}
                  onBlur={this._onBlurHandle}
                  clearInput={this._clearInput}
                  home={home}
              />
              <div
                  className={
                      ((this.state.innerValue.length <= 0 ||
              !this.state.showSearchResult) &&
              'd-no actrajaxWraper') ||
            'actrajaxWraper'
                  }
              >
                  <div
                      className={`cross ${this.state.actData.length === 0 && 'd-no'}
          `}
                      onClick={this.closeSearch}
                  >
            x
                  </div>
                  <ActRajax
                      containerClass={
                          (this.state.innerValue.length <= 0 ||
                !this.state.showSearchResult) &&
              'd-no'
                      }
                      sectionClass={''}
                      itemClass={''}
                      titleClass={''}
                      data={this.state.actData}
                      matchWord={this.state.innerValue}
                      closeBtnOnClick={() => this.setState({ showSearchResult: false })}
                      getItemClickValue={(v, e) => this._onClickListItem(v, e)}
                      selectedVal={this.state.selectedVal}
                      isFocus={this.state.showSearchResult}
                      showText={this.state.showText}
                      noMatchText="很抱歉，找不到符合的項目"
                      minimumStringQuery={'請至少輸入兩個字'}
                      minimumStringQueryLength={2}
                      footer={false}
                      rules={[
                          { title: '城市' },
                          { title: '區域' },
                          { title: '行政區' },
                          { title: '商圈' },
                          { title: '地標' },
                          { title: '飯店' }
                      ]}
                  />
              </div>
              {this.state.innerValue < 2 && (
                  <div
                      className={
                          !home && this.state.showSearchResult
                              ? 'DtmRcfrContainer'
                              : 'DtmRcfrContainer d-no'
                      }
                  >
                      <span className="DtmRcfrNotice m-r-sm d-b m-t-sm m-b-sm color_09">
              找不到選項？請輸入關鍵字查詢
                      </span>

                      <DtmRcfr
                          levelKey={['vLine', 'vCountry', 'vCity']}
                          dataResouce="../public/abroad.json"
                          replaceRegular={/[a-zA-Z\(\)\s]/g}
                          onClickItem={this._onClickItem}
                          selectedData={selected}
                      />
                  </div>
              )}
              {this.state.innerValue < 2 && (
                  <div
                      className={
                          home && this.state.showSearchResult
                              ? 'DtmRcfrContainer'
                              : 'DtmRcfrContainer d-no'
                      }
                  >
                      <span className="DtmRcfrNotice m-r-sm d-b m-t-sm m-b-sm color_09 font-normal">
              找不到選項？請輸入關鍵字查詢
                      </span>
                      <DtmRcfr
                          levelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                          dataResouce="../public/home.json"
                          replaceRegular={/[a-zA-Z\(\)\s]/g}
                          onClickItem={this._onClickItem}
                          selectedData={selected}
                      />
                  </div>
              )}
          </ClickOutSide>
      );
  }
}
export default App;
