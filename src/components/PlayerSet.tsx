import { TileSet } from "@/model/TileSet";
import type { SetData } from "@/schema";
import { Trash2 } from "lucide-react";
import PlayerSetOptions from "./PlayerSetOptions";
import { Button } from "./ui/button";
import { toTitleCase } from "./utils";

type Props = {
    set: TileSet;
    removeSet: () => void;
    updateSet: (setData: SetData) => void;
};

export default function PlayerSet(props: Props) {
    const { set, removeSet, updateSet } = props;
    const { base, mult } = TileSet.getScore(set);

    return (
        <div className="p-2 rounded-lg shadow-sm bg-white">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <span className="font-bold w-12">
                        {toTitleCase(set.type)}
                    </span>
                    <Button
                        variant="outline"
                        className="w-fit h-fit p-1"
                        onClick={removeSet}
                    >
                        <Trash2 />
                    </Button>
                </div>
                {base} pts{mult > 1 ? ` (×${mult})` : ""}
            </div>
            <PlayerSetOptions set={set} updateSet={updateSet} />
        </div>
    );
}
