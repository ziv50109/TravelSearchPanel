import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../css.scss';
import IcRcln from '../../ic_rcln';
import IntRcln from '../../int_rcln';
import BtRcnb from '../../bt_rcnb';

const Module = (props) => {
    const {
        readOnly,
        label,
        id,
        count,
        onClickAdd,
        onClickMinus,
        onInputChange,
        onInputBlur,
    } = props;

    const moduleClass = cx('int_gpct', {
        'xin': props.xin,
        'xin-circle': props['xin-circle'],
        'label-unit': props['label-unit']
    });

    let minusBtnClass = cx('minus', props.btnClassMinus, {
        disabled: count <= props.min
    });

    let addBtnClass = cx('add', props.btnClassAdd, {
        disabled: count >= props.max
    });

    return (
        <div className={moduleClass} id={id}>
            <BtRcnb whenClick={onClickMinus} className={minusBtnClass} />
            <IntRcln
                className="amount"
                label={label}
                value={count}
                readOnly={readOnly}
                onChange={onInputChange}
                onBlur={onInputBlur}
            />
            <BtRcnb whenClick={onClickAdd} className={addBtnClass} />
        </div>
    );
};

// Props default value write here
Module.defaultProps = {
    className: '',
    max: 10,
    min: 0,
    readOnly: true,
    label: '',
    count: 0,
    onClickAdd: () => {}, // 按下增加
    onClickMinus: () => {}, // 按下減少
    onInputChange: () => {}, // 手動輸入
    onInputBlur: () => {} //
};

// Typechecking with proptypes, is a place to define prop api
Module.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    max: PropTypes.number,
    min: PropTypes.number,
    readOnly: PropTypes.bool,
    label: PropTypes.string,
    count: PropTypes.number,
    onClickAdd: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    onInputChange: PropTypes.func,
    onInputBlur: PropTypes.func,
};

export default Module;