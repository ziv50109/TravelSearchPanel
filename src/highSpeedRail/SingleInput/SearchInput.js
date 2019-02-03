import React from 'react';
import IntRcln from '../../../magaele/int_rcln';
// import type { SearchInputProps } from './Definition.js';

const SearchInput = ({ containerClass, labelClass, inputClass, keyWord, parentStcity, clearWord, isFocus, placeholderText, onChange = () => {} }) => {
    let isOnComposition = false;
    let searchKeyWord = null;
    const isChrome = !!window.chrome && !!window.chrome.webstore;

    const handleComposition = (e) => {
        console.log(e);
        if (e.type === 'compositionend') {
            // composition結束，代表中文輸入完成
            isOnComposition = false;
            if (e.target instanceof HTMLInputElement && !isOnComposition && isChrome) {
                // 進行搜尋
                onChange(e.target.value);
            }

        } else {
            // composition進行中，代表正在輸入中文
            isOnComposition = true;
        }

    };
    return (
        <div className={containerClass}>
            <label className={labelClass}>目的地</label>
            <IntRcln
                // readOnly={parentStcity ? false : true}
                placeholder={placeholderText}
                value={keyWord || ''}
                onFocus={() => isFocus && isFocus(true)}
                onBlur={() => isFocus && isFocus(false)}
                onChange={(e) => {
                    // 只有onComposition===false，才作onChange
                    if (e.target instanceof HTMLInputElement && !isOnComposition) {
                        onChange(e.target.value);
                    }
                    clearWord(e.target.value);
                }}
                onClearValue={() => clearWord('')}
            />
        </div>
    );
};
export default SearchInput;
