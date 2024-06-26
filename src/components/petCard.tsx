import {IPet} from "../types/petTypes.tsx";
import {SPECIES_EMOJI_MAP} from "../utils/speciesMap.ts";

interface props extends Omit<IPet, "customerId"> {
    key: string;
}
const PetCard: React.FC<props> = (props) => {
    return (
        <div key={props.petId} className="petCardMain">
            <div className="PetCardSpecies">{SPECIES_EMOJI_MAP[props.species]}</div>
            <div>
                <span className="PetCardName">{props.name}</span>
                <div className="PetCardInfo">
                    <span className="PetCardAge">{props.age} Years</span>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
