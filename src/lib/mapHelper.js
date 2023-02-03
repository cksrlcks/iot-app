const { naver } = window;

export function getState(key) {
    const _key = String(key).slice(-1);
    const statusType = {
        0: 'start',
        1: 'pause',
        2: 'end',
        4: 'start',
        5: 'pause',
        6: 'end',
        7: 'start',
        8: 'pause',
        9: 'end',
    };
    return statusType[_key] || 'etc';
}

export function getStateKOR(key) {
    const _key = getState(key);
    const statusType = {
        start: '주행',
        pause: '정차',
        end: '종료',
    };
    return statusType[_key];
}

export function getMarkerType(key) {
    const makerType = {
        10: 'car start',
        11: 'car pause',
        12: 'car end',
        14: 'car start bluetooth',
        15: 'car pause bluetooth',
        16: 'car end bluetooth',
        17: 'car start network',
        18: 'car pause network',
        19: 'car end network',

        20: 'motorcycle start',
        21: 'motorcycle pause',
        22: 'motorcycle end',
        24: 'motorcycle start bluetooth',
        25: 'motorcycle pause bluetooth',
        26: 'motorcycle end bluetooth',
        27: 'motorcycle start network',
        28: 'motorcycle pause network',
        29: 'motorcycle end network',

        30: 'human start',
        31: 'human pause',
        32: 'human end',
        34: 'human start bluetooth',
        35: 'human pause bluetooth',
        36: 'human end bluetooth',
        37: 'human start network',
        38: 'human pause network',
        39: 'human end network',

        40: 'bike start',
        41: 'bike pause',
        42: 'bike end',
        44: 'bike start bluetooth',
        45: 'bike pause bluetooth',
        46: 'bike end bluetooth',
        47: 'bike start network',
        48: 'bike pause network',
        49: 'bike end network',

        50: 'truck start',
        51: 'truck pause',
        52: 'truck end',
        54: 'truck start bluetooth',
        55: 'truck pause bluetooth',
        56: 'truck end bluetooth',
        57: 'truck start network',
        58: 'truck pause network',
        59: 'truck end network',

        60: 'trash start',
        61: 'trash pause',
        62: 'trash end',
        64: 'trash start bluetooth',
        65: 'trash pause bluetooth',
        66: 'trash end bluetooth',
        67: 'trash start network',
        68: 'trash pause network',
        69: 'trash end network',

        70: 'school start',
        71: 'school pause',
        72: 'school end',
        74: 'school start bluetooth',
        75: 'school pause bluetooth',
        76: 'school end bluetooth',
        77: 'school start network',
        78: 'school pause network',
        79: 'school end network',

        80: 'airplane start',
        81: 'airplane pause',
        82: 'airplane end',
        84: 'airplane start bluetooth',
        85: 'airplane pause bluetooth',
        86: 'airplane end bluetooth',
        87: 'airplane start network',
        88: 'airplane pause network',
        89: 'airplane end network',

        90: 'ship start',
        91: 'ship pause',
        92: 'ship end',
        94: 'ship start bluetooth',
        95: 'ship pause bluetooth',
        96: 'ship end bluetooth',
        97: 'ship start network',
        98: 'ship pause network',
        99: 'ship end network',

        100: 'crane start',
        101: 'crane pause',
        102: 'crane end',
        104: 'crane start bluetooth',
        105: 'crane pause bluetooth',
        106: 'crane end bluetooth',
        107: 'crane start network',
        108: 'crane pause network',
        109: 'crane end network',

        110: 'pet start',
        111: 'pet pause',
        112: 'pet end',
        114: 'pet start bluetooth',
        115: 'pet pause bluetooth',
        116: 'pet end bluetooth',
        117: 'pet start network',
        118: 'pet pause network',
        119: 'pet end network',
    };
    return makerType[key] || '';
}
export function getIconNumber(iconnum) {
    const num = Math.floor(iconnum / 10);
    const name = {
        1: 'car',
        2: 'motorcycle',
        3: 'human',
        4: 'bike',
        5: 'truck',
        6: 'trash',
        7: 'school',
        8: 'airplane',
        9: 'ship',
        10: 'crane',
        11: 'pet',
    };

    return name[num] || '';
}
export function getPhoneNumber(key) {
    return key.substr(2, 3) + '-' + key.substr(5, 4) + '-' + key.substr(9, 4);
}

export function getCenter(data) {
    const y = [];
    const x = [];

    data.forEach((item) => {
        y.push(+item.latitude);
        x.push(+item.longitude);
    });

    const maxY = Math.max.apply(Math, y);
    const minY = Math.min.apply(Math, y);
    const maxX = Math.max.apply(Math, x);
    const minX = Math.min.apply(Math, x);

    const centerY = minY + (maxY - minY) / 2;
    const centerX = minX + (maxX - minX) / 2;

    return { centerY, centerX };
}

export function searchCoordToAddress(position) {
    return new Promise((resolve, reject) => {
        naver.maps.Service.reverseGeocode(
            {
                coords: position,
                orders: [
                    naver.maps.Service.OrderType.ADDR,
                    naver.maps.Service.OrderType.ROAD_ADDR,
                ].join(','),
            },
            function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    reject();
                } else {
                    resolve(response.v2.address);
                }
            }
        );
    });
}

export async function regionSearchByCoords(position) {
    return new Promise((resolve, reject) => {
        naver.maps.Service.reverseGeocode(
            {
                coords: position,
                orders: [
                    naver.maps.Service.OrderType.ADDR,
                    naver.maps.Service.OrderType.ROAD_ADDR,
                ].join(','),
            },
            function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    reject();
                } else {
                    searchByAddr(response.v2.address, reject, resolve);
                }
            }
        );
    });
}

export function searchByAddr(address, reject, resolve) {
    if (!address) {
        reject();
    }

    naver.maps.Service.geocode(
        {
            query: address.jibunAddress,
        },
        function (status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
                reject();
            } else {
                if (response.v2.meta.totalCount === 0) {
                    alert('검색된 결과가 없습니다.');
                    reject();
                } else {
                    resolve(response.v2.addresses[0]);
                }
            }
        }
    );
}

export function searchByDaumPost(address) {
    return new Promise((resolve, reject) => {
        naver.maps.Service.geocode(
            {
                query: address,
            },
            function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    reject();
                } else {
                    if (response.v2.meta.totalCount === 0) {
                        alert('검색된 결과가 없습니다.');
                        reject();
                    } else {
                        resolve(response.v2.addresses[0]);
                    }
                }
            }
        );
    });
}
