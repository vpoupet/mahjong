import { GameRound } from "@/model/GameRound";
import { PlayerHand } from "@/model/PlayerHand";
import { Crown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

type Props = {
    gameRound: GameRound;
    previousRounds: GameRound[];
};

export default function PlayersScores(props: Props) {
    const { gameRound, previousRounds } = props;
    const previousWinnings = previousRounds.map((round) =>
        GameRound.winningsTable(round)
    );

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        {gameRound.players.map((player) => (
                            <TableHead
                                key={player.index}
                                className="text-center"
                            >
                                {player.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {previousWinnings.map((winnings, roundIndex) => (
                        <TableRow key={roundIndex}>
                            {winnings.totals.map((total, playerIndex) => (
                                <TableCell
                                    key={playerIndex}
                                    className={"align-middle whitespace-nowrap"}
                                >
                                    <span className="flex items-center justify-end">
                                        {/* East wind indicator */}
                                        {previousRounds[roundIndex]
                                            .eastWindIndex === playerIndex && (
                                            <span className="flex justify-center items-center w-4 h-4 mr-2 bg-blue-200 rounded-full shadow-sm">
                                                東
                                            </span>
                                        )}
                                        {/* Mahjong indicator */}
                                        {PlayerHand.isMahjong(
                                            previousRounds[roundIndex].players[
                                                playerIndex
                                            ].hand
                                        ) && (
                                            <Crown className="w-4 h-4 mr-2 bg-yellow-200 rounded-full shadow-sm" />
                                        )}
                                        {total}
                                    </span>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    {/* Totals */}
                    <TableRow>
                        {gameRound.players.map((_, playerIndex) => (
                            <TableCell
                                key={playerIndex}
                                className="p-2 align-middle whitespace-nowrap font-bold text-right"
                            >
                                {previousWinnings.reduce(
                                    (acc, curr) =>
                                        acc + curr.totals[playerIndex],
                                    0
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
