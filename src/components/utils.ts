import type { playerSchema, setSchema } from "@/schema";
import type z from "zod";

export function getSetScore(set: z.infer<typeof setSchema>) {
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
                base *= 2;
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

export function getScore(playerData: z.infer<typeof playerSchema>) {
    let base = 0;
    let mult = 1;
    const baseDetails: [number, string][] = [];
    const multDetails: [number, string][] = [];

    // Mahjong specific points
    if (playerData.isMahjong) {
        base += 20;
        baseDetails.push([20, "Mah-Jong"]);
        if (playerData.isOneForMahjong) {
            base += 2;
            baseDetails.push([2, "One for Mah-Jong"]);
        }
        if (playerData.sets.filter((set) => set.type === "pong").length === 3) {
            // all Pong
            base += 10;
            baseDetails.push([10, "All Pong"]);
        }
        if (playerData.sets.filter((set) => set.type === "chow").length === 3) {
            // all Chow
            base += 10;
            baseDetails.push([10, "All Chow"]);
        }
    }

    // Flowers and seasons
    const flowersAndSeasonsScore =
        4 * playerData.nbFlowers + playerData.nbSeasons;
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
