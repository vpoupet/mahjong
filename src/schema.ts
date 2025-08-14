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
export type SetData = z.infer<typeof setSchema>;

export const playerSchema = z.object({
    index: z.number(),
    name: z.string(),
    isEastWind: z.boolean(),
    isMahjong: z.boolean(),
    isOneForMahjong: z.boolean(),
    nbFlowers: z.number().min(0).max(4),
    hasOwnFlower: z.boolean(),
    nbSeasons: z.number().min(0).max(4),
    hasOwnSeason: z.boolean(),
    isSingleSuit: z.boolean(),
    sets: z.array(setSchema),
});
export type PlayerData = z.infer<typeof playerSchema>;
