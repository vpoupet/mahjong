import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FileSpreadsheet } from "lucide-react";

type Props = {
    score: {
        base: number;
        mult: number;
        baseDetails: [number, string][];
        multDetails: [number, string][];
    };
};

export default function PlayerScoreDetails(props: Props) {
    const { base, mult, baseDetails, multDetails } = props.score;

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="details">
                <AccordionTrigger><div className="flex items-center gap-2"><FileSpreadsheet /> Details</div></AccordionTrigger>
                <AccordionContent className="font-mono text-sm bg-white my-2 p-2 shadow-sm flex flex-col gap-4">
                    <div>
                        <span className="font-bold">Base score</span>
                        {baseDetails.map(([score, description], i) => (
                            <div key={i} className="flex gap-8">
                                <div className="w-16 text-right">{score}</div>
                                <span className="">{description}</span>
                            </div>
                        ))}
                        {baseDetails.length > 0 && <hr />}
                        <div className="w-16 text-right">{base}</div>
                    </div>

                    <div>
                        <span className="font-bold">Multiplier</span>
                        {multDetails.map(([score, description], i) => (
                            <div key={i} className="flex gap-8">
                                <div className="w-16 text-right">× {score}</div>
                                <span className="">{description}</span>
                            </div>
                        ))}
                        {multDetails.length > 0 && <hr />}
                        <div className="w-16 text-right">× {mult}</div>
                    </div>

                    <div>
                        <span className="font-bold">Total</span>
                        <div className="flex">
                            {base} x {mult} = {base * mult}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
