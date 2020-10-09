import { playerCharacterType } from "./ActorTypes.js";
import { defaultAbilities } from "./shared/Abilities.js";
import { defaultPersona } from "./shared/Persona.js";
export const emptyPlayerCharacter = {
	type: playerCharacterType,
    origin: "",
    background: "",
    class: "",
	profession: "",
	drive: "",
    abilities: defaultAbilities,
    fortune: { max: 20, value: 20, min: 0 },
    level: 0,
	income: 0,
	experience: 0,
    condition: "",
    speed: 10,
    defense: 10,
    toughness: 0,
    poop: 99,
    armorRating: 0,
    armorPenalty: 0,
    persona: defaultPersona,
    relationships: new Map(),
    notes: "",
};