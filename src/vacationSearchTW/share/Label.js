import React from 'react';
import IcRcln from '../../../magaele/ic_rcln';

const Label = ({
    isDouble,
    customClass,
    icon,
    middleIcon,
    title1,
    title2,
    req1,
    req2,
    readOnly1,
    readOnly2,
    value1,
    value2,
    placeholder1,
    placeholder2,
    onChange1,
    onChange2,
    children
}) => {
    return (
        <div className={`labelStyle ${customClass}`}>
            <div className={`labelStyle__left ${!isDouble && 'single'}`}>
                {icon ? (
                    <IcRcln className="labelStyle__icon" name={icon} />
                ) : null}
                <div className="labelStyle__left__rightArea ">
                    <div className="labelStyle__top">
                        <label className="labelStyle__top__title" htmlFor="">
                            {title1}
                        </label>
                        {req1 && (
                            <span className="labelStyle__top__request">*</span>
                        )}
                    </div>
                    {children[0]}
                </div>
            </div>
            {isDouble ? (
                <div className="labelStyle__right">
                    {middleIcon}
                    <div className="labelStyle__right__rightArea">
                        <div className="labelStyle__top">
                            <span className="labelStyle__top__title">
                                {title2}
                            </span>
                            {req2 && (
                                <span className="labelStyle__top__request">
                                    *
                                </span>
                            )}
                        </div>
                        {children[1]}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Label;
