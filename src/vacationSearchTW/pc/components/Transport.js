import React, { PureComponent } from 'react';
import IcRcln from '../../../../magaele/ic_rcln';
import Label from '../../share/Label';
import StRnls from '../../../../magaele/st_rnls';
import CrRcln from '../../../../magaele/cr_rcln';

class Transport extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            transport: [
                { name: 'NONE', text: '不限', isChecked: true },
                { name: 'THSR', text: '高鐵', isChecked: true },
                { name: 'TRA', text: '火車', isChecked: true },
                { name: 'AIR', text: '飛機', isChecked: true },
                { name: 'BUS', text: '巴士', isChecked: true },
                { name: 'RENT', text: '租車', isChecked: true },
            ]
        };
    }

    componentDidMount () {
        this.setPanelState();
    }

    componentDidUpdate () {
        this.setPanelState();
    }

    // 交通工具轉換
    transforTraffic () {
        const { transport } = this.state;
        const arr = [];
        for (let i = 0; i < transport.length; i++) {
            if (!transport[i].isChecked) {
                continue;
            }
            arr.push(this.state.transport[i].name);
        }
        return arr.join(',');
    }

    // 傳回父層
    setPanelState () {
        this.props.setPanelState && this.props.setPanelState({ Traffic: this.transforTraffic() });
    }

    // 打勾和取消
    handleChecked = (transName, isTrue, source) => {
        source && document.getElementById(transName).click();
        const transport = this.state.transport.map((item) => {
            let temp = Object.assign({}, item);
            if (temp.name === transName) {
                temp.isChecked = isTrue;
            }
            return temp;
        });

        this.setState({ transport });
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
            transport.map(({ name, text, isChecked }) =>
                <CrRcln
                    key={text}
                    type="checkbox"
                    textContent={text}
                    id={name}
                    defaultChecked={isChecked}
                    whenClick={() => {}}
                    whenChange={(e) => this.handleChecked(name, e)}
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