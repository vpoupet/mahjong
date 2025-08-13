import type { playerSchema } from "@/schema";
import type z from "zod";

export function getScore(playerData: z.infer<typeof playerSchema>) {
    let score = 0;
    let mult = 1;

    if (playerData.isMahjong) {
        score += 20;
        if (playerData.isLastChance) {
            score += 2;
        }
        if (playerData.sets.filter(set => set.type === "pong").length === 3) {
            // all Pong
            score += 10;
        }
        if (playerData.sets.filter(set => set.type === "chow").length === 3) {
            // all Chow
            score += 10;
        }
    }
    score += playerData.nbFlowers * 4;
    score += playerData.nbSeasons * 4;

    for (const set of playerData.sets) {
        switch (set.type) {
            case "pong": {
                let setValue = 2;
                if (set.isFromWall) {
                    setValue *= 2;
                }
                if (set.isHonorOrTerminal) {
                    setValue *= 2;
                }
                if (set.isKong) {
                    setValue *= 2;
                }
                score += setValue;
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
                    score += 2;
                }
                break;
            }
        }
    }

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

    return score * mult;
}
