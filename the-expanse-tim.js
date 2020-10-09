import { registerSettings } from "./module/settings.js";
import { preloadTemplates } from "./module/preloadTemplates.js";
import { PlayerCharacterSheet } from "./module/sheets/PlayerCharacterSheet.js";
import { ShipSheet } from "./module/sheets/ShipSheet.js";
import { FocusSheet } from "./module/sheets/FocusSheet.js";
import { WeaponSheet } from "./module/sheets/WeaponSheet.js";
import { focusType, weaponType, armorType, shieldType, physicalItemType, talentType } from "./module/data/Item/ItemTypes.js";
import { ArmorSheet } from "./module/sheets/ArmorSheet.js";
import { ShieldSheet } from "./module/sheets/ShieldSheet.js";
import { PhysicalItemSheet } from "./module/sheets/PhysicalItemSheet.js";
import { TalentSheet } from "./module/sheets/TalentSheet.js";
import { playerCharacterType } from "./module/data/Actor/ActorTypes.js";
import { shipType } from "./module/data/Actor/ActorTypes.js";
import { AgeRoll } from "./module/rolls/AgeRoll.js";
import { AgeRollMod } from "./module/rolls/AgeRollMod.js";
import { _getInitiativeFormula } from "./module/rolls/combat.js";

/* ------------------------------------ */
/* Initialize system					*/
/* ------------------------------------ */
Hooks.once("init", async function () {
    console.log("the-expanse | Initializing the-expanse");
    // Assign custom classes and constants here
    // Register custom system settings
    registerSettings();
    // Preload Handlebars templates
    await preloadTemplates();
    // Register custom sheets
    Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("the-expanse", PlayerCharacterSheet, { types: [playerCharacterType], makeDefault: true });
    Actors.registerSheet("the-expanse", ShipSheet, { types: [shipType], makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("the-expanse", FocusSheet, { types: [focusType], makeDefault: true });
    Items.registerSheet("the-expanse", WeaponSheet, { types: [weaponType], makeDefault: true });
    Items.registerSheet("the-expanse", ArmorSheet, { types: [armorType], makeDefault: true });
    Items.registerSheet("the-expanse", ShieldSheet, { types: [shieldType], makeDefault: true });
    Items.registerSheet("the-expanse", PhysicalItemSheet, { types: [physicalItemType], makeDefault: true });
    Items.registerSheet("the-expanse", TalentSheet, { types: [talentType], makeDefault: true });
	// Register custom rolls
	game.expanse = {
		AgeRoll,
		AgeRollMod,
		_getInitiativeFormula
	}
	  /**
   * Set an initiative formula for the system
   * @type {String}
   */

  CONFIG.Combat.initiative.formula = "3d6 + @abilities.Dexterity";
  Combat.prototype._getInitiativeFormula = _getInitiativeFormula;

  // Register system settings
  game.settings.register('expanse', 'macroShorthand', {
    name: 'Shortened Macro Syntax',
    hint:
      'Enable a shortened macro syntax which allows referencing attributes directly, for example @str instead of @attributes.str.value. Disable this setting if you need the ability to reference the full attribute model, for example @attributes.str.label.',
    scope: 'world',
    type: Boolean,
    default: true,
    config: true,
  });

});
/* ------------------------------------ */
/* Setup system							*/
/* ------------------------------------ */
Hooks.once("setup", function () {
    // Do anything after initialization but before
    // ready
});
/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once("ready", function () {
    // Do anything once the system is ready
});
// Add any additional hooks if necessary
