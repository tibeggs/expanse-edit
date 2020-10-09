import { emptyPhysicalItem } from "./PhysicalItemData.js";
import { armorType } from "./ItemTypes.js";
export const emptyArmor = Object.assign(Object.assign({}, emptyPhysicalItem), { type: armorType, description: "", armorPenalty: 0, armorRating: 0, equipped: false });
