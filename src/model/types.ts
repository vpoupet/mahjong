export type ScoreDetail = {
    value: number;
    description: string;
};

export type Score = {
    base: number;
    mult: number;
    baseDetails: ScoreDetail[];
    multDetails: ScoreDetail[];
};

export type Result = {
    success: boolean;
    message?: string;
};

export type WindName = "east" | "south" | "west" | "north";