export const sortJSON = function (data, key, type = 'asc') {
    // eslint-disable-next-line
    return data.sort(function (a, b) {
        const x = a[key];
        const y = b[key];
        if (type === 'desc') {
            return x > y ? -1 : x < y ? 1 : 0;
        } else if (type === 'asc') {
            return x < y ? -1 : x > y ? 1 : 0;
        }
    });
};
