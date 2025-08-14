import { cn } from "@/lib/utils";
import type { PlayerData } from "@/schema";
import { Checkbox } from "./ui/checkbox";

type Props = {
    playerData: PlayerData;
    setPlayerData: (playerData: Partial<PlayerData>) => void;
    setMahjong: (value: boolean) => void;
    setEastWind: (value: boolean) => void;
};

export default function PlayerCheckboxes(props: Props) {
    const { playerData, setPlayerData, setMahjong, setEastWind } = props;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                {/* East Wind, Mah-Jong and One for Mah-Jong*/}
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={playerData.isEastWind}
                        onCheckedChange={(checked: boolean) => {
                            setEastWind(checked);
                        }}
                    />
                    <span>East Wind</span>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={playerData.isMahjong}
                        onCheckedChange={(checked: boolean) => {
                            setMahjong(checked);
                        }}
                    />
                    <div>Mah-Jong (+20)</div>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={playerData.isOneForMahjong}
                        onCheckedChange={(checked: boolean) => {
                            setPlayerData({
                                isOneForMahjong: checked,
                            });
                        }}
                        disabled={!playerData.isMahjong}
                    />
                    <div
                        className={cn({
                            "opacity-30": !playerData.isMahjong,
                        })}
                    >
                        One for Mah-Jong (+2)
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                {/* Other checkboxes (single suit) */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={playerData.isSingleSuit}
                        onCheckedChange={(checked: boolean) => {
                            setPlayerData({
                                isSingleSuit: checked,
                            });
                        }}
                    />
                    <span>Single suit (×2)</span>
                </div>
            </div>
        </div>
    );
}
