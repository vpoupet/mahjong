import { useState } from "react";
import PaymentsTable from "./components/PaymentsTable";
import Player from "./components/Player";
import { H1 } from "./components/typography";
import { type PlayerData } from "./schema";

const defaultValues: PlayerData[] = new Array(4).fill(0).map((_, i) => ({
    index: i,
    name: "",
    isEastWind: false,
    isMahjong: false,
    isOneForMahjong: false,
    nbFlowers: 0,
    hasOwnFlower: false,
    nbSeasons: 0,
    hasOwnSeason: false,
    isSingleSuit: false,
    nbFlowersAndSeasons: 0,
    sets: [],
}));

function App() {
    const [playersData, setPlayersData] = useState<PlayerData[]>(defaultValues);

    function setPlayerData(index: number, playerData: Partial<PlayerData>) {
        const newPlayersData = [...playersData];
        newPlayersData[index] = { ...playersData[index], ...playerData };
        setPlayersData(newPlayersData);
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
                <div className="flex flex-col gap-1">
                    {playersData.map((playerData, index) => (
                        <Player
                            key={index}
                            playerData={playerData}
                            setPlayerData={(playerData) =>
                                setPlayerData(index, playerData)
                            }
                            setMahjong={(value) => setMahjong(index, value)}
                            setEastWind={(value) => setEastWind(index, value)}
                        />
                    ))}
                </div>
                <PaymentsTable playersData={playersData} />
            </main>
        </div>
    );
}

export default App;
