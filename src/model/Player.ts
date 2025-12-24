import { PlayerHand } from "./PlayerHand";
import { produce } from "immer";

export type Player = {
    index: number;
    name: string;
    hand: PlayerHand;
    previousHands: PlayerHand[];
};

export const Player = {
    new(index: number) {
        return {
            index,
            name: `Player ${index + 1}`,
            hand: PlayerHand.empty(),
            previousHands: [],
        };
    },

    setName(player: Player, name: string): Player {
        return produce(player, (p) => {
            p.name = name;
        });
    },
};
