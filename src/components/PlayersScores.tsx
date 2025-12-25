import { GameRound } from "@/model/GameRound";
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
    const isGameRoundValid = GameRound.isValid(gameRound);

    // Prepare totals per player
    const playerTotals = [0, 0, 0, 0];
    for (const winnings of previousWinnings) {
        winnings.totals.forEach((total, index) => {
            playerTotals[index] += total;
        });
    }
    // Include current round if valid
    if (isGameRoundValid.success) {
        const currentWinnings = GameRound.winningsTable(gameRound);
        currentWinnings.totals.forEach((total, index) => {
            playerTotals[index] += total;
        });
    }

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
                        <WinningsRow
                            winnings={winnings.totals}
                            eastWindIndex={
                                previousRounds[roundIndex].eastWindIndex
                            }
                            mahjongIndexes={GameRound.getMahjongIndexes(
                                previousRounds[roundIndex]
                            )}
                            key={roundIndex}
                        />
                    ))}
                    {isGameRoundValid.success && (
                        <WinningsRow
                            winnings={GameRound.winningsTable(gameRound).totals}
                            eastWindIndex={gameRound.eastWindIndex}
                            mahjongIndexes={GameRound.getMahjongIndexes(
                                gameRound
                            )}
                            className="text-gray-500"
                        />
                    )}
                    {/* Totals */}
                    <TableRow>
                        {playerTotals.map((total, playerIndex) => (
                            <TableCell
                                key={playerIndex}
                                className="p-2 align-middle whitespace-nowrap font-bold text-right"
                            >
                                {total}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

type WinningsRowProps = {
    winnings: number[];
    eastWindIndex: number;
    mahjongIndexes: number[];
    className?: string;
};

function WinningsRow(props: WinningsRowProps) {
    const { winnings, eastWindIndex, mahjongIndexes, className } = props;
    return (
        <TableRow className={className}>
            {winnings.map((total, playerIndex) => (
                <TableCell
                    key={playerIndex}
                    className="align-middle whitespace-nowrap"
                >
                    <span className="flex items-center justify-end">
                        {/* East wind indicator */}
                        {eastWindIndex === playerIndex && (
                            <span className="flex justify-center items-center w-4 h-4 mr-2 bg-blue-200 shadow-sm">
                                東
                            </span>
                        )}
                        {/* Mahjong indicator */}
                        {mahjongIndexes.includes(playerIndex) && (
                            <Crown className="w-4 h-4 mr-2 bg-yellow-200 rounded-full shadow-sm" />
                        )}
                        {total}
                    </span>
                </TableCell>
            ))}
        </TableRow>
    );
}
