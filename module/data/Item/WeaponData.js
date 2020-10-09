import { emptyPhysicalItem } from "./PhysicalItemData.js";
import { weaponType } from "./ItemTypes.js";
import { ActionType } from "../shared/ActionType.js";
export const emptyWeapon = Object.assign(Object.assign({}, emptyPhysicalItem), { type: weaponType, defaultAbility: "", focus: "", attackRoll: "Perception", damage: "1d6", shortRange: "", longRange: "", reloadTime: ActionType.none });
