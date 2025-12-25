import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { GameRound } from "@/model/GameRound";
import type { Player } from "@/model/Player";
import { EastWindBadge, MahjongBadge } from "./Badges";

type Props = {
    gameRound: GameRound;
};

export default function PaymentsTable(props: Props) {
    const { gameRound } = props;
    const winnings = GameRound.winningsTable(gameRound);
    const mahjongIndexes = GameRound.getMahjongIndexes(gameRound);

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
                                    isEastWind={
                                        gameRound.eastWindIndex === player.index
                                    }
                                    isMahjong={mahjongIndexes.includes(player.index)}
                                />
                            </TableHead>
                        ))}
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {winnings.table.map((row, i) => (
                        <TableRow key={i}>
                            <TableHead>
                                <PlayerName
                                    player={gameRound.players[i]}
                                    isEastWind={gameRound.eastWindIndex === i}
                                    isMahjong={mahjongIndexes.includes(i)}
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
    const { player, isEastWind, isMahjong } = props;

    return (
        <div className="flex items-center gap-1">
            <span>{player.name}</span>
            {isEastWind && <EastWindBadge />}
            {isMahjong && <MahjongBadge />}
        </div>
    );
}
