import type { Player } from "@/model/Player";
import { PlayerHand } from "@/model/PlayerHand";
import type { TileSet } from "@/model/TileSet";
import { PlusCircle } from "lucide-react";
import PlayerSet from "./PlayerSet";
import { Button } from "./ui/button";
import { produce } from "immer";

type Props = {
    player: Player;
    setPlayer: (player: Player) => void;
};

export default function PlayerSets(props: Props) {
    const { player, setPlayer } = props;

    function removeSet(index: number) {
        setPlayer(
            produce(player, (p) => {
                p.hand.tileSets = p.hand.tileSets.filter((_, i) => i !== index);
            })
        );
    }

    function updateSet(index: number, set: TileSet) {
        setPlayer(
            produce(player, (p) => {
                p.hand.tileSets[index] = set;
            })
        );
    }

    const remainingTiles = 14 - PlayerHand.getNbTiles(player.hand);

    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold">Sets</div>
            {/* Add SetForm for each set in players[playerIndex].sets */}
            {player.hand.tileSets.map((set, index) => (
                <div key={index}>
                    <PlayerSet
                        set={set}
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
                        setPlayer(
                            produce(player, (p) => {
                                p.hand.tileSets.push({
                                    type: "pong",
                                    isHonorOrTerminal: false,
                                    isKong: false,
                                    isFromWall: false,
                                    isDragonOrSelfWind: false,
                                });
                            })
                        )
                    }
                >
                    <PlusCircle /> Pong
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    disabled={remainingTiles < 3}
                    onClick={() =>
                        setPlayer(
                            produce(player, (p) => {
                                p.hand.tileSets.push({
                                    type: "chow",
                                });
                            })
                        )
                    }
                >
                    <PlusCircle /> Chow
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    disabled={remainingTiles < 2}
                    onClick={() =>
                        setPlayer(
                            produce(player, (p) => {
                                p.hand.tileSets.push({
                                    type: "pair",
                                    isDragonOrSelfWind: false,
                                });
                            })
                        )
                    }
                >
                    <PlusCircle />
                    Pair
                </Button>
            </div>
        </div>
    );
}
