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
            showSearchResult: true,
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
    }
    componentWillMount () {
        this.updateDimensions();
    }
    componentDidMount () {
        window.addEventListener('resize', this.updateDimensions);
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
  _onClickListItem = data => {
      this.setState({
          selectedData: [data],
          inputValue: data.txt,
          showSearchResult: this.state.width < 980 ? true : false,
          selectedVal: data
      });
      this.props.onClickItem && this.props.onClickItem({
          selectedData: [data],
          inputValue: data.txt,
          //   showSearchResult: this.state.width < 980 ? true : false,
          selectedVal: data
      });
  };
  _onFocusHandle = e => {
      this.setState({ showSearchResult: true });
  };
  // _onBlurHandle = () => {
  //   console.log('onBlur')
  // }
  _onClickOutSide = () => {
      const {
          selectedData,
          innerValue,
          fetchFinish,
          actData,
          selectedVal
      } = this.state;
      selectedData.length <= 0 &&
      innerValue.length >= 2 &&
      fetchFinish &&
      actData.length >= 0 &&
      !selectedVal &&
      this.selectActFirstItem(); // !TODO //||
      this.setState({
          showSearchResult: this.state.width < 980 ? true : false
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
      this.setState({
          showSearchResult: this.state.width < 980 ? true : false,
          inputValue: firstItemName,
          selectedVal: firstItem
      });
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
  _clearInput = () => {
      this.onTypingFinish('');
  };

  render () {
      let { home, closePage } = this.props;
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
                  onTyping={inputValue => this.setState({ inputValue })}
                  onFocus={this._onFocusHandle}
                  onBlur={this._onBlurHandle}
                  clearInput={this._clearInput}
                  closePage={closePage}
              />

              <span className="searchNotFoundTxt">找不到選項？請輸入關鍵字查詢</span>

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
                  getItemClickValue={(v) => this._onClickListItem(v)}
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
              {this.state.innerValue < 2 && (
                  <div
                      className={
                          !home && this.state.showSearchResult
                              ? 'DtmRcfrContainer'
                              : 'DtmRcfrContainer d-no'
                      }
                  >
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
