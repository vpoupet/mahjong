import { cn } from "@/lib/utils";
import type { Player } from "@/model/Player";
import { PlayerHand } from "@/model/PlayerHand";
import { produce } from "immer";
import { Checkbox } from "./ui/checkbox";

type Props = {
    player: Player;
    setPlayer: (player: Player) => void;
};

export default function PlayerCheckboxes(props: Props) {
    const { player, setPlayer } = props;
    
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                {/* One for Mahjong */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={player.hand.isOneForMahjong}
                        onCheckedChange={(checked: boolean) => {
                            setPlayer(
                                produce(player, (p) => {
                                    p.hand.isOneForMahjong = checked;
                                })
                            );
                        }}
                    />
                    <div
                        className={cn({
                            "opacity-30": !PlayerHand.isMahjong(player.hand),
                        })}
                    >
                        One for Mahjong (+2)
                    </div>
                </div>
                {/* Single Suit */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={player.hand.isSingleSuit}
                        onCheckedChange={(checked: boolean) => {
                            setPlayer(
                                produce(player, (p) => {
                                    p.hand.isSingleSuit = checked;
                                })
                            );
                        }}
                    />
                    <span>Single suit (×2)</span>
                </div>
            </div>
        </div>
    );
}
