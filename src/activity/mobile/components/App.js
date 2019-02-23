import React, { PureComponent } from 'react';
import { isJsonString } from '../../../../utils';
import { activity } from '../../../../source.config';
import DtmRcfr from '../../../../magaele/dtm_rcfr';
import SearchInput from './searchInput';
import ActRajx from '../../../../magaele/act_rajx';
import '../../activity.scss';

class App extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            showAct: this.props.showAct || false,
            actData: [],
            dtmData: {},
            inputValue: this.props.selectedData.text || this.props.selectedData.txt || '',
            selectedData: this.props.selectedData || {},
        };
        this.actRules = [
            { title: '城市' },
            { title: '區域' },
            { title: '產品' },
        ];
    }

    componentDidMount () {
        const { fetchData } = this.props;
        const sessionData = sessionStorage.getItem(fetchData);
        if (sessionData && isJsonString(sessionData)) {
            const jsonData = JSON.parse(sessionData);
            this.setState({
                dtmData: jsonData
            });
        } else {
            fetch(fetchData)
                .then(r => r.json())
                .then(d => {
                    let stringifyData = JSON.stringify(d);
                    this.setState({
                        dtmData: d
                    });
                    sessionStorage.setItem(fetchData, stringifyData);
                });
        }

        this.checkShowAct();
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.selectedData !== prevProps.selectedData) {
            this.updateState();
        }
    }

    updateState = () => {
        const {
            showAct,
            selectedData
        } = this.props;
        this.setState({
            showAct: showAct,
            inputValue: selectedData.text || selectedData.txt,
            selectedData: selectedData,
        }, () => this.checkShowAct());
    }

    checkShowAct = () => {
        const { showAct } = this.props;
        const { inputValue } = this.state;
        if (showAct) {
            const url = activity.keyword + '?KeyWord=' + encodeURI(inputValue);
            this.fetchDestnActData(url);
        }
    }

    // input 輸入 act_rajx
    handleChangeInputValue = (value) => {
        let show = value.length < 1 ? false : true;

        this.setState({
            showAct: show,
            inputValue: value,
            selectedData: {}
        });
        this.getDataFromServer(value);
    }
    getDataFromServer = (searchKeyword) => {
        console.log('fetching...', searchKeyword);

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const url = activity.keyword + `?Foreign=${this.props.home ? 0 : 1}&KeyWord=` + encodeURI(searchKeyword);
            this.fetchDestnActData(url);
        }, 500);
    };
    fetchDestnActData = (url) => {
        fetch(url)
            .then(r => r.json())
            .then(data => {
                this.processData(data);
            })
            .catch(res => console.error('Request失敗 原因是 :', res));
    }
    processData = (data) => {
        const { Destinations } = data;
        // Destinations 是 fetch的第一個key name
        const dataArray = Destinations.map(item => (
            {
                Foreign: item.Foreign,
                txt: item.Name,
                level2: item.KindName,
                level3: item.Code,
                Kind: item.Kind
            }
        ));

        let actData;
        if (this.props.home) {
            actData = dataArray.filter(e => e.Foreign === '0');
        } else {
            actData = dataArray.filter(e => e.Foreign === '1');
        }

        this.setState({
            actData: actData,
        });
    }

    // act click
    actHandleClick = (data) => {
        this.setState({
            inputValue: data.txt,
            selectedData: data
        });
    };
    // dtm click
    dtmHandleClick = (data) => {
        this.setState({
            inputValue: data.text,
            selectedData: data
        });
    };

    handleSubmit = () => {
        const { home } = this.props;
        const destination = home ? 'taiwanSelectData' : 'foreignSelectData';

        this.props.onClickItem && this.props.onClickItem({
            [destination]: this.state.selectedData,
            visible: 0
        });
    }


    render () {
        const { dtmLevelKey } = this.props;
        const {
            showAct,
            actData,
            inputValue,
            dtmData,
            selectedData
        } = this.state;
        const selectedDataValue = (Object.keys(selectedData).length && selectedData.text) ? [selectedData.value] : [];

        return (
            <React.Fragment>
                <SearchInput
                    placeholder="輸入城市、景點、體驗行程或活動名稱"
                    inputValue={inputValue || ''}
                    handleChangeInputValue={this.handleChangeInputValue}
                    handleSubmit={this.handleSubmit}
                />
                <div className="search_result">
                    <ActRajx
                        containerClass={showAct ? '' : 'd-no'}
                        isFocus={showAct}
                        data={actData}
                        matchWord={inputValue || ''}
                        getItemClickValue={this.actHandleClick}
                        minimumStringQuery="請至少輸入兩個字"
                        noMatchText="很抱歉，找不到符合的項目"
                        minimumStringQueryLength={2}
                        footer={false}
                        rules={this.actRules}
                    />
                    <div className={`DtmRcfrContainer ${!showAct ? '' : 'd-no'}`}>
                        {Object.keys(dtmData).length &&
                            <DtmRcfr
                                levelKey={dtmLevelKey}
                                dataResouce={dtmData}
                                replaceRegular={/[a-zA-Z\(\)\s]/g}
                                onClickItem={this.dtmHandleClick}
                                selectedData={selectedDataValue}
                            />
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
