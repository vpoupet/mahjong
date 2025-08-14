import { cn } from "@/lib/utils";
import type { PlayerData } from "@/schema";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type Props = {
    playerData: PlayerData;
    setPlayerData: (playerData: Partial<PlayerData>) => void;
};

export default function PlayerFlowersAndSeasons(props: Props) {
    const { playerData, setPlayerData } = props;

    return (
        <div className="flex flex-col gap-1">
            {/* Flowers and Seasons */}
            <div className="ml-36 flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="w-4 text-center">
                        {i}
                    </span>
                ))}
            </div>
            <div className="flex">
                {/* Flowers row */}
                <div className="flex gap-0">
                    <div className="w-36">Flowers (+4 each)</div>
                    <RadioGroup
                        value={playerData.nbFlowers.toString()}
                        onValueChange={(value) => {
                            const n = Number(value);
                            if (n === 0) {
                                setPlayerData({
                                    hasOwnFlower: false,
                                    nbFlowers: n,
                                });
                            } else {
                                setPlayerData({
                                    nbFlowers: n,
                                });
                            }
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
                        checked={playerData.hasOwnFlower}
                        onCheckedChange={(checked: boolean) => {
                            setPlayerData({
                                hasOwnFlower: checked,
                            });
                        }}
                        disabled={playerData.nbFlowers === 0}
                    />
                    <div
                        className={cn({
                            "opacity-30": playerData.nbFlowers === 0,
                        })}
                    >
                        Has own (×2)
                    </div>
                </div>
            </div>
            <div className="flex">
                {/* Seasons row */}
                <div className="flex gap-0">
                    <div className="w-36">Seasons (+4 each)</div>
                    <RadioGroup
                        value={playerData.nbSeasons.toString()}
                        onValueChange={(value) => {
                            const n = Number(value);
                            if (n === 0) {
                                setPlayerData({
                                    hasOwnSeason: false,
                                    nbSeasons: n,
                                });
                            } else {
                                setPlayerData({
                                    nbSeasons: n,
                                });
                            }
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
                        checked={playerData.hasOwnSeason}
                        onCheckedChange={(checked: boolean) => {
                            setPlayerData({
                                hasOwnSeason: checked,
                            });
                        }}
                        disabled={playerData.nbSeasons === 0}
                    />
                    <div
                        className={cn({
                            "opacity-30": playerData.nbSeasons === 0,
                        })}
                    >
                        Has own (×2)
                    </div>
                </div>
            </div>
        </div>
    );
}
