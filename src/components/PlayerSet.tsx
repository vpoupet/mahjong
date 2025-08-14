import type { SetData } from "@/schema";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { getSetScore, toTitleCase } from "./utils";
import PlayerSetOptions from "./PlayerSetOptions";

type Props = {
    setData: SetData;
    removeSet: () => void;
    updateSet: (setData: SetData) => void;
};

export default function PlayerSet(props: Props) {
    const { setData, removeSet, updateSet } = props;
    const { base, mult } = getSetScore(setData);

    return (
        <div className="p-2 rounded-lg shadow-sm bg-white">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <span className="font-bold">
                        {toTitleCase(setData.type)}
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
            <PlayerSetOptions setData={setData} updateSet={updateSet} />
        </div>
    );
}
