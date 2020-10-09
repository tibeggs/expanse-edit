import { emptyPhysicalItem } from "./PhysicalItemData.js";
import { shieldType } from "./ItemTypes.js";
export const emptyShield = Object.assign(Object.assign({}, emptyPhysicalItem), { type: shieldType, defenseBonus: 0, description: "", weight: 0, quantity: 1, equipped: false });
