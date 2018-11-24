import React, { Component } from 'react';
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
        const { clearInput } = this.props;
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
            <div className="search_input_container_wraper">
                <input
                    type="text"
                    className="outSideSearchInput wrapper-xs m-t-sm fz-md h-sm font-bold "
                    value={this.props.inputValue}
                    ref={this.textInput}
                    placeholder="輸入城市、景點、體驗行程或活動名稱"
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
                <span className="_crossIcon" onClick={() => clearInput()}>
                    {
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 14 14"
                            color="red"
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
        );
    }
}

export default SearchInput;
