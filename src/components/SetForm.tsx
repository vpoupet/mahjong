import type { formSchema, setSchema } from "@/schema";
import { Trash2 } from "lucide-react";
import { useWatch, type Control, type UseFormSetValue } from "react-hook-form";
import type z from "zod";
import { Button } from "./ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { useEffect } from "react";
import { getSetScore, toTitleCase } from "./utils";

type Props = {
    type: z.infer<typeof setSchema>["type"];
    control: Control<z.infer<typeof formSchema>>;
    setValue: UseFormSetValue<z.infer<typeof formSchema>>;
    playerIndex: number;
    setIndex: number;
    setData: z.infer<typeof setSchema>;
    remove: () => void;
};

export default function SetForm(props: Props) {
    const { type, control, setValue, playerIndex, setIndex, setData, remove } =
        props;
    const isHonorOrTerminal = useWatch({
        control,
        name: `players.${playerIndex}.sets.${setIndex}.isHonorOrTerminal`,
    });
    const { base, mult } = getSetScore(setData);

    useEffect(() => {
        if (isHonorOrTerminal === false) {
            setValue(
                `players.${playerIndex}.sets.${setIndex}.isDragonOrSelfWind`,
                false
            );
        }
    }, [isHonorOrTerminal, playerIndex, setIndex, setValue]);

    return (
        <div className="p-2 rounded-lg shadow-sm bg-white">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <span className="font-bold">{toTitleCase(type)}</span>
                    <Button
                        variant="outline"
                        onClick={remove}
                        className="w-fit h-fit p-1"
                    >
                        <Trash2 />
                    </Button>
                </div>
                {base} pts{mult > 1 ? ` (x${mult})` : ""}
            </div>
            <SetOptions
                type={type}
                control={control}
                playerIndex={playerIndex}
                setIndex={setIndex}
                isHonorOrTerminal={isHonorOrTerminal}
            />
        </div>
    );
}

type SetOptionsProps = {
    type: z.infer<typeof setSchema>["type"];
    control: Control<z.infer<typeof formSchema>>;
    playerIndex: number;
    setIndex: number;
    isHonorOrTerminal: boolean;
};

function SetOptions(props: SetOptionsProps) {
    const { type, control, playerIndex, setIndex, isHonorOrTerminal } = props;

    switch (type) {
        case "pong":
            return (
                <div className="flex gap-4">
                    <FormField
                        control={control}
                        name={`players.${playerIndex}.sets.${setIndex}.isHonorOrTerminal`}
                        render={({ field }) => (
                            <FormItem className="flex items-center">
                                <FormControl>
                                    <Checkbox
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Honor or Terminal</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`players.${playerIndex}.sets.${setIndex}.isKong`}
                        render={({ field }) => (
                            <FormItem className="flex items-center">
                                <FormControl>
                                    <Checkbox
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Kong</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`players.${playerIndex}.sets.${setIndex}.isFromWall`}
                        render={({ field }) => (
                            <FormItem className="flex items-center">
                                <FormControl>
                                    <Checkbox
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>From wall</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`players.${playerIndex}.sets.${setIndex}.isDragonOrSelfWind`}
                        render={({ field }) => (
                            <FormItem className="flex items-center">
                                <FormControl>
                                    <Checkbox
                                        disabled={!isHonorOrTerminal}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Dragon or self wind</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );
        case "chow":
            return null;
        case "pair":
            return (
                <div className="flex gap-4">
                    <FormField
                        control={control}
                        name={`players.${playerIndex}.sets.${setIndex}.isDragonOrSelfWind`}
                        render={({ field }) => (
                            <FormItem className="flex items-center">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Dragon or self wind</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );
    }
}
