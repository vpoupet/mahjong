import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { PlayerData } from "@/schema";
import { Crown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { getScore } from "./utils";

type Props = {
    playersData: PlayerData[];
};

export default function PaymentsTable(props: Props) {
    const { playersData } = props;

    const winnings = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];

    for (let i = 0; i < 4; i++) {
        const p1 = playersData[i];
        const score1 = getScore(p1).total;
        for (let j = i + 1; j < 4; j++) {
            const p2 = playersData[j];
            const score2 = getScore(p2).total;
            if (p1.isMahjong) {
                winnings[i][j] = score1;
                winnings[j][i] = -score1;
            } else if (p2.isMahjong) {
                winnings[i][j] = -score2;
                winnings[j][i] = score2;
            } else {
                winnings[i][j] = score1 - score2;
                winnings[j][i] = score2 - score1;
            }

            if (p1.isEastWind || p2.isEastWind) {
                winnings[i][j] *= 2;
                winnings[j][i] *= 2;
            }
        }
    }

    return (
        <div className="bg-slate-50 rounded-lg p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        {playersData.map((player) => (
                            <TableHead key={player.index}>
                                <PlayerName playerData={player} />
                            </TableHead>
                        ))}
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {winnings.map((row, i) => (
                        <TableRow
                            key={i}
                            className={cn({
                                "bg-slate-200 hover:bg-slate-300": playersData[i].isEastWind,
                            })}
                        >
                            <TableHead>
                                <PlayerName playerData={playersData[i]} />
                            </TableHead>
                            {row.map((value, j) => (
                                <TableCell className="text-center" key={j}>
                                    {i === j ? "" : value}
                                </TableCell>
                            ))}
                            <TableCell className="text-right">
                                {row.reduce((acc, curr) => acc + curr, 0)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function PlayerName(props: { playerData: PlayerData }) {
    const { playerData } = props;

    return (
        <div className="flex items-center gap-1">
            <span>{playerData.name || `Player ${playerData.index + 1}`}</span>
            {playerData.isMahjong && (
                <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                        <Crown className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>Mahjong</TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}
