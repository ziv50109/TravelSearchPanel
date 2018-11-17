import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../css.scss';
import Label from './Label/Label';
class Module extends Component {
    render () {
        const {
            subComponent,
            isRequired,
            label,
            icon,
        } = this.props;
        return (
            <Label
                label={label}               // 輸入標籤
                icon={icon}                 // 輸入圖樣
                isRequired={isRequired}     // 是否為必填欄位
                subComponent={subComponent}
            />
        );
    }
}

export default Module;
