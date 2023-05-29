export const parseTime = (preparationTime) => {
    let res = '';
    let hours = Math.floor(preparationTime / 60);
    res += hours > 0 ? `${hours}h` : '';
    let min = Math.floor(preparationTime % 60);
    res += min > 0 ? `${min}m` : '';
    return res;
};
