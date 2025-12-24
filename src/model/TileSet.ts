import type { Score, ScoreDetail } from "./types";

export type TileSet = {
    type: "pong"
    isHonorOrTerminal: boolean;
    isKong: boolean;
    isFromWall: boolean;
    isDragonOrSelfWind: boolean;
} | {
    type: "chow";
} | {
    type: "pair";
    isDragonOrSelfWind: boolean;
};

export const TileSet = {
    newPong(
        isHonorOrTerminal: boolean,
        isKong: boolean,
        isFromWall: boolean,
        isDragonOrSelfWind: boolean
    ): TileSet {
        return {
            type: "pong",
            isHonorOrTerminal,
            isKong,
            isFromWall,
            isDragonOrSelfWind,
        };
    },

    newChow(): TileSet {
        return {
            type: "chow",
        };
    },

    newPair(isDragonOrSelfWind: boolean): TileSet {
        return {
            type: "pair",
            isDragonOrSelfWind,
        };
    },

    getScore(set: TileSet): Score {
        switch (set.type) {
            case "pong": {
                let base = 2;
                let mult = 1;
                const baseDetails: ScoreDetail[] = [];
                const multDetails: ScoreDetail[] = [];
                if (set.isFromWall) {
                    base *= 2;
                }
                if (set.isHonorOrTerminal) {
                    base *= 2;
                }
                if (set.isKong) {
                    base *= 4;
                }
                if (set.isDragonOrSelfWind) {
                    mult *= 2;
                    multDetails.push({
                        value: 2,
                        description: "Pong of dragons or self wind",
                    });
                }
                baseDetails.push({ value: base, description: "Pong" });
                return { base, mult, baseDetails, multDetails };
            }
            case "chow": {
                return {
                    base: 0,
                    mult: 1,
                    baseDetails: [],
                    multDetails: [],
                };
            }
            case "pair": {
                if (set.isDragonOrSelfWind) {
                    return {
                        base: 2,
                        mult: 1,
                        baseDetails: [
                            {
                                value: 2,
                                description: "Pair of dragons or self wind",
                            },
                        ],
                        multDetails: [],
                    };
                }
                return {
                    base: 0,
                    mult: 1,
                    baseDetails: [],
                    multDetails: [],
                };
            }
        };
    },

    getNbTiles(set: TileSet): number {
        switch (set.type) {
            case "pong":
                return 3;
            case "chow":
                return 3;
            case "pair":
                return 2;
        }
    }
}
