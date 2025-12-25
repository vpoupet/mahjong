import { produce } from "immer";
import { SquareArrowRight } from "lucide-react";
import { useState } from "react";
import PaymentsTable from "./components/PaymentsTable";
import PlayerComponent from "./components/PlayerComponent";
import PlayersScores from "./components/PlayersScores";
import { H1 } from "./components/typography";
import { Button } from "./components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./components/ui/tooltip";
import { GameRound } from "./model/GameRound";
import type { Player } from "./model/Player";
import { PlayerHand } from "./model/PlayerHand";

function App() {
    const [previousRounds, setPreviousRounds] = useState<GameRound[]>([]);
    const [gameRound, setGameRound] = useState<GameRound>(GameRound.new());

    function resetPlayersHands() {
        setGameRound(GameRound.resetPlayersHands(gameRound));
    }

    function nextRound() {
        const newPreviousRounds = [...previousRounds, gameRound];
        setPreviousRounds(newPreviousRounds);
        const isMahjongEast = PlayerHand.isMahjong(
            gameRound.players[gameRound.eastWindIndex].hand
        );
        console.log(JSON.stringify(newPreviousRounds));
        setGameRound(
            produce(gameRound, (gr) => {
                for (const player of gr.players) {
                    player.hand = PlayerHand.empty();
                }
                if (!isMahjongEast) {
                    gr.eastWindIndex = (gr.eastWindIndex + 1) % 4;
                }
            })
        );
    }

    const isValidRound = GameRound.isValid(gameRound);

    return (
        <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-100 to-slate-300">
            <main className="p-2 max-w-xl m-auto ">
                <H1>Mahjong Score Calculator</H1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        {gameRound.players.map((player, index) => (
                            <PlayerComponent
                                key={index}
                                player={player}
                                setPlayer={(p: Player) => {
                                    setGameRound(
                                        produce(gameRound, (gameRound) => {
                                            gameRound.players[index] = p;
                                        })
                                    );
                                }}
                                windName={GameRound.getWindForPlayer(
                                    gameRound,
                                    index
                                )}
                                setEastWindIndex={() => {
                                    setGameRound(
                                        produce(gameRound, (gameRound) => {
                                            gameRound.eastWindIndex =
                                                player.index;
                                        })
                                    );
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-xl text-center">
                            Players Winnings
                        </div>
                        <PaymentsTable gameRound={gameRound} />
                    </div>
                    <div className="flex gap-2">
                        {isValidRound.success ? (
                            <Button className="flex-1" onClick={nextRound}>
                                Next Round
                            </Button>
                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild className="flex-1">
                                    <span className="w-full">
                                        <Button
                                            type="button"
                                            className="w-full"
                                            onClick={nextRound}
                                            disabled
                                        >
                                            <SquareArrowRight /> Next Round
                                        </Button>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {isValidRound.message}
                                </TooltipContent>
                            </Tooltip>
                        )}
                        <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={resetPlayersHands}
                        >
                            Reset
                        </Button>
                    </div>
                    <PlayersScores
                        gameRound={gameRound}
                        previousRounds={previousRounds}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
