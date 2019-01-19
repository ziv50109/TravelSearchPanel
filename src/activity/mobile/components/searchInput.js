import React from 'react';
import BtRcnb from '../../../../magaele/bt_rcnb';
import IntRcln from '../../../../magaele/int_rcln';
import '../../activity.scss';

const SearchInput = (props) => {
    return (
        <header className="search_input-wrap">
            <h3 className="txt-center page_title m-t-sm m-b-sm">關鍵字搜尋</h3>
            <div className="dtm_rcfr-row">
                <IntRcln
                    value={props.inputValue}
                    placeholder={props.placeholder}
                    onChange={(e) => props.handleChangeInputValue(e.target.value)}
                    onClearValue={() => props.handleChangeInputValue('')}
                />
                <BtRcnb className="dtm-btn" md radius whenClick={props.handleSubmit}>確定</BtRcnb>
            </div>
            <span className="searchNotFoundTxt">找不到選項？請輸入關鍵字查詢</span>
        </header>
    );
};

export default SearchInput;
