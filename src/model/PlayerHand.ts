import { TileSet } from "./TileSet";
import type { Result, Score, ScoreDetail } from "./types";

export type FlowerSeasonInfo = {
    number: number;
    hasOwn: boolean;
};

export type PlayerHand = {
    isOneForMahjong: boolean;
    flowers: FlowerSeasonInfo;
    seasons: FlowerSeasonInfo;
    isSingleSuit: boolean;
    tileSets: TileSet[];
};

export const PlayerHand = {
    empty(): PlayerHand {
        return {
            isOneForMahjong: false,
            flowers: { number: 0, hasOwn: false },
            seasons: { number: 0, hasOwn: false },
            isSingleSuit: false,
            tileSets: [],
        };
    },

    getScore(hand: PlayerHand): Score {
        let base = 0;
        let mult = 1;
        const baseDetails: ScoreDetail[] = [];
        const multDetails: ScoreDetail[] = [];

        // Mahjong specific points
        if (PlayerHand.isMahjong(hand)) {
            base += 20; // base score for Mahjong
            baseDetails.push({ value: 20, description: "Mahjong" });
            // One for Mahjong
            if (hand.isOneForMahjong) {
                base += 2;
                baseDetails.push({ value: 2, description: "One for Mahjong" });
            }
            // all Pong
            if (
                hand.tileSets.filter((set) => set.type === "pong").length === 4
            ) {
                base += 10;
                baseDetails.push({ value: 10, description: "All Pong" });
            }
            // all Chow
            if (
                hand.tileSets.filter((set) => set.type === "chow").length === 4
            ) {
                base += 10;
                baseDetails.push({ value: 10, description: "All Chow" });
            }
        }

        // Flowers and seasons
        const flowersAndSeasonsScore =
            4 * (hand.flowers.number + hand.seasons.number);
        if (flowersAndSeasonsScore > 0) {
            base += flowersAndSeasonsScore;
            baseDetails.push({
                value: flowersAndSeasonsScore,
                description: "Flowers and Seasons",
            });
        }
        if (hand.flowers.number === 4) {
            mult *= 8;
            multDetails.push({ value: 8, description: "All Flowers" });
        } else if (hand.flowers.hasOwn) {
            mult *= 2;
            multDetails.push({ value: 2, description: "Own Flower" });
        }
        if (hand.seasons.number === 4) {
            mult *= 8;
            multDetails.push({ value: 8, description: "All Seasons" });
        } else if (hand.seasons.hasOwn) {
            mult *= 2;
            multDetails.push({ value: 2, description: "Own Season" });
        }

        // Single suit
        if (hand.isSingleSuit) {
            mult *= 2;
            multDetails.push({ value: 2, description: "Single Suit" });
        }

        // Sets
        for (const set of hand.tileSets) {
            const setScore = TileSet.getScore(set);
            base += setScore.base;
            mult *= setScore.mult;
            baseDetails.push(...setScore.baseDetails);
            multDetails.push(...setScore.multDetails);
        }

        return {
            base,
            mult,
            baseDetails,
            multDetails,
        };
    },

    getNbTiles(hand: PlayerHand): number {
        return hand.tileSets.reduce(
            (acc, set) => acc + TileSet.getNbTiles(set),
            0
        );
    },

    isMahjong(hand: PlayerHand): boolean {
        return PlayerHand.getNbTiles(hand) === 14;
    },

    isValid(hand: PlayerHand): Result {
        if (PlayerHand.getNbTiles(hand) > 14) {
            return { success: false, message: "Too many tiles" };
        }
        if (hand.flowers.number < 0 || hand.flowers.number > 4) {
            return { success: false, message: "Invalid number of flowers" };
        }
        if (hand.flowers.hasOwn && hand.flowers.number === 0) {
            return { success: false, message: "Has own flower but no flowers" };
        }
        if (hand.seasons.number < 0 || hand.seasons.number > 4) {
            return { success: false, message: "Invalid number of seasons" };
        }
        if (hand.seasons.hasOwn && hand.seasons.number === 0) {
            return { success: false, message: "Has own season but no seasons" };
        }
        return { success: true };
    },
};
