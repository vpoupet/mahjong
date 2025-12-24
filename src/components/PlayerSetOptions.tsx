import type { SetData } from "@/schema";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import type { TileSet } from "@/model/TileSet";

type Props = {
    set: TileSet;
    updateSet: (setData: SetData) => void;
};

export default function PlayerSetOptions(props: Props) {
    const { set, updateSet } = props;

    switch (set.type) {
        case "pong":
            return (
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={set.isHonorOrTerminal}
                            onCheckedChange={(checked: boolean) => {
                                if (!checked) {
                                    updateSet({
                                        ...set,
                                        isDragonOrSelfWind: false,
                                        isHonorOrTerminal: checked,
                                    });
                                } else {
                                    updateSet({
                                        ...set,
                                        isHonorOrTerminal: checked,
                                    });
                                }
                            }}
                        />
                        <div>Honor or Terminal</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={set.isKong}
                            onCheckedChange={(checked: boolean) => {
                                updateSet({
                                    ...set,
                                    isKong: checked,
                                });
                            }}
                        />
                        <div>Kong</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={set.isFromWall}
                            onCheckedChange={(checked: boolean) => {
                                updateSet({
                                    ...set,
                                    isFromWall: checked,
                                });
                            }}
                        />
                        <div>From wall</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            disabled={!set.isHonorOrTerminal}
                            checked={set.isDragonOrSelfWind}
                            onCheckedChange={(checked: boolean) => {
                                updateSet({
                                    ...set,
                                    isDragonOrSelfWind: checked,
                                });
                            }}
                        />
                        <div
                            className={cn({
                                "opacity-30": !set.isHonorOrTerminal,
                            })}
                        >
                            Dragon or self wind
                        </div>
                    </div>
                </div>
            );
        case "chow":
            return null;
        case "pair":
            return (
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={set.isDragonOrSelfWind}
                            onCheckedChange={(checked: boolean) => {
                                updateSet({
                                    ...set,
                                    isDragonOrSelfWind: checked,
                                });
                            }}
                        />
                        <div>Dragon or self wind</div>
                    </div>
                </div>
            );
    }
}
