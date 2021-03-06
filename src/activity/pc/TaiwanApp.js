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

class TaiwanApp extends Component {
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
                { title: '精選日本一日遊', href: '#' },
                { title: '搭巴士遊歐洲', href: '#' },
                { title: '全台樂園', href: '#' },
                { title: '超值住宿', href: '#' },
                { title: '水舞間特惠價', href: '#' },
                { title: '冰雪冰雪加拿大極光旅人達人推薦', href: '#' },
            ],
        };
        this.AbortController = null;
        this.textInput = React.createRef();
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
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.taiwanSelectData !== this.props.taiwanSelectData) {
            this.updateData();
        }
    }
    componentWillUnmount () {
        window.removeEventListener('resize', this.updateDimensions);
    }
    updateData = () => {
        const { taiwanSelectData } = this.props;
        console.log(taiwanSelectData);
        // 判斷是否來自補字  or 快速

        if (taiwanSelectData.txt) {
            this.setState({
                innerValue: taiwanSelectData.txt,
            });
        }
        const url = activity.keyword + '?KeyWord=' + encodeURI(taiwanSelectData.txt);
        this.fetchDestnActData(url);

    }
    _onClickItem = data => {
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
      if (this.state.innerValue && this.state.showSearchResult) {
          this.selectActFirstItem(this.state.actData);
      }
      this.setState({
          showSearchResult: false
      });
  };

  _onClickListItem = (v, e) => {
      // const thisItem = this.state.actData.sort((a, b) => a.txt.length - b.txt.length)[v.dataIndex];
      this.setState({
          inputValue: v.txt,
          showSearchResult: false,
          selectedVal: v
      }, () => {
          this.props.onClickItem({
              taiwanSelectData: v
          });
      });
  };
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
  selectActFirstItem = () => {
      const firstItemName = this.state.actData[0].txt;
      const firstItem = this.state.actData[0];
      firstItem.dataIndex = 0;
      // console.log('沒有使用快速選單');
      // console.log(`將${firstItemName}塞回input`);
      this.setState({
          showSearchResult: false,
          inputValue: firstItemName,
          selectedVal: firstItem,
      }, () => {
          this.props.onClickItem({
              taiwanSelectData: this.state.selectedVal
          });
      });
      // 關閉選單                  把文字塞回input
  };

  getDataFromServer = (searchKeyword) => {
      console.log('fetching...', searchKeyword);

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {

          const url = activity.keyword + '?Foreign=0&KeyWord=' + encodeURI(searchKeyword);
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
              //   item.Foreign = item.Foreign;
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
      console.log(data.Destinations);
      const actData = data.Destinations.filter(e => e.Foreign === '0');

      let searchWord = this.state.innerValue.toUpperCase(); // 關鍵字尋轉成大寫
      actData.sort((a, b) => {  // ActRajax 值傳入入模組 rajx 前,依照搜尋的關鍵先後,字預先排序好
          let a_lightingWord = a.txt.indexOf(searchWord);
          let b_lightingWord = b.txt.indexOf(searchWord);
          return ((a_lightingWord < b_lightingWord) ? -1 : ((a_lightingWord > b_lightingWord) ? 1 : -1));
      }).sort((a, b) => a.level1 - b.level1);

      // 後端目前未給Foreign值,
      this.setState({
          actData,
          searchKeyWord: searchKeyWord,
          showText: '',
          fetchFinish: true
      });
      return p;
  }

  onTypingFinish = value => {
      this.setState({
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
      this.props.onClickItem && this.props.onClickItem({
          taiwanSelectData: {}
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
                  inputValue: data.destination.taiwanSelectData.text || data.destination.taiwanSelectData.txt
              });
          }
          this.props.onClickItem && this.props.onClickItem({
              taiwanSelectData: data.destination['taiwanSelectData'],
          });
      }
  };


  render () {
      const { showSearchResult } = this.state;
      const { home, taiwanSelectData } = this.props;
      let taiwanSelected = Object.keys(taiwanSelectData).length && taiwanSelectData.value ? [taiwanSelectData.value] : [];

      const handleChange = e => {
          this.setState({
              inputValue: e.target.value,
              innerValue: e.target.value
          });
          this.onTypingFinish(e.target.value);
          if (e.target.value.length === 0) {
              this.props.onClickItem && this.props.onClickItem({
                  taiwanSelectData: {}
              });
          }
      };
      const svgClassName = () => {
          if (!showSearchResult) {
              return 'd-no';
          }
          if (this.state.inputValue) {
              return '';
          }
          if (home && Object.keys(taiwanSelectData).length) {
              return '';
          } else {
              return 'd-no';
          }
      };

      return (
          <ClickOutSide
              className={`searchContainer ${home ? '' : 'd-no'}`}
              onClickOutside={() => this._onClickOutSide()}
          >
              <svg viewBox="0 0 10 10" display="none"><path id="dtm_rcfr-x" d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" /></svg>
              <div className="search_input_container_wraper">
                  <input
                      type="text"
                      className="outSideSearchInput wrapper-xs m-t-sm fz-md h-sm font-bold "
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
                      ((this.state.innerValue.length <= 0 || !this.state.showSearchResult) && 'd-no actrajaxWraper') || 'actrajaxWraper'
                  }
              >
                  <div className="DtmRcfrCloseBtn" onClick={this.closeSearch}>
                      <svg viewBox="0 0 10 10"><use xlinkHref="#dtm_rcfr-x" /></svg>
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
                          { title: '產品' }
                      ]}
                  />
              </div>
              {this.state.innerValue.length < 1 && (
                  <div
                      className={
                          home && this.state.showSearchResult
                              ? 'DtmRcfrContainer Taiwantab'
                              : 'DtmRcfrContainer d-no'
                      }
                  >
                      <div className="DtmRcfrCloseBtn" onClick={this._onClickOutSide}>
                          <svg viewBox="0 0 10 10"><use xlinkHref="#dtm_rcfr-x" /></svg>
                      </div>
                      <span className="DtmRcfrNotice m-r-sm d-b m-t-sm m-b-sm color_09 font-normal">
              找不到選項？請輸入關鍵字查詢
                      </span>
                      {Object.keys(this.state.ticketTaiwanData).length &&
                      <DtmRcfr
                          levelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                          dataResouce={this.state.ticketTaiwanData}
                          replaceRegular={/[a-zA-Z\(\)\s]/g}
                          onClickItem={this._onClickItem}
                          selectedData={taiwanSelected}
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
export default TaiwanApp;
