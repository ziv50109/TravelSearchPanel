import React, { PureComponent } from 'react';
import CrRcln from '../../../../magaele/cr_rcln';

class TransportM extends PureComponent {
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