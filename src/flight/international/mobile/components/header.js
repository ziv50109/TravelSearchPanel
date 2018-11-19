import React from 'react';
import cx from 'classnames';

const Header = props => {
    return (<ul className="Rtow">
        <li
            className={cx({
                active: props.rtow === 0
            })}
            onClick={() => {
                props.tripChange(0);
            }}
        >
        單程
        </li>
        <li
            className={cx({
                active: props.rtow === 1
            })}
            onClick={() => {
                props.tripChange(1);
            }}
        >
        來回
        </li>
        <li
            className={cx({
                active: props.rtow === 3
            })}
            onClick={() => {
                props.tripChange(3);
            }}
        >
        多個目的地
        </li>
    </ul>);
};

export default Header;