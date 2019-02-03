import React, { PureComponent } from 'react';
import IcRcln from '../../../../magaele/ic_rcln';
import Label from '../../share/Label';
import StRnls from '../../../../magaele/st_rnls';
import CrRcln from '../../../../magaele/cr_rcln';
import { vacationTaiwanSearch } from '../../../../source.config';

class Transport extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            transport: []
        };
    }

    componentDidMount () {
        this.fetchData();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.Traffic !== this.props.Traffic) {
            this.setPanelState();
        }
    }

    // 抓取 api 資料
    fetchData () {
        fetch(vacationTaiwanSearch.traffic)
            .then(res => res.json())
            .then((data) => {
                const jsonData = JSON.parse(data);
                const fetchData = jsonData.map((v) => {
                    return { ...v, isChecked: false, disabled: false };
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

    // 打勾和取消
    handleChecked = (transName, isTrue, source) => {
        // const transName = transName === '' ? 'NONE' : transName;
        source && document.getElementById(transName).click();
        const transport = this.state.transport.map((item) => {
            let temp = Object.assign({}, item);
            if (temp.name === transName) {
                temp.isChecked = isTrue;
            }
            return temp;
        });

        this.setState({ transport }, this.setPanelState);
    }

    // 有打勾的回傳
    filterChecked () {
        const transport = this.state.transport.filter(({ isChecked }) => isChecked);
        return transport;
    }

    // render input 裡的小 item
    renderSub = () => {
        return this.filterChecked().map(({ name, text, isChecked }, index) =>
            (isChecked &&
            <span key={name} onClick={(e) => this.handleChecked(name, !isChecked, 'fromSpan')}>
                {text}
                <IcRcln name="tooladdb" />
            </span>
            )
        );
    }

    renderCom = () => {
        const { transport } = this.state;
        return (
            transport.map(({ name, text, isChecked, disabled }) =>
                <CrRcln
                    key={text}
                    type="checkbox"
                    textContent={text}
                    id={name === '' ? 'NONE' : name}
                    defaultChecked={isChecked}
                    whenClick={() => {}}
                    whenChange={(e) => this.handleChecked(name, e)}
                    // disabled={disabled}
                />
            )
        );
    }

    render () {
        const { customClass } = this.props;
        return (
            <div className={customClass}>
                <StRnls
                    CustomComponent={
                        <Label
                            isDouble={false} // 雙欄位
                            customClass={'w-transport'} // 自訂 class
                            title1="交通工具" // 欄位1 title
                            req1
                        >
                            {[
                                <div key="1" className="labelStyle_transport">
                                    <div className="labelStyle_transport__arr">
                                        {this.renderSub()}
                                    </div>
                                    <input type="text" />
                                </div>
                            ]}
                        </Label>
                    }
                    ContentComponent={
                        <React.Fragment>
                            <p className="txt_green">可複選</p>
                            {this.renderCom()}
                        </React.Fragment>
                    }
                    moduleClassName="StRnls1 transBox"
                    width="100%"
                />
            </div>
        );
    }
}

export default Transport;