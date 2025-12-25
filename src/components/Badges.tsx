import { Crown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function MahjongBadge() {
    return (
        <Tooltip delayDuration={200}>
            <TooltipTrigger>
                <Crown className="h-4 w-4 bg-yellow-200 rounded-full shadow shadow-gray-400" />
            </TooltipTrigger>
            <TooltipContent>Mahjong</TooltipContent>
        </Tooltip>
    );
}

export function EastWindBadge() {
    return (
        <Tooltip delayDuration={200}>
            <TooltipTrigger>
                <span className="flex justify-center items-center w-4 h-4 bg-blue-200 shadow shadow-gray-400">
                    東
                </span>
            </TooltipTrigger>
            <TooltipContent>East Wind</TooltipContent>
        </Tooltip>
    );
}