import React, { Component } from 'react';
import BtRcnb from '../../../magaele/bt_rcnb';
import '../activity.scss';

// innerValue 運算用
// inputValue 顯示用
class SearchInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            innerValue: ''
        };
        this.textInput = React.createRef();
    }
    focusTextInput () {
        this.textInput.current.focus();
    }
    blurTextInput () {
        this.textInput.current.blur();
    }
    render () {
        const { clearInput, closePage } = this.props;
        let isOnComposition = false;
        const isChrome = !!window.chrome && !!window.chrome.webstore;
        const handleComposition = e => {
            if (!(e.target instanceof HTMLInputElement)) return;

            if (e.type === 'compositionend') {
                if (isChrome) {
                    this.setState({ innerValue: e.target.value });
                    this.props.onTypingFinish(e.target.value);
                }
                isOnComposition = false;
            } else {
                isOnComposition = true;
            }
        };

        const handleChange = e => {
            if (!isOnComposition) {
                this.setState({
                    inputValue: e.target.value,
                    innerValue: e.target.value
                });
                this.props.onTypingFinish(e.target.value);
            } else {
                this.setState({ inputValue: e.target.value });
                this.props.onTyping(e.target.value);
            }
        };

        return (
            <div className="p-t-sm search_input_container_wraper">
                <div className="search_input_container">
                    <input
                        type="text"
                        className="inputContainer outSideSearchInput insideSearchInput fz-md font-bold wrapper-xs"
                        value={this.props.inputValue}
                        ref={this.textInput}
                        placeholder=""
                        onCompositionStart={handleComposition}
                        onCompositionUpdate={handleComposition}
                        onCompositionEnd={handleComposition}
                        onChange={handleChange}
                        onFocus={e => {
                            this.props.onFocus && this.props.onFocus(e);
                        }}
                        onBlur={e => {
                            this.props.onBlur && this.props.onBlur(e);
                        }}
                    />
                    <span onClick={() => clearInput()} className="_crossIcon">
                        {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                viewBox="0 0 14 14"
                                className={this.props.inputValue ? '' : 'd-no'}
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
                <BtRcnb className="sureBtn m-smn" radius whenClick={closePage}>確定</BtRcnb>
            </div>
        );
    }
}

export default SearchInput;
