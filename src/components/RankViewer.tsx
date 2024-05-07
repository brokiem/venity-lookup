import { formatRank, formatRankColor } from "../utils/utils";

export default function RankViewer({ rank }: { rank: string }) {
    const bgColor = formatRankColor(rank);

    return (<>
        <div className="px-1 rounded-md" style={{backgroundColor: bgColor}}>
            <p className="text-sm font-medium">{formatRank(rank)}</p>
        </div>
    </>)
}