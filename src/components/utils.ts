import type { playerSchema, setSchema } from "@/schema";
import type z from "zod";

export function getSetScore(set: z.infer<typeof setSchema>) {
    let base = 0;
    let mult = 1;

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
            }
            break;
        }
        case "chow": {
            break;
        }
        case "pair": {
            if (set.isDragonOrSelfWind) {
                base += 2;
            }
            break;
        }
    }

    return {
        base,
        mult,
    };
}

export function getScore(playerData: z.infer<typeof playerSchema>) {
    let base = 0;
    let mult = 1;

    // Mahjong specific points
    if (playerData.isMahjong) {
        base += 20;
        if (playerData.isOneForMahjong) {
            base += 2;
        }
        if (playerData.sets.filter((set) => set.type === "pong").length === 3) {
            // all Pong
            base += 10;
        }
        if (playerData.sets.filter((set) => set.type === "chow").length === 3) {
            // all Chow
            base += 10;
        }
    }

    // Flowers and seasons
    base += playerData.nbFlowers * 4;
    base += playerData.nbSeasons * 4;
    if (playerData.nbFlowers === 4) {
        mult *= 16;
    } else if (playerData.hasOwnFlower) {
        mult *= 2;
    }
    if (playerData.nbSeasons === 4) {
        mult *= 16;
    } else if (playerData.hasOwnSeason) {
        mult *= 2;
    }
    if (playerData.isSingleSuit) {
        mult *= 2;
    }

    // sets
    for (const set of playerData.sets) {
        const setScore = getSetScore(set);
        base += setScore.base;
        mult *= setScore.mult;
    }

    return base * mult;
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