import React, { Component } from 'react';
import '../activity.scss';
import BtRcnb from '../../../magaele/bt_rcnb';
import ForeignApp from './ForeignApp';
import TaiwanApp from './TaiwanApp';
import useLocalStorage from '../../../utils/useLocalStorage';
import onSubmit from '../onSubmit';

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            home: false,
            taiwanSelectData: {},
            foreignSelectData: {},
            searchKeyword: {},
            Foreign: 1,
        };
    }

  onClickItem = data => {
      this.setState(prevState => (data));
  }

  handlePost = () => {
      const { home, foreignSelectData, taiwanSelectData } = this.state;
      const destination = { foreignSelectData, taiwanSelectData };
      const PostTime = new Date().setHours(0, 0, 0, 0);
      const hasValue = home ? taiwanSelectData : foreignSelectData;
      //   console.log('hasValue', hasValue);
      //   console.log('Object.keys(hasValue', Object.keys(hasValue));
      if (Object.keys(hasValue).length === 0) {
          alert('請選擇目的地或輸入關鍵字');
      } else {
          useLocalStorage({
              panel: 'activity',
              methods: 'post',
              data: {
                  destination,
                  PostTime
              }
          });
      }

      const state = Object.assign({}, this.state.Foreign ? foreignSelectData : taiwanSelectData, { Foreign: this.state.Foreign });
      onSubmit(state);
  };

  render () {
      const { home, taiwanSelectData, foreignSelectData, } = this.state;
      return (
          <div className="activity container activePc">
              <div className="pcBtn">
                  <BtRcnb
                      className={`m-smn r mbBtn ${!home ? 'active' : ''}`}
                      whenClick={() => {
                          this.setState({ home: false, Foreign: 1 });
                      }}
                  >
                    國外
                  </BtRcnb>
                  <BtRcnb
                      className={`m-smn r mbBtn ${home ? 'active' : ''}`}
                      whenClick={() => {
                          this.setState({ home: true, Foreign: 0 });
                      }}
                  >
                    國內
                  </BtRcnb>
              </div>
              <ForeignApp
                  home={this.state.home}
                  placeholder="輸入城市、景點、體驗行程或活動名稱1"
                  onClickItem={this.onClickItem}
                  foreignSelectData={foreignSelectData}
                  className={`search b-no ${home ? 'd-no' : ''}`}
              />
              <TaiwanApp
                  home={this.state.home}
                  placeholder="輸入城市、景點、體驗行程或活動名稱2"
                  onClickItem={this.onClickItem}
                  taiwanSelectData={taiwanSelectData}
                  className={`search b-no ${home ? '' : 'd-no'}`}
              />
              <div className="w-full txt-right btn-wrap">
                  <BtRcnb
                      className={`search b-no`}
                      lg
                      radius
                      whenClick={this.handlePost}
                  >
                      搜尋
                  </BtRcnb>
              </div>
          </div>
      );
  }
}
export default Panel;
