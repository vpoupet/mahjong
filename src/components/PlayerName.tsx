import type { Player } from "@/model/Player";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { H3 } from "./typography";
import { Input } from "./ui/input";
import { produce } from "immer";

type Props = {
    player: Player;
    setPlayer: (player: Player) => void;
};

export default function PlayerName(props: Props) {
    const { player, setPlayer } = props;
    const [isEditingName, setIsEditingName] = useState<boolean>(false);

    if (isEditingName) {
        return (
            <Input
                className="w-64"
                placeholder="Player name"
                value={player.name}
                onChange={(e) =>
                    setPlayer(
                        produce(player, (p) => {
                            p.name = e.target.value;
                        })
                    )
                }
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
                <H3>{player.name}</H3>
                <Pencil
                    className="cursor-pointer"
                    onClick={() => setIsEditingName(true)}
                />
            </div>
        );
    }
}
