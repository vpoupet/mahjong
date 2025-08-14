import { useForm } from "react-hook-form";
import ScoreForm from "./components/ScoreForm";
import { H1 } from "./components/typography";
import type z from "zod";
import { formSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues: z.infer<typeof formSchema> = {
    players: new Array(4).fill(0).map(() => ({
        name: "",
        isEastWind: false,
        isMahjong: false,
        isOneForMahjong: false,
        nbFlowers: 0,
        hasOwnFlower: false,
        nbSeasons: 0,
        hasOwnSeason: false,
        isSingleSuit: false,
        nbFlowersAndSeasons: 0,
        sets: [],
    })),
};

function App() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    return (
        <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-100 to-slate-300">
            <main className="p-2 max-w-xl m-auto ">
                <H1>Mah-Jong Score Calculator</H1>
                <ScoreForm form={form} />
            </main>
        </div>
    );
}

export default App;
