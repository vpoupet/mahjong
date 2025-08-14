import type { SetData } from "@/schema";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

type Props = {
    setData: SetData;
    updateSet: (setData: SetData) => void;
};

export default function PlayerSetOptions(props: Props) {
    const { setData, updateSet } = props;

    switch (setData.type) {
        case "pong":
            return (
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={setData.isHonorOrTerminal}
                            onCheckedChange={(checked: boolean) => {
                                if (!checked) {
                                    updateSet({
                                        ...setData,
                                        isDragonOrSelfWind: false,
                                        isHonorOrTerminal: checked,
                                    });
                                } else {
                                    updateSet({
                                        ...setData,
                                        isHonorOrTerminal: checked,
                                    });
                                }
                            }}
                        />
                        <div>Honor or Terminal</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={setData.isKong}
                            onCheckedChange={(checked: boolean) => {
                                updateSet({
                                    ...setData,
                                    isKong: checked,
                                });
                            }}
                        />
                        <div>Kong</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={setData.isFromWall}
                            onCheckedChange={(checked: boolean) => {
                                updateSet({
                                    ...setData,
                                    isFromWall: checked,
                                });
                            }}
                        />
                        <div>From wall</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            disabled={!setData.isHonorOrTerminal}
                            checked={setData.isDragonOrSelfWind}
                            onCheckedChange={(checked: boolean) => {
                                updateSet({
                                    ...setData,
                                    isDragonOrSelfWind: checked,
                                });
                            }}
                        />
                        <div
                            className={cn({
                                "opacity-30": !setData.isHonorOrTerminal,
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
                            checked={setData.isDragonOrSelfWind}
                            onCheckedChange={(checked: boolean) => {
                                updateSet({
                                    ...setData,
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
