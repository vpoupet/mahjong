import { z } from "zod";

const pongSchema = z.object({
    type: z.literal("pong"),
    isHonorOrTerminal: z.boolean(),
    isKong: z.boolean(),
    isFromWall: z.boolean(),
    isDragonOrSelfWind: z.boolean(),
});

const chowSchema = z.object({
    type: z.literal("chow"),
});

const pairSchema = z.object({
    type: z.literal("pair"),
    isDragonOrSelfWind: z.boolean(),
});

export const setSchema = z.discriminatedUnion("type", [
    pongSchema,
    chowSchema,
    pairSchema
]);

export const playerSchema = z.object({
    name: z.string(),
    isEastWind: z.boolean(),
    isMahjong: z.boolean(),
    isLastChance: z.boolean(),
    nbFlowers: z.number().min(0).max(4),
    hasOwnFlower: z.boolean(),
    nbSeasons: z.number().min(0).max(4),
    hasOwnSeason: z.boolean(),
    isSingleSuit: z.boolean(),
    sets: z.array(setSchema),
});

export const formSchema = z.object({
    players: z.array(playerSchema)
});