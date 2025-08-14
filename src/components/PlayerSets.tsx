import type { PlayerData, SetData } from "@/schema";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import PlayerSet from "./PlayerSet";
import { getNbTilesUsed } from "./utils";

type Props = {
    playerData: PlayerData;
    setPlayerData: (playerData: Partial<PlayerData>) => void;
};

export default function PlayerSets(props: Props) {
    const { playerData, setPlayerData } = props;

    function removeSet(index: number) {
        setPlayerData({
            sets: playerData.sets.filter((_, i) => i !== index),
        });
    }

    function updateSet(index: number, setData: SetData) {
        const newSets = [...playerData.sets];
        newSets[index] = setData;
        setPlayerData({
            sets: newSets,
        });
    }

    const remainingTiles = 14 - getNbTilesUsed(playerData);

    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold">Sets</div>
            {/* Add SetForm for each set in players[playerIndex].sets */}
            {playerData.sets.map((setData, index) => (
                <div key={index}>
                    <PlayerSet
                        setData={setData}
                        removeSet={() => removeSet(index)}
                        updateSet={(setData) => updateSet(index, setData)}
                    />
                </div>
            ))}
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={remainingTiles < 3}
                    onClick={() =>
                        setPlayerData({
                            sets: [
                                ...playerData.sets,
                                {
                                    type: "pong",
                                    isHonorOrTerminal: false,
                                    isKong: false,
                                    isFromWall: false,
                                    isDragonOrSelfWind: false,
                                },
                            ],
                        })
                    }
                >
                    <PlusCircle /> Pong
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    disabled={remainingTiles < 3}
                    onClick={() =>
                        setPlayerData({
                            sets: [
                                ...playerData.sets,
                                {
                                    type: "chow",
                                },
                            ],
                        })
                    }
                >
                    <PlusCircle /> Chow
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    disabled={remainingTiles < 2}
                    onClick={() =>
                        setPlayerData({
                            sets: [
                                ...playerData.sets,
                                {
                                    type: "pair",
                                    isDragonOrSelfWind: true,
                                },
                            ],
                        })
                    }
                >
                    <PlusCircle />
                    Pair
                </Button>
            </div>
        </div>
    );
}
