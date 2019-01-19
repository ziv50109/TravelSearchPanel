import React from 'react';
import StRcln from '../../../magaele/st_rcln';

// 自由行的出發地
const VacationDaparture = ({
    data,
    onChange,
}) => {
    return (
        <div className="vacation_select_group">
            {data.length &&
                <StRcln
                    option={data}
                    label="出發地"
                    defaultValue=""
                    ClassName="strcln_custom"
                    req
                    breakline
                    onChangeCallBack={onChange}
                />
            }
        </div>
    );
};

export default VacationDaparture;