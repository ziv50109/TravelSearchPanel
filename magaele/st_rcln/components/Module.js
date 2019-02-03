import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import CSSModules from 'react-css-modules';
import cx from 'classnames';
import styles from '../css.scss';

function getDomPosition (elem, property) {
    if (property === 'top') return elem.getBoundingClientRect()[property] + document.documentElement.scrollTop;
    return elem.getBoundingClientRect()[property];
}
function findHighestZIndex (elem) {
    const elems = document.getElementsByTagName(elem);
    let highest = 0;
    for (let i = 0; i < elems.length; i++) {
        const zindex = document.defaultView.getComputedStyle(elems[i], null).getPropertyValue('z-index');
        if ((zindex > highest) && (zindex !== 'auto')) {
            highest = zindex;
        }
    }
    return parseInt(highest, 10);
}
class Module extends Component {
    constructor (props) {
        super(props);
        this.state = {
            placeholder: this.props.placeholder || `請選擇`,
            open: false,
            focus: false,
            // option: this.props.option,
            searchKey: '',
            selectValue: ''
        };
        this._clickHandler = this._clickHandler.bind(this);
        this._onBlurHandler = this._onBlurHandler.bind(this);
        this._onFocusHandler = this._onFocusHandler.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this.onItemSearch = this.onItemSearch.bind(this);
        this.selectValueOnChangeEvent = this.selectValueOnChangeEvent.bind(this);
        this.isMouseDown = false;
        this.searchText = '';
    }
    componentDidMount () {
        this.forceUpdate();
        if (typeof this.props.defaultValue !== 'undefined' && this.props.option.length > 0) {
            this._setDefaultValue();
        }
    }
    // UNSAFE_componentWillReceiveProps (nextProps) {
    //     if (nextProps.placeholder && nextProps.placeholder !== '請選擇') {
    //         this.setState({
    //             placeholder: nextProps.placeholder,
    //             searchKey: nextProps.placeholder
    //         });
    //     }
    // }
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.option !== this.props.option || prevProps.defaultValue !== this.props.defaultValue) this._fetchOptions();
        if (prevState.open === false && this.state.open === true) this.props.whenOpenCallBack && this.props.whenOpenCallBack();
        if (prevState.open === true && this.state.open === false) this.props.whenCloseCallBack && this.props.whenCloseCallBack();
    }
    _setDefaultValue () {
        let searchKey = this.props.option.filter((ele, i) => {
            // console.log(ele);
            if (ele.value === this.props.defaultValue) {
                // console.log(ele.text);
                return ele.text;
            }
        });
        this.setState({
            selectValue: this.props.defaultValue,
            searchKey: searchKey[0].text,
            placeholder: searchKey[0].text,
            selected: true
        });
    }
    _clickHandler () {
        this.setState({
            open: !this.state.open
        });
    }
    _fetchOptions () {
        if (typeof this.props.defaultValue !== 'undefined' && this.props.option.length > 0) {
            this._setDefaultValue();
        }
        if (this.props.placeholder && this.props.placeholder !== '請選擇') {
            this.setState({
                placeholder: this.props.placeholder,
                searchKey: this.props.placeholder
            });
        }
    }
    _onBlurHandler () {

        this.setState({ focus: false, open: false }, () => {
            if (this.isMouseDown) {
                if (typeof this.textInput !== 'undefined') {
                    this.textInput.focus();
                } else {
                    this.Input.focus();
                }
                this.isMouseDown = false;
            }
        });
    }
    _onFocusHandler (e) {
        this.setState({ focus: true });
    }
    _onMouseDown () {
        this.isMouseDown = true;
        this.props.whenMouseDown && this.props.whenMouseDown();
    }
    _onMouseUp () {
        this.isMouseDown = false;
    }
    selectValueOnChangeEvent (e) {
        e.stopPropagation();
        this.setState({
            selectValue: e.target.value,
            searchKey: this.props.option[e.target.selectedIndex].text,
            placeholder: this.props.option[e.target.selectedIndex].text,
            selected: true
        }, () => {
            this.props.onChangeCallBack && this.props.onChangeCallBack(this.state.selectValue);
        });
    }
    onItemSearch (e) {
        this.searchText = e.target.value;
        this.setState({ searchKey: e.target.value });
    }
    listDataArr () {
        let searchOptionArr = [...this.props.option];
        let searchText = this.searchText;
        return searchOptionArr.filter((item, index) => item.text.indexOf(searchText) !== -1);
    }

    render () {
        const {
            disabled,
            req,
            icon,
            label,
            breakline,
            contentEditable,
            success,
            error
        } = this.props;
        let floatContainer = {
            display: this.state.open ? 'block' : 'none',
            top: this.Input ? getDomPosition(this.Input, 'top') + getDomPosition(this.Input, 'height') + 'px' : 0,
            minWidth: this.Input ? getDomPosition(this.Input, 'width') + 'px' : 0,
            left: this.Input ? getDomPosition(this.Input, 'left') + 'px' : 0,
        };
        return (
            <div
                tabIndex="-1"
                className={cx('st_rcln', this.props.ClassName, {
                    disabled: disabled,
                    success: success,
                    error: error,
                    action: this.state.open
                })}
                onFocus={(e) => { !disabled && this._onFocusHandler(e); this.props.whenFocus && this.props.whenFocus() }}
                onBlur={(e) => { !disabled && this._onBlurHandler(e); this.props.onBlurCallBack && this.props.onBlurCallBack() }}
                onClick={() => { !disabled && this._clickHandler(); this.props.whenClick && this.props.whenClick() }}
                onMouseDown={this._onMouseDown}
                onMouseUp={this._onMouseUp}
                ref={input => { this.Input = input }}
            >
                <select className="real-select" onChange={(e) => this.selectValueOnChangeEvent(e)} onClick={(e) => this.selectValueOnChangeEvent(e)} onMouseDown={(e) => disabled && e.preventDefault()} value={this.state.selectValue} disabled={disabled ? true : false}>
                    {
                        this.props.option && this.props.option.map((item, i) => {
                            return <option key={i} value={item.value} >{item.text}</option>;
                        })
                    }
                </select>
                {
                    icon && icon
                }
                <div className={cx('dropdown-place-holder', {
                    selected: this.state.selected,
                    breakline: breakline,
                    withIcon: icon
                })}
                >
                    {
                        label && (
                            <span className={cx('dropdown-label', { req: req, breakline: breakline })}>{label}</span>
                        )
                    }
                    {
                        contentEditable ?
                            <input
                                type="text"
                                placeholder={this.state.placeholder}
                                value={this.state.searchKey}
                                ref={input => { this.textInput = input }}
                                onChange={this.onItemSearch}
                            />
                            : this.state.placeholder
                    }
                </div>
                {
                    ReactDOM.createPortal(
                        <div className={
                            (() => {
                                let classStr = 'dropdown-content ';
                                if (this.props.dropdownContentClassName !== '') {
                                    classStr += this.props.dropdownContentClassName;
                                }
                                return classStr;
                            })()
                        }
                            style={floatContainer}
                        >
                            {
                                this.props.option && this.listDataArr().map((item, i) => {
                                    return (
                                        <span
                                            key={i}
                                            onMouseDown={() => {
                                                this.setState({
                                                    placeholder: item.text,
                                                    selectValue: item.value,
                                                    selected: true,
                                                    searchKey: item.text
                                                }, () => {
                                                    this.props.onChangeCallBack && this.props.onChangeCallBack(this.state.selectValue);
                                                });
                                            }}
                                        >
                                            {item.text}
                                        </span>
                                    );
                                })
                            }
                        </div>, document.body
                    )
                }

            </div>
        );
    }
}

// export default CSSModules(Module, styles, {
//     allowMultiple: true
// });

export default Module;
