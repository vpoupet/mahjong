import type { PlayerData, SetData } from "@/schema";

export function getSetScore(set: SetData) {
    let base = 0;
    let mult = 1;
    const baseDetails: [number, string][] = [];
    const multDetails: [number, string][] = [];

    switch (set.type) {
        case "pong": {
            base = 2;
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
                multDetails.push([2, "Pong of dragons or self wind"]);
            }
            baseDetails.push([base, "Pong"]);
            break;
        }
        case "chow": {
            break;
        }
        case "pair": {
            if (set.isDragonOrSelfWind) {
                base += 2;
                baseDetails.push([2, "Pair of dragons or self wind"]);
            }
            break;
        }
    }

    return {
        base,
        mult,
        baseDetails,
        multDetails,
    };
}

export function makeWinningsTable(playersData: PlayerData[]) {
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

    return winnings;
}

export function getScore(playerData: PlayerData) {
    let base = 0;
    let mult = 1;
    const baseDetails: [number, string][] = [];
    const multDetails: [number, string][] = [];

    // Mahjong specific points
    if (playerData.isMahjong) {
        base += 20;
        baseDetails.push([20, "Mahjong"]);
        if (playerData.isOneForMahjong) {
            base += 2;
            baseDetails.push([2, "One for Mahjong"]);
        }
        if (playerData.sets.filter((set) => set.type === "pong").length === 4) {
            // all Pong
            base += 10;
            baseDetails.push([10, "All Pong"]);
        }
        if (playerData.sets.filter((set) => set.type === "chow").length === 4) {
            // all Chow
            base += 10;
            baseDetails.push([10, "All Chow"]);
        }
    }

    // Flowers and seasons
    const flowersAndSeasonsScore =
        4 * (playerData.nbFlowers + playerData.nbSeasons);
    if (flowersAndSeasonsScore > 0) {
        base += flowersAndSeasonsScore;
        baseDetails.push([flowersAndSeasonsScore, "Flowers and Seasons"]);
    }
    if (playerData.nbFlowers === 4) {
        mult *= 16;
        multDetails.push([16, "All Flowers"]);
    } else if (playerData.hasOwnFlower) {
        mult *= 2;
        multDetails.push([2, "Own Flower"]);
    }
    if (playerData.nbSeasons === 4) {
        mult *= 16;
        multDetails.push([16, "All Seasons"]);
    } else if (playerData.hasOwnSeason) {
        mult *= 2;
        multDetails.push([2, "Own Season"]);
    }
    if (playerData.isSingleSuit) {
        mult *= 2;
        multDetails.push([2, "Single Suit"]);
    }

    // sets
    for (const set of playerData.sets) {
        const setScore = getSetScore(set);
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
        total: base * mult,
    };
}

export function toTitleCase(str: string | null): string | null {
    if (str === null) {
        return null;
    }
    return str
        .toLowerCase()
        .split("")
        .map((char, index, arr) => {
            // Check if the current character is the first letter or follows a non-letter
            if (
                index === 0 || // First character
                /[^\p{L}]/u.test(arr[index - 1]) // Previous character is not a letter
            ) {
                return char.toUpperCase();
            }
            return char;
        })
        .join("");
}

export function getNbTilesUsed(playerData: PlayerData) {
    let nbTiles = 0;
    for (const set of playerData.sets) {
        switch (set.type) {
            case "pong":
            case "chow":
                nbTiles += 3;
                break;
            case "pair":
                nbTiles += 2;
                break;
        }
    }
    return nbTiles;
}
