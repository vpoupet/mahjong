// components/PlayerForm.tsx
import { Button } from "@/components/ui/button";
import { formSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";
import PlayerForm from "./PlayerForm";

const defaultValues: z.infer<typeof formSchema> = {
    players: new Array(4).fill(0).map(() => ({
        name: "",
        isEastWind: false,
        isMahjong: false,
        isLastChance: false,
        nbFlowers: 0,
        hasOwnFlower: false,
        nbSeasons: 0,
        hasOwnSeason: false,
        isSingleSuit: false,
        nbFlowersAndSeasons: 0,
        sets: [],
    })),
};

export default function ScoreForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form submitted:", values);
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1">
                    {[...Array(4)].map((_, index) => (
                        <PlayerForm
                            key={index}
                            playerIndex={index}
                            control={form.control}
                            setValue={form.setValue}
                        />
                    ))}
                    <Button type="submit" className="mt-4">
                        Submit
                    </Button>
                </div>{" "}
            </form>
        </FormProvider>
    );
}
