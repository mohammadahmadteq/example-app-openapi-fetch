/*
import {IPet} from "../types/petTypes.tsx";

export const getPets = async () => {
    try {
        const petsList: unknown = (await fetch("http://localhost:3020/petsapp/pet")).json();
        if (!petsList) throw new Error("No data found");

        return petsList as IPet[];
    } catch (error) {
        console.log("Cannot Get");
        return [];
    }
};
*/

import createClient from "openapi-fetch";
import type { paths } from "../../src/types/swaggerTypes.ts";
import { IPet } from "../types/petTypes.tsx";

const client = createClient<paths>({ baseUrl: "http://localhost:3020" });

export const getPets = async (): Promise<IPet[]> => {
    try {
        const { data, error } = await client.GET("/petsapp/pet");

    if (error) {
        console.error("Error fetching pets:", error);
        throw new Error("Cannot Get");
    }

    return data as IPet[];
} catch (error) {
    console.error("Cannot Get");
    return [];
}
};