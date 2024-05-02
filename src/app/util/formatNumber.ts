export function formatNumber(num: number) {
    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(1)}b`;
    } else if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}m`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
}
