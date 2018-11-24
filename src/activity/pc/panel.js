import React, { Component } from 'react';
import '../activity.scss';
import BtRcnb from '../../../magaele/bt_rcnb';
import App from './App';

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            isClick: true,
            home: false
        };
        this._clearInput = React.createRef();
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
      const { isClick, home } = this.state;
      return (
          <div className="activity container activePc">
              <div className="pcBtn">
                  <BtRcnb
                      className={`m-smn r mbBtn ${!home ? 'active' : ''}`}
                      whenClick={() => {
                          this.setState({ home: false });
                          this._clearInput.current._clearInput();
                      }}
                  >
            國外
                  </BtRcnb>
                  <BtRcnb
                      className={`m-smn r mbBtn ${home ? 'active' : ''}`}
                      whenClick={() => {
                          this.setState({ home: true });
                          this._clearInput.current._clearInput();
                      }}
                  >
            國內
                  </BtRcnb>
              </div>
              <App home={this.state.home} ref={this._clearInput}
                  placeholder="輸入城市、景點、體驗行程或活動名稱"
                  closePage={this.closePage}
                  onClickItem={this.onClickItem}
              />
              <div className="w-full txt-right btn-wrap">
                  <BtRcnb className="search b-no" lg radius>搜尋</BtRcnb>
              </div>
          </div>
      );
  }
}
export default Panel;
