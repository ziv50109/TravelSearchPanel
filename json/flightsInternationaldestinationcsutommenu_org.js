﻿let line = {
    '_1A': '美洲',
    '_2A': '大洋洲',
    '_3A': '歐洲',
    '_4A': '其他',
    '_5A': '大陸港澳',
    '_6A': '東北亞',
    '_7A': '東南亞',
    '_9A': '台灣'
};


let _line = {
    '_1A': {
        '_1': '美洲'
    },
    '_2A': {
        '_2': '大洋洲'
    },
    '_3A': {
        '_3': '歐洲'
    },
    '_4A': {
        '_4': '其他'
    },
    '_5A': {
        '_5': '大陸港澳'
    },
    '_6A': {
        '_6': '東北亞'
    },
    '_7A': {
        '_7': '東南亞'
    },
    '_9A': {
        '_9': '台灣'
    }
};

let city = {
    '_1': {
        'LAX': '美國(US)__洛杉磯-加州-LOS ANGELES CA(LAX)',
        'SFO': '美國(US)__舊金山-加州-SAN FRANCISCO CA(SFO)',
        'NYC': '美國(US)__紐約-紐約州-NEW YORK NY(NYC)',
        'YVR': '加拿大(CA)__溫哥華-VANCOUVER(YVR)',
        'ONT': '美國(US)__安大略-加州-ONTARIO CA(ONT)',
        'SEA': '美國(US)__西雅圖-華盛頓州-SEATTLE TACOMA(SEA)',
        'CHI': '美國(US)__芝加哥-伊利諾州-CHICAGO IL(CHI)',
        'YTO': '加拿大(CA)__多倫多-TORONTO(YTO)',
        'HOU': '美國(US)__休士頓-德州-HOUSTON TX(HOU)',
        'WAS': '美國(US)__華盛頓<DC>-WASHINGTON DC(WAS)',
        'BOS': '美國(US)__波士頓-麻塞諸塞州-BOSTON MA(BOS)',
        'YMQ': '加拿大(CA)__蒙特婁-MONTREAL(YMQ)',
        'ATL': '美國(US)__亞特蘭大-喬治亞州-ATLANTA GA(ATL)',
        'HNL': '美國(US)__檀香山<(夏威夷)>-夏威夷州-HONOLULU(HNL)',
        'GUM': '美國(US)__關島-GUAM(GUM)',
        'YYC': '加拿大(CA)__卡加利-CALGARY(YYC)',
        'MEX': '墨西哥(MX)__墨西哥-MEXICO CITY(MEX)',
        'PTY': '巴拿馬(PA)__巴拿馬市-PANAMA CITY(PTY)',
        'LIM': '祕魯(PE)__利馬-LIMA(LIM)',
        'SCL': '智利(CL)__聖地牙哥<(智利)>-SANTIAGO(SCL)'
    },
    '_2': {
        'SYD': '澳大利亞(AU)__雪梨-SYDNEY(SYD)',
        'MEL': '澳大利亞(AU)__墨爾本-MELBOURNE(MEL)',
        'BNE': '澳大利亞(AU)__布里斯班-BRISBANE(BNE)',
        'AKL': '紐西蘭(NZ)__奧克蘭-AUCKLAND(AKL)',
        'CHC': '紐西蘭(NZ)__基督城-CHRISTCHURCH(CHC)',
        'PER': '澳大利亞(AU)__柏斯-PERTH(PER)',
        'ADL': '澳大利亞(AU)__阿德雷德-ADELAIDE(ADL)',
        'OOL': '澳大利亞(AU)__黃金海岸-GOLD COAST(OOL)',
        'CNS': '澳大利亞(AU)__凱恩斯-CAIRNS(CNS)',
        'ROR': '帛琉共和國(PW)__科羅-KOROR(ROR)',
        'ZQN': '紐西蘭(NZ)__皇后鎮-QUEENSTOWN(ZQN)',
        'WLG': '紐西蘭(NZ)__威靈頓-WELLINGTON(WLG)',
        'NAN': '斐濟(FJ)__南地-NADI(NAN)',
        'CBR': '澳大利亞(AU)__坎培拉-CANBERRA(CBR)'
    },
    '_3': {
        'LON': '英國(UK)__倫敦-LONDON(LON)',
        'PAR': '法國(FR)__巴黎-PARIS(PAR)',
        'FRA': '德國(DE)__法蘭克福-FRANKFURT(FRA)',
        'AMS': '荷蘭(NL)__阿姆斯特丹-AMSTERDAM(AMS)',
        'PRG': '捷克(CZ)__布拉格-PRAGUE(PRG)',
        'ROM': '義大利(IT)__羅馬-ROME(ROM)',
        'MAD': '西班牙(ES)__馬德里-MADRID(MAD)',
        'ZRH': '瑞士(CH)__蘇黎世-ZURICH(ZRH)',
        'VIE': '奧地利(AT)__維也納-VIENNA(VIE)',
        'BCN': '西班牙(ES)__巴塞隆納-BARCELONA(BCN)',
        'MIL': '義大利(IT)__米蘭-MILAN(MIL)',
        'CPH': '丹麥(DK)__哥本哈根-COPENHAGEN(CPH)',
        'BER': '德國(DE)__柏林-BERLIN(BER)',
        'MUC': '德國(DE)__慕尼黑-MUNICH(MUC)',
        'REK': '冰島(IS)__雷克雅維克-REYKJAVIK(REK)',
        'ATH': '希臘(GR)__雅典-ATHENS(ATH)',
        'OSL': '挪威(NO)__奧斯陸-OSLO(OSL)',
        'BUD': '匈牙利(HU)__布達佩斯-BUDAPEST(BUD)',
        'STO': '瑞典(SE)__斯德哥爾摩-STOCKHOLM(STO)',
        'LIS': '葡萄牙(PT)__里斯本-LISBON(LIS)'
    },
    '_4': {
        'DXB': '阿拉伯聯合大公國(AE)__杜拜-DUBAI(DXB)',
        'IST': '土耳其(TR)__伊斯坦堡-ISTANBUL(IST)',
        'DEL': '印度(IN)__德里-DELHI(DEL)',
        'KTM': '尼泊爾(NP)__加德滿都-KATHMANDU(KTM)',
        'TLV': '以色列(IL)__特拉維夫-TEL AVIV(TLV)',
        'CPT': '南非(ZA)__開普敦-CAPE TOWN(CPT)',
        'MLE': '馬爾地夫共和國(MV)__馬列-MALE(MLE)',
        'JNB': '南非(ZA)__約翰尼斯堡-JOHANNESBURG(JNB)',
        'CAI': '埃及(EG)__開羅-CAIRO(CAI)',
        'AMM': '約旦(JO)__安曼-AMMAN(AMM)',
        'TNR': '馬達加斯加(MG)__安塔那那利佛-ANTANANARIVO(TNR)',
        'NBO': '肯亞(KE)__奈洛比-NAIROBI(NBO)',
        'BOM': '印度(IN)__孟買-MUMBAI(BOMBAY)',
        'ABJ': '象牙海岸(CI)__阿必尚-ABIDJAN(ABJ)',
        'CMB': '斯里蘭卡(LK)__可倫坡-COLOMBO(CMB)',
        'THR': '伊朗(IR)__德黑蘭-TEHRAN(THR)',
        'LOS': '奈及利亞(NG)__拉哥斯-(LOS)',
        'BDQ': '印度(IN)__瓦度拉達-VADODARA(BDQ)',
        'DAC': '孟加拉(BD)__達卡-DHAKA(DAC)',
        'CAS': '摩洛哥(MA)__卡薩布蘭加-CASABLANCA(CAS)'
    },
    '_5': {
        'HKG': '中國大陸(CN)__香港-HONG KONG(HKG)',
        'SHA': '中國大陸(CN)__上海-SHANGHAI(SHA)',
        'MFM': '中國大陸(CN)__澳門-MACAU(MFM)',
        'BJS': '中國大陸(CN)__北京-BEIJING(BJS)',
        'SZX': '中國大陸(CN)__深圳-廣東省-SHENZHEN(SZX)',
        'FOC': '中國大陸(CN)__福州-福建省-FUZHOU(FOC)',
        'XMN': '中國大陸(CN)__廈門-福建省-XIAMEN(XMN)',
        'CAN': '中國大陸(CN)__廣州-廣東省-GUANGZHOU(CAN)',
        'CTU': '中國大陸(CN)__成都-四川省-CHENGDU(CTU)',
        'CSX': '中國大陸(CN)__長沙-湖南省-CHANGSHA(CSX)',
        'WUH': '中國大陸(CN)__武漢-湖北省-WUHAN(WUH)',
        'NKG': '中國大陸(CN)__南京-江蘇省-NANJING(NKG)',
        'CKG': '中國大陸(CN)__重慶-四川省-CHONGQING(CKG)',
        'HGH': '中國大陸(CN)__杭州-浙江省-HANGZHOU(HGH)',
        'NNG': '中國大陸(CN)__南寧-廣西省-NANNING(NNG)',
        'TAO': '中國大陸(CN)__青島-山東省-QINGDAO(TAO)',
        'SIA': '中國大陸(CN)__西安-陜西省-XIAN(SIA)',
        'WUX': '中國大陸(CN)__無錫-江蘇省-WUXI(WUX)',
        'KMG': '中國大陸(CN)__昆明-雲南省-KUNMING(KMG)',
        'CGO': '中國大陸(CN)__鄭州-河南省-ZHENGZHOU(CGO)'
    },
    '_6': {
        'TYO': '日本(JP)__東京-TOKYO(TYO)',
        'OSA': '日本(JP)__大阪-OSAKA(OSA)',
        'SEL': '韓國(KR)__首爾-SEOUL(SEL)',
        'PUS': '韓國(KR)__釜山-PUSAN(PUS)',
        'OKA': '日本(JP)__沖繩-OKINAWA(OKA)',
        'SPK': '日本(JP)__札幌-北海道-SAPPORO(SPK)',
        'CJU': '韓國(KR)__濟州島-CHEJU(JEJU)(CJU)',
        'TAE': '韓國(KR)__大邱-DAEGU(TAE)',
        'FUK': '日本(JP)__福岡市-福岡縣-FUKUOKA(FUK)',
        'NGO': '日本(JP)__名古屋-愛知縣-NAGOYA(NGO)',
        'HKD': '日本(JP)__函館-北海道-HAKODATE(HKD)',
        'AKJ': '日本(JP)__旭川-北海道-ASAHIKAWA(AKJ)',
        'SDJ': '日本(JP)__仙台市-宮城縣-SENDAI SHI(SDJ)',
        'TOY': '日本(JP)__富山市-富山縣-TOYAMA SHI(TOY)',
        'KMQ': '日本(JP)__小松市-石川縣-KOMATSU SHI(KMQ)',
        'FSZ': '日本(JP)__靜岡市-靜岡縣-SHIZUOKA SHI(FSZ)',
        'HIJ': '日本(JP)__廣島市-廣島縣-HIROSHIMA SHI(HIJ)',
        'TAK': '日本(JP)__高松市-香川縣-TAKAMATSU SHI(TAK)',
        'KOJ': '日本(JP)__鹿兒島市-鹿兒島縣-KAGOSHIMA SHI(KOJ)',
        'KMI': '日本(JP)__宮崎市-宮崎縣-MIYAZAKI SHI(KMI)'
    },
    '_7': {
        'BKK': '泰國(TH)__曼谷-BANGKOK(BKK)',
        'SIN': '新加坡(SG)__新加坡-SINGAPORE(SIN)',
        'SGN': '越南(VN)__胡志明市-HO CHI MINH(SGN)',
        'DPS': '印尼(ID)__峇里島-BALI(DPS)',
        'KUL': '馬來西亞(MY)__吉隆坡-Kuala Lumpur(KUL)',
        'JKT': '印尼(ID)__雅加達-JAKARTA(JKT)',
        'RGN': '緬甸(MM)__仰光-YANGON(RGN)',
        'HAN': '越南(VN)__河內-HANOI(HAN)',
        'MNL': '菲律賓(PH)__馬尼拉-MANILA(MNL)',
        'PNH': '柬埔寨(KH)__金邊-PHNOM PENH(PNH)',
        'CNX': '泰國(TH)__清邁-CHIANG MAI(CNX)',
        'USM': '泰國(TH)__蘇美島-KOH SAMUI(USM)',
        'REP': '柬埔寨(KH)__暹粒(吳哥窟)-ANGKOR WAT(SIEM REAP)(REP)',
        'SUB': '印尼(ID)__泗水-SURABAYA(SUB)',
        'PEN': '馬來西亞(MY)__檳城-PENANG(PEN)',
        'CEB': '菲律賓(PH)__宿霧-CEBU(CEB)',
        'BKI': '馬來西亞(MY)__沙巴(亞庇)-SABAH（KOTA KINABALU）(BKI)',
        'HKT': '泰國(TH)__普吉島-PHUKET(HKT)',
        'MPH': '菲律賓(PH)__長灘島-BORACAY(MPH)',
        'VTE': '寮國(LA)__永珍-VIENTIANE(VTE)'
    },
    '_9': {
        'TPE': '中華民國(TW)__台北<(桃園/松山)>-Taipei(TPE)',
        'TCH': '中華民國(TW)__台中-Taichung(RMQ)',
        'TNN': '中華民國(TW)__台南-Tainan(TNN)',
        'HUN': '中華民國(TW)__花蓮-Hua Lien City(HUN)',
        'KHH': '中華民國(TW)__高雄-Kaohsiung(KHH)'
    }
};