import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IcRcln from '../../../ic_rcln/components/Module';
import '../../css.scss';
class Single extends Component {
    static propTypes = {
        query: PropTypes.array,
        inputValue: PropTypes.string,
        placeholder: PropTypes.string,
        isFocus: PropTypes.bool,
        isMax: PropTypes.bool,
        isRequired: PropTypes.bool
    };

    static defaultProps = {
        label: '',
        placeholder: '請輸入',
        isFocus: false,
        isMax: false,
        isRequired: false
    };

    constructor (props) {
        super(props);
        this.state = {
            isMax: false,
            isClean: false,
            isFocus: false
        };
        this.input = React.createRef();
        this.label = React.createRef();
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidUpdate () {
        if (this.state.isFocus) {
            this.input.current.focus();
        }
    }

    handleBlur (e) {
        if (this.props.onBlur) this.props.onBlur();
        this.setState({ isFocus: false, isClean: false });
    }

    handleChange (e) {
        const { onClear, onChange } = this.props;
        if (onChange) this.props.onChange(e);
        // 如果 props 有傳 onClear clean 按鈕打開
        if (onClear) {
            this.setState({ isClean: true });
            if (e.target.value !== '') {
                this.setState({ isClean: true });
            } else {
                this.setState({ isClean: false });
            }
        } else {
            this.setState({ isClean: false });
        }
    }

    handleClick () {
        if (this.props.onClick) this.props.onClick();
    }

    handleFocus (e) {
        const { inputValue, onClear } = this.props;
        if (this.props.onFocus) this.props.onFocus();
        this.setState({ isFocus: true });
        if (onClear) {
            this.setState({ isClean: true });
            if (inputValue !== '') {
                this.setState({ isClean: true });
            } else {
                this.setState({ isClean: false });
            }
        } else {
            this.setState({ isClean: false });
        }
    }

    handleKeyUp (e) {
        const {
            inputValue,
            query,
            onClear
        } = this.props;
        if (this.props.onKeyUp) {
            this.props.onKeyUp(e);
        }
        // Enter鍵
        if (e.keyCode === 13 && inputValue !== '') {
            this.setState({
                isMax: true,
                isClean: true
            });
            if (onClear) {
                this.setState({
                    isClean: true
                });
            } else {
                this.setState({
                    isClean: false
                });
            }
        }

        // Backspace鍵
        if (e.keyCode === 8 && query.length > 0) {
            this.setState({
                isMax: false
            });
        }
    }

    handleEdit (e) {
        if (this.props.onEditValue) {
            this.props.onEditValue(e);
        }
        this.setState({
            isMax: false,
            isFocus: true
        });
    }

    removeItem (i) {
        if (this.props.onClear) {
            this.props.onClear();
        }
    }

    renderTag () {
        const { query } = this.props;
        let tags = [];
        if (query.length > 0) {
            query.map((item, index) => {
                tags.push(
                    <label
                        ref={this.label}
                        className="int-tag"
                        title={item}
                        key={index + item}
                        onClick={this.handleEdit}
                    >
                        {item}
                    </label>
                );
                return tags;
            });
        }
        return tags;
    }

    render () {
        const { placeholder, inputValue } = this.props;
        const classes = cx('int_rctg', {
            isMax: this.state.isMax
        });

        return (
            <div className="int-tags-single">
                {this.renderTag()}
                <input
                    type="text"
                    className={classes}
                    placeholder={placeholder}
                    ref={this.input}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={inputValue}
                />
                {this.state.isClean ? (
                    <div
                        className="cleanBtn"
                        onMouseDown={() => this.removeItem(0)}
                    ><IcRcln name={'tooladdb'} /></div>
                ) : null}
            </div>
        );
    }
}
export default Single;
