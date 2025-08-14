import { useState } from "react";
import PaymentsTable from "./components/PaymentsTable";
import Player from "./components/Player";
import { H1 } from "./components/typography";
import { Button } from "./components/ui/button";
import { type PlayerData } from "./schema";

function makeDefaultPlayerData(index: number, name?: string): PlayerData {
    return {
        index,
        name: name ?? `Player ${index + 1}`,
        isEastWind: false,
        isMahjong: false,
        isOneForMahjong: false,
        nbFlowers: 0,
        hasOwnFlower: false,
        nbSeasons: 0,
        hasOwnSeason: false,
        isSingleSuit: false,
        sets: [],
    };
}

function App() {
    const [playersData, setPlayersData] = useState<PlayerData[]>(
        Array.from({ length: 4 }, (_, i) => makeDefaultPlayerData(i))
    );

    function setPlayerData(index: number, playerData: Partial<PlayerData>) {
        const newPlayersData = [...playersData];
        newPlayersData[index] = { ...playersData[index], ...playerData };
        setPlayersData(newPlayersData);
    }

    function resetPlayersData() {
        setPlayersData([
            makeDefaultPlayerData(0, playersData[0].name),
            makeDefaultPlayerData(1, playersData[1].name),
            makeDefaultPlayerData(2, playersData[2].name),
            makeDefaultPlayerData(3, playersData[3].name),
        ]);
    }

    function setMahjong(index: number, value: boolean) {
        const newPlayersData = [...playersData];
        if (value) {
            for (const playerData of newPlayersData) {
                if (playerData.index !== index) {
                    playerData.isMahjong = false;
                    playerData.isOneForMahjong = false;
                }
            }
            newPlayersData[index].isMahjong = true;
        } else {
            newPlayersData[index].isMahjong = false;
            newPlayersData[index].isOneForMahjong = false;
        }
        setPlayersData(newPlayersData);
    }

    function setEastWind(index: number, value: boolean) {
        const newPlayersData = [...playersData];
        if (value) {
            for (const playerData of newPlayersData) {
                if (playerData.index !== index) {
                    playerData.isEastWind = false;
                }
            }
            newPlayersData[index].isEastWind = true;
        } else {
            newPlayersData[index].isEastWind = false;
        }
        setPlayersData(newPlayersData);
    }

    return (
        <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-100 to-slate-300">
            <main className="p-2 max-w-xl m-auto ">
                <H1>Mahjong Score Calculator</H1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        {playersData.map((playerData, index) => (
                            <Player
                                key={index}
                                playerData={playerData}
                                setPlayerData={(playerData) =>
                                    setPlayerData(index, playerData)
                                }
                                setMahjong={(value) => setMahjong(index, value)}
                                setEastWind={(value) =>
                                    setEastWind(index, value)
                                }
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-xl text-center">
                            Players Winnings
                        </div>
                        <PaymentsTable playersData={playersData} />
                    </div>
                    <Button className="w-full" onClick={resetPlayersData}>
                        Reset
                    </Button>
                </div>
            </main>
        </div>
    );
}

export default App;
