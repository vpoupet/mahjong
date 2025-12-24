import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { GameRound } from "@/model/GameRound";
import type { Player } from "@/model/Player";
import { Crown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { PlayerHand } from "@/model/PlayerHand";

type Props = {
    gameRound: GameRound;
};

export default function PaymentsTable(props: Props) {
    const { gameRound } = props;
    const winnings = GameRound.winningsTable(gameRound);

    return (
        <div className="bg-slate-50 rounded-lg p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        {gameRound.players.map((player) => (
                            <TableHead key={player.index}>
                                <PlayerName
                                    player={player}
                                    isMahjong={PlayerHand.isMahjong(
                                        player.hand
                                    )}
                                    isEastWind={
                                        gameRound.eastWindIndex === player.index
                                    }
                                />
                            </TableHead>
                        ))}
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {winnings.table.map((row, i) => (
                        <TableRow
                            key={i}
                            className={cn({
                                "bg-blue-200 hover:bg-blue-300":
                                    gameRound.eastWindIndex === i,
                            })}
                        >
                            <TableHead>
                                <PlayerName
                                    player={gameRound.players[i]}
                                    isMahjong={PlayerHand.isMahjong(
                                        gameRound.players[i].hand
                                    )}
                                    isEastWind={gameRound.eastWindIndex === i}
                                />
                            </TableHead>
                            {row.map((value, j) => (
                                <TableCell className="text-center" key={j}>
                                    {i === j ? "" : value}
                                </TableCell>
                            ))}
                            <TableCell className="text-right">
                                {winnings.totals[i]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function PlayerName(props: {
    player: Player;
    isEastWind: boolean;
    isMahjong: boolean;
}) {
    const { player, isMahjong } = props;

    return (
        <div className="flex items-center gap-1">
            <span>{player.name}</span>
            {isMahjong && (
                <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                        <Crown className="h-4 w-4 bg-yellow-200 rounded-full" />
                    </TooltipTrigger>
                    <TooltipContent>Mahjong</TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}
