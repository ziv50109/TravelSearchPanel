import React, { PureComponent } from 'react';
import CrRcln from '../../../../magaele/cr_rcln';
import { vacationTaiwanSearch } from '../../../../source.config';

class TransportM extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            transport: []
        };
    }

    componentDidMount () {
        this.fetchData();
        // this.setPanelState();
    }

    componentDidUpdate () {
        this.setPanelState();
    }

    // 抓取 api 資料
    fetchData () {
        fetch(vacationTaiwanSearch.traffic)
            .then(res => res.json())
            .then((data) => {
                const fetchData = JSON.parse(data).map((v) => {
                    return { ...v, isChecked: false };
                });

                this.handleData(fetchData);
            });
    }

    // 整理成 component 會讀的格式
    handleData (data) {
        const transport = data.map((ele) => {
            if (this.props.Traffic === 'ALL') {
                return { ...ele, isChecked: true };
            } else {
                if (this.props.Traffic.indexOf(ele.name) !== -1) {
                    return { ...ele, isChecked: true };
                } else {
                    return { ...ele, isChecked: false };
                }
            }
        });

        this.setState({ transport });
    }

    // 交通工具轉換
    transforTraffic () {
        const { transport } = this.state;
        const arr = [];
        for (let i = 0; i < transport.length; i++) {
            if (!transport[i].isChecked) {
                continue;
            }
            arr.push(transport[i].name);
        }

        const isNone = arr.filter((v) => v === 'ALL'); // 是否有點擊不限，有點擊不限就回傳空值
        if (isNone.length) { // 判斷有無點擊不限
            return 'ALL';
        } else {
            if (arr.length === transport.length - 1) {
                return 'ALL';
            } else {
                return arr.join(',');
            }
        }
    }

    // 傳回父層
    setPanelState () {
        this.props.setPanelState && this.props.setPanelState({ Traffic: this.transforTraffic() });
    }

    handleChecked = (transName, isTrue) => {
        const transport = this.state.transport.map((item) => {
            let temp = Object.assign({}, item);
            if (temp.name === transName) {
                temp.isChecked = isTrue;
            }
            return temp;
        });

        this.setState({ transport });
    }

    render () {
        const { customClass } = this.props;
        const { transport } = this.state;
        return (
            <div className={customClass}>
                {transport.map(({ name, text, isChecked }) =>
                    <CrRcln
                        key={text}
                        type="checkbox"
                        textContent={text}
                        id={name}
                        defaultChecked={isChecked}
                        whenClick={() => {}}
                        whenChange={(e) => this.handleChecked(name, e)}
                    />
                )}
            </div>
        );
    }
}

export default TransportM;