import { FormEvent, useEffect, useState } from 'react'
import { DateTime } from "luxon"
import { formatRank } from './utils/utils';
import BedWarsStatsViewer from './components/BedWarsStatsViewer';
import SkyWarsStatsViewer from './components/SkyWarsStatsViewer';
import TheBridgeStatsViewer from './components/TheBridgeStatsViewer';
import DuelsStatsViewer from './components/DuelsStatsViewer';
import RankViewer from './components/RankViewer';

function App() {
    const [gamertag, setGamertag] = useState("brokiemydog");
    const [player, setPlayer] = useState({} as any);

    const [minigame, setMinigame] = useState(null as null | string);
    const [gamemode, setGamemode] = useState(null as null | string);

    const fetchPlayer = () => {
        fetch(`https://api.venitymc.com/player/${gamertag}`).then(r => r.json()).then(r => {
            setPlayer(r);

            setMinigame(null);
            setGamemode(null);

            setMinigame("bedwars");
            setGamemode("squads");
        });
    }

    useEffect(() => {
        fetchPlayer();
    }, []);

    useEffect(() => {
        setGamemode("solo");
    }, [minigame]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetchPlayer();
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="my-10 max-w-2xl w-full px-5 lg:mx-0">
                    <form onSubmit={handleSubmit}>
                        <input name="gamertag" onChange={(e) => setGamertag(e.target.value)} className="w-full rounded-lg border border-[#3a3b3c] bg-transparent py-1 px-2 shadow !ring-0 !outline-none" type="text" placeholder="Player gamertag" />
                    </form>

                    <div className="flex flex-col gap-x-8 w-full">
                        <div className="flex-1">
                            <div className="mt-5 bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                                <div className="flex">
                                    <div className="flex flex-row items-center">
                                        <div className="p-2 bg-[#242526] rounded-xl">
                                            <div className="rounded-full bg-[#454546] size-10 shrink-0">
                                                <img className="rounded-md" src={"https://api.venitymc.com/player/" + player.name + "/avatar.png"} alt="" />
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between w-full">
                                            <div className="flex flex-col justify-center ml-4">
                                                <div className="flex flex-row items-center gap-x-1.5">
                                                    <RankViewer rank={player.rank_name} />
                                                    <p className="font-semibold">{player.name}</p>
                                                </div>
                                                <p className="text-[#b1b3b7] text-sm">Last seen on {DateTime.fromSeconds(player.last_join_at || 0).toLocaleString(DateTime.DATE_MED)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                                    <p className="font-medium text-center">Level</p>
                                    <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(player.level)}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                                    <p className="font-medium text-center">Experience</p>
                                    <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(player.experience)}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                                    <p className="font-medium text-center">Coins</p>
                                    <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(player.coins)}</p>
                                </div>

                                <div className="col-span-2 flex flex-col items-center justify-center overflow-hidden bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                                    <p className="font-medium text-center">Guild</p>
                                    <p className="font-semibold text-2xl text-center text-ellipsis overflow-hidden">{player.guild_name}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-[#303031] py-2.5 px-3 rounded-2xl shadow">
                                    <p className="font-medium text-center">Reputation</p>
                                    <p className="font-semibold text-2xl text-center">{new Intl.NumberFormat("en-US").format(player.reputation)}</p>
                                </div>
                            </div> */}
                        </div>

                        <div className="flex-1">
                            <div className="mt-5">
                                <div className="flex flex-row items-center gap-x-2 bg-[#303031] w-full rounded-lg p-1.5 shadow overflow-auto">
                                    <button id="bedwars-button" onClick={() => setMinigame("bedwars")} className={`${minigame === "bedwars" ? "bg-[#18191a]" : ""} flex-1 rounded-lg px-3 py-0.5 transition-all duration-75`}>
                                        BedWars
                                    </button>
                                    <button id="skywars-button" onClick={() => setMinigame("skywars")} className={`${minigame === "skywars" ? "bg-[#18191a]" : ""} flex-1 rounded-lg px-3 py-0.5 transition-all duration-75`}>
                                        SkyWars
                                    </button>
                                    <button id="thebridge-button" onClick={() => setMinigame("thebridge")} className={`${minigame === "thebridge" ? "bg-[#18191a]" : ""} flex-1 rounded-lg px-3 py-0.5 transition-all duration-75`}>
                                        The Bridge
                                    </button>
                                    <button id="duels-button" onClick={() => setMinigame("duels")} className={`${minigame === "duels" ? "bg-[#18191a]" : ""} flex-1 rounded-lg px-3 py-0.5 transition-all duration-75`}>
                                        Duels
                                    </button>
                                </div>
                            </div>

                            {minigame !== null &&
                                <div className="mt-2">
                                    <div className="flex flex-row items-center gap-x-2 bg-[#303031] w-full rounded-lg p-1.5 shadow">
                                        <button onClick={() => setGamemode("solo")} className={`${gamemode === "solo" ? "bg-[#18191a]" : ""} flex-1 rounded-lg px-3 py-0.5 transition-all duration-75`}>
                                            Solo
                                        </button>
                                        <button onClick={() => setGamemode("doubles")} className={`${gamemode === "doubles" ? "bg-[#18191a]" : ""} flex-1 rounded-lg px-3 py-0.5 transition-all duration-75`}>
                                            Doubles
                                        </button>
                                        {(minigame === "bedwars") && (
                                            <button onClick={() => setGamemode("squads")} className={`${gamemode === "squads" ? "bg-[#18191a]" : ""} flex-1 rounded-lg px-3 py-0.5 transition-all duration-75`}>
                                                Squads
                                            </button>
                                        )}
                                    </div>
                                </div>
                            }

                            {gamemode !== null &&
                                <div className="mt-4">
                                    {minigame === "bedwars" && <BedWarsStatsViewer gamertag={gamertag} gamemode={gamemode} />}
                                    {minigame === "skywars" && <SkyWarsStatsViewer gamertag={gamertag} gamemode={gamemode} />}
                                    {minigame === "thebridge" && <TheBridgeStatsViewer gamertag={gamertag} gamemode={gamemode} />}
                                    {minigame === "duels" && <DuelsStatsViewer gamertag={gamertag} gamemode={gamemode} />}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
