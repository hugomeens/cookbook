export const parseTime = (preparationTime) => {
    let res = '';
    let hours = Math.floor(preparationTime / 60);
    res += hours > 0 ? `${hours} hours` : '';
    res += Math.floor(preparationTime % 60) + ' min';
    return res;
};