import type { JSX } from "react";
export type StarLevel = {
    id: number;
    title: string;
    description: JSX.Element;
    completed: boolean;
}

export default StarLevel;