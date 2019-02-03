import React, { Component } from 'react';
import { isJsonString } from '../../../utils';
import { activity } from '../../../source.config';
import DtmRcfr from '../../../magaele/dtm_rcfr';
import ActRajax from '../../../magaele/act_rajx';
import ClickOutSide from '../../../utils/click_outside';
import ActivityLinks from '../component/ActivityLinks';
import '../activity.scss';
import useLocalStorage from '../../../utils/useLocalStorage';
import today from 'dayjs';

class ForeignApp extends Component {
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
            height: null,
            ticketAbroadData: {},
            ticketTaiwanData: {},
            activityData: [
                { title: '精選日本一日遊', href: '#'},
                { title: '搭巴士遊歐洲', href: '#'},
                { title: '全台樂園', href: '#'},
                { title: '超值住宿', href: '#'},
                { title: '水舞間特惠價', href: '#'},
                { title: '冰雪冰雪加拿大極光旅人達人推薦', href: '#'},
            ],
        };
        this.AbortController = null;
        eval('window.getInputValue' + this.props.number + ' = this.getInputValue');
    }

    componentDidMount () {
        const sessionData = sessionStorage.getItem(activity.ticketAbroad);
        if (sessionData && isJsonString(sessionData)) {
            const jsonData = JSON.parse(sessionData);
            this.setState({
                ticketAbroadData: jsonData
            });
        } else {
            fetch(activity.ticketAbroad)
                .then(r => r.json())
                .then(d => {
                    let stringifyData = JSON.stringify(d);
                    this.setState({
                        ticketAbroadData: d
                    });
                    sessionStorage.setItem(activity.ticketAbroad, stringifyData);
                });
        }

        const sessionData2 = sessionStorage.getItem(activity.ticketTaiwan);
        if (sessionData2 && isJsonString(sessionData2)) {
            const jsonData = JSON.parse(sessionData2);
            this.setState({
                ticketTaiwanData: jsonData
            });
        } else {
            fetch(activity.ticketTaiwan)
                .then(r => r.json())
                .then(d => {
                    let stringifyData = JSON.stringify(d);
                    this.setState({
                        ticketTaiwanData: d
                    });
                    sessionStorage.setItem(activity.ticketTaiwan, stringifyData);
                });
        }

        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
        eval('window._onFocusHandle' + this.props.number + '= this._onFocusHandle');

        useLocalStorage({
            panel: 'activity',
            methods: 'get',
        }, (data) => {
            this.validataLocalstorageData(data);
        });
    }
    componentWillUnmount () {
        window.removeEventListener('resize', this.updateDimensions);
    }
    _onClickItem = data => {
        console.log('_onClickItem', data);
        const { home } = this.props;
        this.setState({
            selectedData: [data],
            inputValue: data.text,
            showSearchResult: false,
            selectedVal: data
        });
        this.props.onClickItem && this.props.onClickItem({
            selectedData: [data],
            inputValue: data.text,
            selectedVal: data
        });

        let keyName = home ? 'taiwanSelectData' : 'foreignSelectData';
        this.props.onClickItem && this.props.onClickItem({
            [keyName]: data
        });
    };

  _onFocusHandle = e => {
      this.setState({ showSearchResult: true });
  };
  _onClickOutSide = () => {
      this.setState({
          showSearchResult: false
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

  getDataFromServer = (searchKeyword) => {
      console.log('fetching...', searchKeyword);

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
          const url = activity.keyword + '?KeyWord=' + encodeURI(searchKeyword);
          this.fetchDestnActData(url);
      }, 500);
  };
  fetchDestnActData = (url) => {
      fetch(url)
          .then(r => r.json())
          .then(data => {
              this.processData(data);
          });
  }
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
      console.log("ontypingfinish's value", value);
      this.setState({
          foreignSelectData: {},
          inputValue: value,
          innerValue: value,
          selectedData: [],
          selectedVal: null,
      });
      value.length >= 2 && this.getDataFromServer(value);
  };
  closeSearch = () => {
      this.setState({
          showSearchResult: false
      });
  };
  _clearInput = () => {
      this.onTypingFinish('');
      this.setState({
          showSearchResult: false
      });
      this.props.onClickItem && this.props.onClickItem({
          foreignSelectData: {}
      });
  };

  validataLocalstorageData = (data) => {
      // eslint-disable-next-line no-extra-boolean-cast
      //   console.log(data);
      if (data) {
          const localStorageRecordTime = data.PostTime + 604800000;
          if (localStorageRecordTime < new Date(today().format('YYYY-MM-DD')).getTime()) {
              console.log('超過7天予以刪除LocalStorage紀錄。');
              useLocalStorage({
                  panel: 'activity',
                  methods: 'delete',
              });
              this.setState(prevState => ({
                  inputValue: ''
              }));
          } else {
              this.setState({
                  inputValue: data.destination.foreignSelectData.text
              });
          }
          this.props.onClickItem && this.props.onClickItem({
              foreignSelectData: data.destination['foreignSelectData']
          });
      }
  };


  render () {
      const { showSearchResult } = this.state;
      const { home, foreignSelectData } = this.props;
      let foreignSelected = Object.keys(foreignSelectData).length ? [foreignSelectData.value] : [];

      const handleChange = e => {
          this.setState({
              inputValue: e.target.value,
              innerValue: e.target.value
          });
          this.onTypingFinish(e.target.value);
          if (e.target.value.length === 0) {
              this.props.onClickItem && this.props.onClickItem({
                  foreignSelectData: {}
              });
              this.setState({
                  showSearchResult: false
              });
          }
      };
      const svgClassName = () => {
          if (!showSearchResult) {
              return 'd-no';
          }
          if (!home && Object.keys(foreignSelectData).length) {
              return '';
          } else {
              return 'd-no';
          }
      };
      return (
          <ClickOutSide
              className={`searchContainer ${home ? 'd-no' : ''}`}
              onClickOutside={() => this._onClickOutSide()}
          >
              <svg viewBox="0 0 10 10" display="none"><path id="dtm_rcfr-x" d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" /></svg>
              <div className="search_input_container_wraper">
                  <input
                      type="text"
                      className="outSideSearchInput wrapper-xs m-t-sm fz-md h-sm"
                      value={this.state.inputValue || ''}
                      ref={this.textInput}
                      placeholder="輸入城市、景點、體驗行程或活動名稱"
                      onChange={handleChange}
                      onFocus={e => {
                          this._onFocusHandle && this._onFocusHandle(e);
                      }}
                      onBlur={e => {
                          this._onBlurHandle && this._onBlurHandle(e);
                      }}
                  />
                  <span className="_crossIcon" onClick={() => this._clearInput()}>
                      {
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              color="red"
                              className={svgClassName()}
                          >
                              <g fill="none" fillRule="nonzero">
                                  <path
                                      fill="gray"
                                      d="M7 0C3.129 0 0 3.129 0 7s3.129 7 7 7 7-3.129 7-7-3.129-7-7-7zm3.5 9.513l-.987.987L7 7.987 4.487 10.5 3.5 9.513 6.013 7 3.5 4.487l.987-.987L7 6.013 9.513 3.5l.987.987L7.987 7 10.5 9.513z"
                                  />
                                  <path d="M-1-1h16v16H-1z" />
                              </g>
                          </svg>
                      }
                  </span>
              </div>
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
                          (this.state.innerValue.length <= 0 || !this.state.showSearchResult) && 'd-no'
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
                      <div className="DtmRcfrCloseBtn" onClick={this._onClickOutSide}>
                          <svg viewBox="0 0 10 10"><use xlinkHref="#dtm_rcfr-x" /></svg>
                      </div>
                      <span className="DtmRcfrNotice m-r-sm d-b m-t-sm m-b-sm color_09">
                          找不到選項？請輸入關鍵字查詢
                      </span>

                      {Object.keys(this.state.ticketAbroadData).length &&
                      <DtmRcfr
                          levelKey={['vLine', 'vCountry', 'vCity']}
                          dataResouce={this.state.ticketAbroadData}
                          replaceRegular={/[a-zA-Z\(\)\s]/g}
                          onClickItem={this._onClickItem}
                          selectedData={this.handleChange && this.handleChange || foreignSelected}
                      />
                      }
                  </div>
              )}
              <ActivityLinks
                links={this.state.activityData}
                targetBlank={true}
              />
          </ClickOutSide>
      );
  }
}
export default ForeignApp;
