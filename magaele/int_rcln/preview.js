import React from 'react';
import IntRcln from './components/Module.js';
import IcRcln from '../ic_rcln';

import { storiesOf } from '@storybook/react';

class TestClear extends React.Component {
    state = {
        value: '北海道'
    };

    changeInput = e => {
        for (let i = 0; i < this.liDOM.childNodes.length; i++) {
            this.liDOM.childNodes[i].classList.remove('active');
        }
        e.target.classList.add('active');
        this.setState({ value: e.target.innerHTML });
    };

    render () {
        return (
            <React.Fragment>
                <IntRcln
                    request
                    label="我是標題"
                    breakline
                    value={this.state.value}
                    // 清除按鈕按下，會傳回當下 input 的 value
                    onClearValue={inputDOM => {
                        console.log(inputDOM);
                        inputDOM.value = '';
                        this.setState({ value: inputDOM.value }); // 用 setState 去清除
                    }}
                />
                <div className="DropDownLayout">
                    <span>日本</span>
                    <ul
                        ref={e => {
                            this.liDOM = e;
                        }}
                    >
                        <li onClick={this.changeInput}>迪士尼</li>
                        <li onClick={this.changeInput}>沖繩</li>
                        <li onClick={this.changeInput}>北海道</li>
                        <li onClick={this.changeInput}>大阪</li>
                        <li onClick={this.changeInput}>橫濱</li>
                        <li onClick={this.changeInput}>鹿兒島</li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

let changeCallBack = (e, data) => {
    // console.log('changeCallBack', data);
};

let blurCallBack = (e, data) => {
    console.log('blur!!', data);
};

class Test extends React.Component {
    state = {
        count: 1
    };
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
    handleClick2 = () => {
        this.setState({
            count: this.state.count - 1
        });
    };
    render () {
        return (
            <div>
                <button onClick={this.handleClick}>外部增加</button>
                <IntRcln
                    placeholder="text some.."
                    className="custom"
                    value={this.state.count}
                    // readOnly
                    color="blue"
                    onBlur={(e, data) => {
                        console.log('e', e.type);
                    }}
                    onChange={(e, data) => {
                        console.log('e', e.type);
                    }}
                    onClick={() => {
                        console.log('on click!');
                    }}
                    label="very loooooooooooooooooong label"
                    breakline
                    icon={<IcRcln name="tooldate" />}
                    onClearValue={value => {
                        this.setState({ count: 0 });
                    }}
                />
                <button onClick={this.handleClick2}>外部減少</button>
            </div>
        );
    }
}

storiesOf('輸入元件 (input)', module).add('int_rcln', () => (
    <div>
        <h2>defaultValue</h2>
        <Test />
        <h2>disabled</h2>
        <IntRcln placeholder="text some.." disabled />
        <h2>color: error, success, blue</h2>
        <IntRcln placeholder="text some.." color="error" />
        <br />
        <IntRcln
            placeholder="text some.."
            color="success"
            onKeyDown={(a, b) => {
                // console.log('keydown', a, b);
            }}
            onKeyPress={(a, b) => {
                // console.log('keypress', a, b);
            }}
            onKeyUp={(a, b) => {
                // console.log('keyup', a, b);
            }}
            onChange={(e, data) => {
                // console.log('onChange', e, data);
            }}
            onBlur={(e, data) => {
                // console.log('onBlur', e, data);
            }}
            onClick={(e, data) => {
                // console.log('onClick', e, data);
            }}
            onCompositionStart={(a, b) => {
                console.log('onCompositionStart', a.target, a.type, b);
            }}
            onCompositionUpdate={(a, b) => {
                console.log('onCompositionUpdate', a.target, a.type, b);
            }}
            onCompositionEnd={(a, b) => {
                console.log('onCompositionEnd', a.target, a.type, b);
            }}
        />
        <br />
        <IntRcln placeholder="text some.." color="blue" />
        <h2>onChange, onBlur(event: SyntheticEvent, data: value)</h2>
        <IntRcln
            placeholder="text some.."
            onChange={changeCallBack}
            onBlur={blurCallBack}
        />
        <h2>label (須自己傳一個class去控制此模組內Input的padding-left)</h2>
        <IntRcln
            placeholder="text some.."
            label="short label"
            style={{ color: 'red' }}
        />
        <h2>breakline</h2>
        <IntRcln placeholder="text some.." label="我是標題" breakline />
        <h2>icon</h2>
        <IntRcln
            placeholder="text some.."
            label="我是標題"
            icon={<IcRcln name="tooldate" />}
            onClearValue={value => {
                console.log(value);
            }}
        />
        <h2>icon without label</h2>
        <IntRcln placeholder="text some.." icon={<IcRcln name="tooldate" />} />
        <h2>readOnly</h2>
        <IntRcln placeholder="text something!!" value="test" readOnly />
        <h2>noBorder</h2>
        <IntRcln placeholder="text some.." noBorder />
        <h2>request</h2>
        <IntRcln
            request
            label="我是標題"
            breakline
            value="12323"
            // 清除按鈕: 用 onMouseDown 去呼叫 handleClearValue，會傳回當下 input 的 value
            onClearValue={value => {
                console.log(value);
            }}
        />
        <h2>清除按鈕</h2>
        <TestClear />
    </div>
));
