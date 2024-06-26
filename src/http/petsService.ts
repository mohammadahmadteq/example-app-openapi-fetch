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
