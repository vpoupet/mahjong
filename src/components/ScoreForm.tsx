// components/PlayerForm.tsx
import { Button } from "@/components/ui/button";
import { formSchema } from "@/schema";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import type z from "zod";
import PlayerForm from "./PlayerForm";

type Props = {
    form: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function ScoreForm(props: Props) {
    const { form } = props;

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
                            playerData={form.watch(`players.${index}`)}
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
