export function formatRank(rank: string): string {
    const rankMap = {
        "vip": "VIP",
        "vipp": "VIP+",
        "mvp": "MVP",
        "mvpp": "MVP+",
        "mvppp": "MVP++",
        "owner": "OWNER",
        "admin": "ADMIN",
    } as any;

    return rankMap[rank];
}

export function formatRankColor(rank: string): string {
    const rankMap = {
        "vip": "rgb(22 163 74)",
        "vipp": "rgb(22 163 74)",
        "mvp": "rgb(37 99 235)",
        "mvpp": "rgb(37 99 235)",
        "mvppp": "rgb(67 56 202)",
        "owner": "rgb(185 28 28)",
        "admin": "rgb(220 38 38)",
    } as any;

    return rankMap[rank];
}

export function formatPercentage(value: number) {
    if (isNaN(value)) {
        value = 0;
    }

    return new Intl.NumberFormat("en-US", {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    }).format(value);
}
