import type { formSchema } from "@/schema";
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";
import {
    useFieldArray,
    useWatch,
    type Control,
    type UseFormSetValue,
} from "react-hook-form";
import type z from "zod";
import SetForm from "./SetForm";
import { H3 } from "./typography";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type Props = {
    playerIndex: number;
    control: Control<z.infer<typeof formSchema>>;
    setValue: UseFormSetValue<z.infer<typeof formSchema>>;
};

export default function PlayerForm(props: Props) {
    const { playerIndex, control, setValue } = props;
    const isMahjong = useWatch({
        control,
        name: `players.${playerIndex}.isMahjong`,
    });
    const nbFlowers = useWatch({
        control,
        name: `players.${playerIndex}.nbFlowers`,
    });
    const nbSeasons = useWatch({
        control,
        name: `players.${playerIndex}.nbSeasons`,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: `players.${playerIndex}.sets`,
    });

    useEffect(() => {
        // Always force isLastChance to false when isMahjong is false
        if (isMahjong === false) {
            setValue(`players.${playerIndex}.isLastChance`, false);
        }
    }, [isMahjong, playerIndex, setValue]);

    useEffect(() => {
        // Set hasOwnFlower to false if nbFlowers is 0
        if (nbFlowers === 0) {
            setValue(`players.${playerIndex}.hasOwnFlower`, false);
        }
    }, [nbFlowers, playerIndex, setValue]);

    useEffect(() => {
        // Set hasOwnSeason to false if nbSeasons is 0
        if (nbSeasons === 0) {
            setValue(`players.${playerIndex}.hasOwnSeason`, false);
        }
    }, [nbSeasons, playerIndex, setValue]);

    return (
        <div className="p-2 border-1 shadow-sm rounded-lg bg-slate-50">
            <H3>Player {playerIndex + 1}</H3>
            <div className="flex flex-col gap-4">
                <FormField
                    // Player name
                    control={control}
                    name={`players.${playerIndex}.name`}
                    render={({ field }) => (
                        <FormItem className="flex">
                            <FormLabel className="w-16">Name</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-64"
                                    placeholder="Enter player name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4">
                    <FormField
                        // East Wind
                        control={control}
                        name={`players.${playerIndex}.isEastWind`}
                        render={({ field }) => (
                            <FormItem className="flex gap-2">
                                <FormControl>
                                    <Checkbox
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>East Wind</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        // Mah-Jong
                        control={control}
                        name={`players.${playerIndex}.isMahjong`}
                        render={({ field }) => (
                            <FormItem className="flex gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Mah-Jong (+20)</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        // Last Chance
                        control={control}
                        name={`players.${playerIndex}.isLastChance`}
                        render={({ field }) => (
                            <FormItem className="flex gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={!isMahjong}
                                    />
                                </FormControl>
                                <FormLabel>Last Chance (+2)</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="ml-32 flex gap-2">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <span key={i} className="w-4 text-center">
                                {i}
                            </span>
                        ))}
                    </div>
                    <div className="flex">
                        <FormField
                            // Flowers
                            control={control}
                            name={`players.${playerIndex}.nbFlowers`}
                            render={({ field }) => (
                                <FormItem className="flex gap-0">
                                    <FormLabel className="w-32">
                                        Flowers (+4 each)
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value.toString()}
                                            onValueChange={(value) => {
                                                field.onChange(Number(value));
                                            }}
                                            className="flex gap-2"
                                        >
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <RadioGroupItem
                                                    key={i}
                                                    value={i.toString()}
                                                    className="w-4"
                                                ></RadioGroupItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            // Has own flower
                            control={control}
                            name={`players.${playerIndex}.hasOwnFlower`}
                            render={({ field }) => (
                                <FormItem className="flex ml-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={nbFlowers === 0}
                                        />
                                    </FormControl>
                                    <FormLabel className="">
                                        Has own (x2)
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex">
                        <FormField
                            // Seasons
                            control={control}
                            name={`players.${playerIndex}.nbSeasons`}
                            render={({ field }) => (
                                <FormItem className="flex gap-0">
                                    <FormLabel className="w-32">
                                        Seasons (+4 each)
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value.toString()}
                                            onValueChange={(value) => {
                                                field.onChange(Number(value));
                                            }}
                                            className="flex gap-2"
                                        >
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <RadioGroupItem
                                                    key={i}
                                                    value={i.toString()}
                                                    className="w-4"
                                                ></RadioGroupItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            // Has own season
                            control={control}
                            name={`players.${playerIndex}.hasOwnSeason`}
                            render={({ field }) => (
                                <FormItem className="flex ml-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            disabled={nbSeasons === 0}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-right">
                                        Has own (x2)
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div>
                    <FormField
                        control={control}
                        name={`players.${playerIndex}.isSingleSuit`}
                        render={({ field }) => (
                            <FormItem className="flex gap-2">
                                <FormControl>
                                    <Checkbox
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Single suit (x2)</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-bold">Sets</div>
                    {/* Add SetForm for each set in players[playerIndex].sets */}
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <SetForm
                                type={field.type}
                                control={control}
                                setValue={setValue}
                                playerIndex={playerIndex}
                                setIndex={index}
                                remove={() => remove(index)}
                            />
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                append({
                                    type: "pong",
                                    isHonorOrTerminal: false,
                                    isKong: false,
                                    isFromWall: false,
                                    isDragonOrSelfWind: false,
                                })
                            }
                        >
                            <PlusCircle /> Pong
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                append({
                                    type: "chow",
                                })
                            }
                        >
                            <PlusCircle /> Chow
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                append({
                                    type: "pair",
                                    isDragonOrSelfWind: true,
                                })
                            }
                        >
                            <PlusCircle />
                            Pair
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
