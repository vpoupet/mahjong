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
type Props = {
    type: z.infer<typeof setSchema>["type"];
    control: Control<z.infer<typeof formSchema>>;
    setValue: UseFormSetValue<z.infer<typeof formSchema>>;
    remove: () => void;
    playerIndex: number;
    setIndex: number;
};

export default function SetForm(props: Props) {
    const { type, control, setValue, remove, playerIndex, setIndex } = props;
    const isHonorOrTerminal = useWatch({
        control,
        name: `players.${playerIndex}.sets.${setIndex}.isHonorOrTerminal`,
    });

    useEffect(() => {
        if (isHonorOrTerminal === false) {
            setValue(
                `players.${playerIndex}.sets.${setIndex}.isDragonOrSelfWind`,
                false
            );
        }
    }, [isHonorOrTerminal, playerIndex, setIndex, setValue]);

    switch (type) {
        case "pong":
            return (
                <div className="p-2 rounded-lg shadow-sm bg-white">
                    <div className="flex gap-4 items-center">
                        <span className="font-bold">Pong</span>
                        <Button
                            variant="outline"
                            onClick={remove}
                            className="w-fit h-fit p-1"
                        >
                            <Trash2 />
                        </Button>
                    </div>

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
                </div>
            );
            break;
        case "chow":
            return (
                <div className="p-2 rounded-lg shadow-sm bg-white">
                    <div className="flex gap-4">
                        <span className="font-bold">Chow</span>
                        <Button
                            variant="outline"
                            onClick={remove}
                            className="w-fit h-fit p-1"
                        >
                            <Trash2 />
                        </Button>
                    </div>
                </div>
            );
            break;
        case "pair":
            return (
                <div className="p-2 rounded-lg shadow-sm bg-white">
                    <div className="flex gap-4">
                        <span className="font-bold">Pair</span>
                        <Button
                            variant="outline"
                            onClick={remove}
                            className="w-fit h-fit p-1"
                        >
                            <Trash2 />
                        </Button>
                    </div>

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
                </div>
            );
            break;
    }
}
