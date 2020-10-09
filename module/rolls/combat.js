/**
 * Override the default Initiative formula to customize special behaviors of the system.
 * See Combat._getInitiativeFormula for more detail.
 */
export const _getInitiativeFormula = function(combatant) {
	const actor = combatant.actor;
  	if ( !actor ) return "3d6";
    const ability = "Dexterity";
    const focus = "Initiative";
    console.log("Actor: ", actor, ", Ability: ", ability, ", Focus: ", focus);
    let initiative = new game.expanse.AgeRoll(actor, ability, focus);
    console.log(initiative);
    return initiative._formula;
};

/* -------------------------------------------- */


/**
 * TODO: A temporary shim until 0.7.x becomes stable
 * @override
 */
TokenConfig.getTrackedAttributes = function(data, _path=[]) {

    // Track the path and record found attributes
    const attributes = {
      "bar": [],
      "value": []
    };

    // Recursively explore the object
    for ( let [k, v] of Object.entries(data) ) {
      let p  = _path.concat([k]);

      // Check objects for both a "value" and a "max"
      if ( v instanceof Object ) {
        const isBar = ("value" in v) && ("max" in v);
        if ( isBar ) attributes.bar.push(p);
        else {
          const inner = this.getTrackedAttributes(data[k], p);
          attributes.bar.push(...inner.bar);
          attributes.value.push(...inner.value);
        }
      }

      // Otherwise identify values which are numeric or null
      else if ( Number.isNumeric(v) || (v === null) ) {
        attributes.value.push(p);
      }
    }
    return attributes;
};