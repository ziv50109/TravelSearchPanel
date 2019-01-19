import React, { Component } from 'react';
import BtRcnb from '../../../magaele/bt_rcnb';
import Foreign from './Foreign';
import Taiwan from './Taiwan';
import useLocalStorage from '../../../utils/useLocalStorage';
import today from 'dayjs';
import '../activity.scss';

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            home: false,
            visible: 0,
            taiwanSelectData: {},
            foreignSelectData: {}
        };
    }
    componentDidMount () {
        useLocalStorage({
            panel: 'activity',
            methods: 'get',
        }, (data) => {
            this.validataLocalstorageData(data);
        });
    }

    validataLocalstorageData = (data) => {
        const localStorageRecordTime = data.PostTime + 604800000;
        if (localStorageRecordTime < new Date(today().format('YYYY-MM-DD')).getTime()) {
            console.log('超過7天予以刪除LocalStorage紀錄。');
            useLocalStorage({
                panel: 'activity',
                methods: 'delete',
            });
        }
        this.setState({
            foreignSelectData: data.destination['foreignSelectData'],
            taiwanSelectData: data.destination['taiwanSelectData']
        });
    };

    openPage = (index) => {
        this.setState({
            visible: index
        });
    };
    closePage = () => {
        this.setState({
            visible: 0
        });
    };
    onClickItem = data => {
        this.setState(prevState => (data));
    };

    handlePost = () => {
        const {
            home,
            foreignSelectData,
            taiwanSelectData
        } = this.state;
        const hasValue = home ? taiwanSelectData : foreignSelectData;
        if (!Object.keys(hasValue).length) {
            alert('請填選您想要去的城市、景點、體驗行程或活動名稱喲！');
        }

        const PostTime = new Date().setHours(0, 0, 0, 0);
        const destination = { foreignSelectData, taiwanSelectData };
        useLocalStorage({
            panel: 'activity',
            methods: 'post',
            data: {
                destination,
                PostTime
            }
        });
    };

    render () {
        const {
            visible,
            home,
            foreignSelectData,
            taiwanSelectData
        } = this.state;
        const foreignText = foreignSelectData.text || foreignSelectData.txt || '';
        const taiwanText = taiwanSelectData.text || taiwanSelectData.txt || '';
        const showForeign = visible === 1;
        const showTaiwan = visible === 2;
        const showNvbRslb = showForeign || showTaiwan;

        return (
            <div className="activity activityM container">
                <div>
                    <BtRcnb
                        className={`m-smn r mbBtn ${!home ? 'active' : ''}`}
                        whenClick={() => this.setState({ home: false })}
                    >國外</BtRcnb>
                    <BtRcnb
                        className={`m-smn r mbBtn ${home ? 'active' : ''}`}
                        whenClick={() => this.setState({ home: true })}
                    >國內</BtRcnb>
                </div>
                {!home && (
                    <Foreign
                        outsideInputValue={foreignText}
                        openPage={this.openPage}
                        nvbRslbVisible={showNvbRslb}
                        closePage={this.closePage}
                        appSelectedData={foreignSelectData}
                        onClickItem={this.onClickItem}
                        handlePost={this.handlePost}
                    />
                )}
                {home && (
                    <Taiwan
                        outsideInputValue={taiwanText}
                        openPage={this.openPage}
                        nvbRslbVisible={showNvbRslb}
                        closePage={this.closePage}
                        appSelectedData={taiwanSelectData}
                        onClickItem={this.onClickItem}
                        handlePost={this.handlePost}
                    />
                )}
            </div>
        );
    }
}

export default Panel;
