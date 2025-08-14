import { useState } from "react";
import { Input } from "./ui/input";
import type { PlayerData } from "@/schema";
import { H3 } from "./typography";
import { Pencil } from "lucide-react";

type Props = {
    playerData: PlayerData;
    setPlayerData: (playerData: Partial<PlayerData>) => void;
};

export default function PlayerName(props: Props) {
    const { playerData, setPlayerData } = props;
    const [isEditingName, setIsEditingName] = useState<boolean>(false);

    if (isEditingName) {
        return (
            <Input
                className="w-64"
                placeholder="Player name"
                value={playerData.name}
                onChange={(e) => setPlayerData({ name: e.target.value })}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setIsEditingName(false);
                    }
                }}
                onBlur={() => setIsEditingName(false)}
                autoFocus
                onFocus={(e) => e.target.select()}
            />
        );
    } else {
        return (
            <div className="flex gap-4">
                <H3>
                    {playerData.name === ""
                        ? `Player ${playerData.index + 1}`
                        : playerData.name}
                </H3>
                <Pencil
                    className="cursor-pointer"
                    onClick={() => setIsEditingName(true)}
                />
            </div>
        );
    }
}
