/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */

export class PlayerCharacterActor extends Actor {
    /** @override */
    getRollData() {
        const data = super.getRollData();
        // Map all items data using their slugified names
        data.items = this.data.items.reduce((obj, i) => {
            let key = i.name.slugify({ strict: true });
            let itemData = duplicate(i.data);
            obj[key] = itemData;
            return obj;
        }, {});
        return data;
    }
}
