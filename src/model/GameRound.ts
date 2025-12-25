import { produce } from "immer";
import { Player } from "./Player";
import { PlayerHand } from "./PlayerHand";
import type { Result, WindName } from "./types";

export type GameRound = {
    players: Player[];
    eastWindIndex: number;
};

export const GameRound = {
    new() {
        const players = [];
        for (let i = 0; i < 4; i++) {
            players.push(Player.new(i));
        }
        return {
            players,
            eastWindIndex: 0,
        };
    },

    resetPlayersHands(game: GameRound): GameRound {
        return produce(game, (game) => {
            game.players.forEach((player) => {
                player.hand = PlayerHand.empty();
            });
        });
    },

    getWindForPlayer(game: GameRound, playerIndex: number): WindName {
        const relativeIndex = (playerIndex - game.eastWindIndex + 4) % 4;
        const windNames = ["east", "south", "west", "north"] as const;
        return windNames[relativeIndex];
    },

    winningsTable(game: GameRound): {
        table: number[][];
        totals: number[];
    } {
        const winnings = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        for (let i = 0; i < 4; i++) {
            const p1 = game.players[i];
            const score1 = PlayerHand.getScore(p1.hand);
            for (let j = i + 1; j < 4; j++) {
                const p2 = game.players[j];
                const score2 = PlayerHand.getScore(p2.hand);
                if (PlayerHand.isMahjong(p1.hand)) {
                    winnings[i][j] = score1.base * score1.mult;
                    winnings[j][i] = -score1.base * score1.mult;
                } else if (PlayerHand.isMahjong(p2.hand)) {
                    winnings[i][j] = -score2.base * score2.mult;
                    winnings[j][i] = score2.base * score2.mult;
                } else {
                    winnings[i][j] =
                        score1.base * score1.mult - score2.base * score2.mult;
                    winnings[j][i] =
                        score2.base * score2.mult - score1.base * score1.mult;
                }

                if (game.eastWindIndex === i || game.eastWindIndex === j) {
                    winnings[i][j] *= 2;
                    winnings[j][i] *= 2;
                }
            }
        }

        return {
            table: winnings,
            totals: winnings.map((row) =>
                row.reduce((acc, curr) => acc + curr, 0)
            ),
        };
    },

    isValid(gameRound: GameRound): Result {
        const nbMahjong = gameRound.players.filter((p) =>
            PlayerHand.isMahjong(p.hand)
        ).length;
        if (nbMahjong === 0) {
            return {
                success: false,
                message: "No player has Mahjong.",
            };
        }
        if (nbMahjong > 1) {
            return {
                success: false,
                message: `${nbMahjong} players have Mahjong.`,
            };
        }
        for (const player of gameRound.players) {
            const result = PlayerHand.isValid(player.hand);
            if (!result.success) {
                return {
                    success: false,
                    message: `${player.name}: ${result.message}`,
                };
            }
        }
        return {
            success: true,
        };
    },

    getMahjongIndexes(gameRound: GameRound): number[] {
        return gameRound.players
            .filter((player) => PlayerHand.isMahjong(player.hand))
            .map((player) => player.index);
    },
};
