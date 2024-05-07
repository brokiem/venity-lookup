import { useEffect, useState } from "react"
import { formatPercentage } from "../utils/utils";

export default function BedWarsStatsViewer({ gamertag, gamemode }: { gamertag: string, gamemode: string }) {
    const [stats, setStats] = useState(null as any);

    useEffect(() => {
        fetch(`https://api.venitymc.com/player/${gamertag}/bedwars`).then(r => r.json()).then(r => {
            setStats(r);
        });
    }, []);

    if (!stats) {
        return <p></p>
    }

    return (<>
        <div className="grid grid-cols-3 gap-4">
            {/* Win Rate */}
            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">Wins</p>
                <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(stats[`${gamemode}_wins`])}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">Losses</p>
                <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(stats[`${gamemode}_matches`] - stats[`${gamemode}_wins`])}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">Win Rate</p>
                <p className="font-semibold text-2xl text-center">{
                    formatPercentage(stats[`${gamemode}_wins`] / stats[`${gamemode}_matches`])
                }</p>
            </div>

            {/* Kills Rate */}
            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">Kills</p>
                <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(stats[`${gamemode}_kills`])}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">Deaths</p>
                <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(stats[`${gamemode}_deaths`])}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">K/D Rate</p>
                <p className="font-semibold text-2xl text-center">{
                    formatPercentage(stats[`${gamemode}_kills`] / stats[`${gamemode}_deaths`])
                }</p>
            </div>

            {/* Final Kills Rate */}
            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">Final Kills</p>
                <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(stats[`${gamemode}_final_kills`])}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">Final Deaths</p>
                <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(stats[`${gamemode}_final_deaths`])}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                <p className="font-medium text-center">FK/FD Rate</p>
                <p className="font-semibold text-2xl text-center">{
                    formatPercentage(stats[`${gamemode}_final_kills`] / stats[`${gamemode}_final_deaths`])
                }</p>
            </div>
        </div>
    </>)
}