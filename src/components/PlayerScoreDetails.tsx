import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import type { Score } from "@/model/types";
import { FileSpreadsheet } from "lucide-react";

type Props = {
    score: Score;
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
                        {baseDetails.map((detail, i) => (
                            <div key={i} className="flex gap-8">
                                <div className="w-16 text-right">{detail.value}</div>
                                <span className="">{detail.description}</span>
                            </div>
                        ))}
                        {baseDetails.length > 0 && <hr />}
                        <div className="w-16 text-right">{base}</div>
                    </div>

                    <div>
                        <span className="font-bold">Multiplier</span>
                        {multDetails.map((detail, i) => (
                            <div key={i} className="flex gap-8">
                                <div className="w-16 text-right">× {detail.value}</div>
                                <span className="">{detail.description}</span>
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
