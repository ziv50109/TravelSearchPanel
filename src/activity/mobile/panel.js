import React, { Component } from 'react';
import NvbRslb from '../../../magaele/nvb_rslb';
import '../activity.scss';
import BtRcnb from '../../../magaele/bt_rcnb';
import IcRcln from '../../../magaele/ic_rcln';
import App from './App';
// import Container from "./Container";

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            isClick: true,
            home: false
        };
        this.aa = React.createRef();
    }
  openPage = () => {
      this.setState({
          visible: true
      });
  };
  closePage = () => {
      this.setState({
          visible: false
      });
  };
  onClickItem = data => {
      this.setState(prevState => (data));
  }
  render () {
      const { isClick, home, inputValue } = this.state;
      return (
          <div className="activity container">
              <div>
                  <BtRcnb
                      className={`m-smn r mbBtn ${!home ? 'active' : ''}`}
                      whenClick={() => {
                          this.setState({ home: false });
                          this.aa.current._clearInput();
                      }}
                  > 國外 </BtRcnb>
                  <BtRcnb
                      className={`m-smn r mbBtn ${home ? 'active' : ''}`}
                      whenClick={() => {
                          this.setState({ home: true });
                          this.aa.current._clearInput();
                      }}
                  > 國內 </BtRcnb>
              </div>
              <input
                  type="text"
                  value={inputValue}
                  placeholder="輸入城市、景點、體驗行程或活動名稱"
                  className="outSideSearchInput wrapper-xs m-t-sm"
                  onClick={this.openPage}
              />

              <NvbRslb
                  visible={this.state.visible}
                  direction="right"
                  width="100%"
                  className="custom"
              >
                  <span className="nvb_rslb_goBack fz-xxl" onClick={this.closePage}>
                      <IcRcln name="toolbefore" />
                  </span>
                  {/* container */}
                  <div className="activity">
                      <div className="w-full">
                          <h3 className="txt-center font-bold m-t-sm">目的地</h3>
                          <App
                              home={home}
                              ref={this.aa}
                              placeholder="輸入城市、景點、體驗行程或活動名稱"
                              closePage={this.closePage}
                              onClickItem={this.onClickItem}
                          />
                      </div>
                  </div>
              </NvbRslb>
              <div className="w-full btn-wrap">
                  <BtRcnb className="search b-no" lg radius>搜尋</BtRcnb>
              </div>
          </div>
      );
  }
}
export default Panel;
