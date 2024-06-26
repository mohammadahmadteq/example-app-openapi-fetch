import {IPet} from "../types/petTypes.tsx";
import PetCard from "../components/petCard.tsx";
import {useEffect, useState} from "react";
import {getPets} from "../http/petsService.ts";

const PetContainer = () => {
    const [petsList, setPetsList] = useState<IPet[]>([]);

    const loadPets = async () => {
        const list = await getPets();

        setPetsList(list);
    };
    useEffect(() => {
        loadPets();
    }, []);
    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <h1> List of Pets</h1>
            {petsList.map((pet) => (
                <PetCard name={pet.name} age={pet.age} species={pet.species} petId={pet.petId} key={pet.petId} />
            ))}
        </div>
    );
};

export default PetContainer;
