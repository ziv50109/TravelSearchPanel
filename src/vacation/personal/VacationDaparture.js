import React from 'react';
import StRcln from '../../../magaele/st_rcln';
import IcRcln from '../../../magaele/ic_rcln';

// 自由行的出發地
const VacationDaparture = ({
    data,
    defaultValue,
    onChange,
}) => {
    return (
        <div className="vacation_select_group">
            {data.length &&
                <StRcln
                    icon={<IcRcln name="toolmap" />}
                    option={data}
                    label="出發地"
                    defaultValue={defaultValue || ''}
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