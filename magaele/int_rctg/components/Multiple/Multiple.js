import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IntRctgInput from '../IntRctgInput';
import '../../css.scss';
class Multiple extends Component {
    static propTypes = {
        query: PropTypes.array,
        inputValue: PropTypes.string,
        placeholder: PropTypes.string,
        maxLength: PropTypes.number,
        isRequired: PropTypes.bool
    };
    static defaultProps = {
        label: '',
        query: [''],
        inputValue: '',
        placeholder: '請輸入',
        maxLength: 3,
        size: 'lg'
    };
    constructor (props) {
        super(props);
        this.state = {
            isMax: false
        };
        this.input = React.createRef();
        this.label = React.createRef();
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    componentDidMount () {
        this.checkLength();
    }
    handleBlur () {
        if (this.props.onBlur) this.props.onBlur();
        this.setState({ isFocus: false });
    }
    handleChange (e) {
        const { setValues } = this.props;
        if (this.props.onChange) this.props.onChange(e);
        setValues({ inputValue: e.target.value });
    }
    handleClick () {
        if (this.props.onClick) this.props.onClick();
    }
    handleFocus () {
        if (this.props.onFocus) this.props.onFocus();
        this.setState({ isFocus: true });
    }
    handleKeyUp (e) {
        const { inputValue, query, maxLength, setValues } = this.props;
        if (this.props.onKeyUp) this.props.onKeyUp();
        let arr = [...query];
        // Enter鍵
        if (e.keyCode === 13 && inputValue !== '') {
            arr.push(inputValue);
            setValues({
                query: arr,
                inputValue: '',
                // isMax: arr.length === maxLength
            });
            this.setState({
                isMax: arr.length === maxLength
            });
        }
        // Backspace鍵
        if (e.keyCode === 8 && arr.length > 0 && inputValue.length === 0) {
            arr.splice(arr.length - 1, 1);
            setValues({
                query: arr,
                inputValue: '',
                // isMax: false
            });
        }
    }
    checkLength () {
        const { query, maxLength, setValues } = this.props;
        if (Array.isArray(query) && query.length > 0) {
            if (query.length === maxLength) {
                // setValues({
                //     isMax: true
                // });
                this.setState({
                    isMax: true
                });
            }
            else if (query.length > maxLength) {
                setValues({
                    query: query.slice(0, maxLength),
                    // isMax: true
                });
                this.setState({
                    isMax: true
                });
            }
            else {
                // setValues({
                //     isMax: false
                // });
                this.setState({
                    isMax: false
                });
            }
        }
    }
    removeItem (i) {
        const { setValues, query } = this.props;
        if (i !== null && query !== null) {
            console.log(i);
            query.splice(i, 1);
            setValues({
                query: query,
                // isMax: false,
                // inputValue: ''
            });
        }

        this.checkLength();
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
                        onClick={() => this.removeItem(index)}
                    >
                        {item}
                        <span>x</span>
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
            isMax: this.state.isMax,
        });
        return (
            <div className="int-tags">
                {this.renderTag()}
                <IntRctgInput
                    className={classes}
                    placeholder={placeholder}
                    inputValue={inputValue}
                    ref={this.input}
                    handleBlur={this.handleBlur}
                    handleChange={this.handleChange}
                    handleFocus={this.handleFocus}
                    handleKeyUp={this.handleKeyUp}
                />
            </div>
        );
    }
}
export default Multiple;