import { focusType } from "../data/Item/ItemTypes.js";
export class AgeRollMod extends Roll {
    constructor(target, ability, focus, shipMod) {
        const focusItem = target.items.find((i) => i.type == focusType && i.name == focus);
        const focusBonus = AgeRollMod.calculateFocus(focusItem);
        const abilityValue = target.data.data.abilities[ability];
        const modifier = abilityValue + focusBonus + shipMod;
		console.log(modifier);
        super(`3d6+${modifier}`);
        this.modifier = modifier;
        this.name = `${ability}${focus != undefined ? ` (${focus})` : ""}`;
    }
    static calculateFocus(focusItem) {
        if (focusItem != undefined) {
            return focusItem.data.data.improved ? 3 : 2;
        }
        else {
            return 0;
        }
    }
    async render(chatOptions = {}) {
        chatOptions = mergeObject({
            user: game.user._id,
            flavor: null,
            template: "systems/the-expanse/templates/chat/ageRoll.hbs",
        }, chatOptions || {});
        if (!this._rolled) {
            this.roll();
        }
        var rolls = this.dice[0].results.map((r) => r.result);
        var match = new Set(rolls).size !== 3;
        const chatData = {
            user: chatOptions.user,
            rolls: rolls.reduce((p, c, i) => (Object.assign(Object.assign({}, p), { [`d${i}`]: c })), new Map()),
            name: this.name,
            modifier: this.modifier == 0
                ? undefined
                : this.modifier > 0
                    ? `+ ${this.modifier}`
                    : `- ${Math.abs(this.modifier)}`,
            total: this.total,
            stuntPoints: match ? rolls[2] : 0,
        };
        console.log(chatData);
        return renderTemplate(chatOptions.template, chatData);
    }
    async toMessage(chatData) {
        console.log("here");
        chatData.content = await this.render({ user: chatData.user });
        return ChatMessage.create(chatData);
    }
}
