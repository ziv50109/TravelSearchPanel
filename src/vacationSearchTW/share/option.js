import React from 'react';

const departureData = [
    { text: '不限', value: '_' },
    { text: '台北', value: '_TPE' },
    { text: '板橋', value: '_PAN' },
    { text: '桃園', value: '_TAO' },
    { text: '新竹', value: '_HCU' },
    { text: '苗栗', value: '_MLI' },
    { text: '台中', value: '_TCH' },
    { text: '彰化', value: '_CHA' },
    { text: '南投', value: '_NTO' },
    { text: '雲林', value: '_YLI' },
    { text: '嘉義', value: '_CYI' },
    { text: '台南', value: '_TNN' },
    { text: '高雄', value: '_KHH' },
    { text: '屏東', value: '_PIN' },
    { text: '花蓮', value: '_HLN' },
    { text: '台東', value: '_TTT' }
];

const daysOptions = [
    {
        text: '不限',
        value: ''
    },
    {
        text: '2天',
        value: 2
    },
    {
        text: '3天',
        value: 3
    },
    {
        text: '4天',
        value: 4
    },
    {
        text: '5天',
        value: 5
    },
    {
        text: '6天',
        value: 6
    },
    {
        text: '7天',
        value: 7
    },
    {
        text: '8天以上',
        value: 8
    }
];

// 間數options
const roomCount = [
    {
        text: '共1間',
        value: 1,
    },
    {
        text: '共2間',
        value: 2,
    },
    {
        text: '共3間',
        value: 3,
    },
    {
        text: '共4間',
        value: 4,
    },
    {
        text: '共5間',
        value: 5,
    },
    {
        text: '共6間',
        value: 6,
    },
    {
        text: '共7間',
        value: 7,
    }
];

// 取消按鈕
const CloseButton = ({ onClick }) => (
    <button
        className="close_btn"
        onClick={onClick}
    >
        <svg viewBox="0 0 10 10">
            <path d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" />
        </svg>
    </button>
);


export { departureData, daysOptions, roomCount, CloseButton };
