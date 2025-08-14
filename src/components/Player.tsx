import type { PlayerData } from "@/schema";
import PlayerCheckboxes from "./PlayerCheckboxes";
import PlayerFlowersAndSeasons from "./PlayerFlowersAndSeasons";
import PlayerName from "./PlayerName";
import PlayerScoreDetails from "./PlayerScoreDetails";
import PlayerSets from "./PlayerSets";
import { getScore } from "./utils";

type Props = {
    playerData: PlayerData;
    setPlayerData: (playerData: Partial<PlayerData>) => void;
    setMahjong: (value: boolean) => void;
    setEastWind: (value: boolean) => void;
};

export default function Player(props: Props) {
    const { playerData, setPlayerData, setMahjong, setEastWind } = props;

    const score = getScore(playerData);
    return (
        <div className="p-2 border-1 shadow-sm rounded-lg bg-slate-50">
            <div className="h-12 flex justify-between">
                <PlayerName playerData={playerData} setPlayerData={setPlayerData} />
                <div>{score.base * score.mult} pts</div>
            </div>
            <div className="flex flex-col gap-4">
                <PlayerCheckboxes
                    playerData={playerData}
                    setPlayerData={setPlayerData}
                    setMahjong={setMahjong}
                    setEastWind={setEastWind}
                />
                <PlayerFlowersAndSeasons
                    playerData={playerData}
                    setPlayerData={setPlayerData}
                />
                <PlayerSets
                    playerData={playerData}
                    setPlayerData={setPlayerData}
                />
                <PlayerScoreDetails score={getScore(playerData)} />
            </div>
        </div>
    );
}
