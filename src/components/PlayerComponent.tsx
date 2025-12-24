import type { Player } from "@/model/Player";
import { PlayerHand } from "@/model/PlayerHand";
import PlayerCheckboxes from "./PlayerCheckboxes";
import { PlayerFlowersSeasonsComponent } from "./PlayerFlowersSeasonsComponent";
import PlayerName from "./PlayerName";
import PlayerScoreDetails from "./PlayerScoreDetails";
import PlayerSets from "./PlayerSets";
import { Button } from "./ui/button";
import type { WindName } from "@/model/types";
import { toTitleCase } from "./utils";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    player: Player;
    setPlayer: (player: Player) => void;
    windName: WindName;
    setEastWindIndex: () => void;
};

export default function PlayerComponent(props: Props) {
    const { player, setPlayer, windName, setEastWindIndex } = props;
    const score = PlayerHand.getScore(player.hand);

    return (
        <div className="p-2 border-1 shadow-sm rounded-lg bg-slate-50">
            <div className="h-12 flex justify-between">
                <PlayerName player={player} setPlayer={setPlayer} />
                <div>{score.base * score.mult} pts</div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    {/* East Wind */}
                    <div
                        className={cn({
                            "flex items-center gap-8 px-2": true,
                            "bg-blue-200 shadow": windName === "east",
                        })}
                    >
                        <span>
                            {windName === "east" ? (
                                <span className="font-bold">東 East wind</span>
                            ) : (
                                <span>{toTitleCase(windName) + " wind"}</span>
                            )}
                        </span>
                        {windName !== "east" && (
                            <Button
                                variant="outline"
                                onClick={setEastWindIndex}
                            >
                                東 Set East wind
                            </Button>
                        )}
                    </div>
                    {/* Mahjong */}
                    <div className="flex items-center gap-2 bg-yellow-200 shadow">
                        {PlayerHand.isMahjong(player.hand) && (
                            <span className="flex gap-1 font-bold items-center px-2">
                                <Crown className="w-4 h-4" /> Mahjong
                            </span>
                        )}
                    </div>
                </div>
                <PlayerCheckboxes player={player} setPlayer={setPlayer} />
                <div className="flex flex-col gap-2">
                    <PlayerFlowersSeasonsComponent
                        player={player}
                        setPlayer={setPlayer}
                        type="flowers"
                    />
                    <PlayerFlowersSeasonsComponent
                        player={player}
                        setPlayer={setPlayer}
                        type="seasons"
                    />
                </div>
                <PlayerSets player={player} setPlayer={setPlayer} />
                <PlayerScoreDetails score={PlayerHand.getScore(player.hand)} />
            </div>
        </div>
    );
}
