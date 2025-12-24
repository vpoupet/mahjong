import { cn } from "@/lib/utils";
import type { Player } from "@/model/Player";
import type { FlowerSeasonInfo } from "@/model/PlayerHand";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { produce } from "immer";

type Props = {
    player: Player;
    setPlayer: (player: Player) => void;
    type: "flowers" | "seasons";
};

export function PlayerFlowersSeasonsComponent(props: Props) {
    const { player, setPlayer, type } = props;
    const info = type === "flowers" ? player.hand.flowers : player.hand.seasons;
    const setInfo = (info: FlowerSeasonInfo) => {
        setPlayer(
            produce(player, (p) => {
                if (type === "flowers") {
                    p.hand.flowers = info;
                } else {
                    p.hand.seasons = info;
                }
            })
        );
    };

    return (
        <div className="flex">
            <div className="flex gap-0">
                <div className="w-36">
                    {type === "flowers" ? "Flowers" : "Seasons"} (+4 each)
                </div>
                <RadioGroup
                    value={info.number.toString()}
                    onValueChange={(value) => {
                        const n = Number(value);
                        setInfo({
                            hasOwn: info.hasOwn && n > 0,
                            number: n,
                        });
                    }}
                    className="flex gap-2 items-center"
                >
                    {[0, 1, 2, 3, 4].map((i) => (
                        <RadioGroupItem
                            key={i}
                            value={i.toString()}
                            className="w-4"
                        ></RadioGroupItem>
                    ))}
                </RadioGroup>
            </div>
            <div className="flex ml-4 items-center gap-2">
                <Checkbox
                    checked={info.hasOwn}
                    onCheckedChange={(checked: boolean) => {
                        setInfo({
                            number: info.number,
                            hasOwn: checked,
                        });
                    }}
                    disabled={info.number === 0}
                />
                <div
                    className={cn({
                        "opacity-30": info.number === 0,
                    })}
                >
                    Has own (×2)
                </div>
            </div>
        </div>
    );
}
