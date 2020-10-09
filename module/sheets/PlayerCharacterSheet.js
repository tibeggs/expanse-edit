import { weaponType, talentType, shieldType, armorType, physicalItemType, focusType, } from "../data/Item/ItemTypes.js";
import { emptyArmor } from "../data/Item/ArmorData.js";
import { AgeRoll } from "../rolls/AgeRoll.js";
import { playerCharacterType } from "../data/Actor/ActorTypes.js";
const actionTypes = [weaponType];
const talentTypes = [talentType];
const gearTypes = [shieldType, armorType, physicalItemType];
const focusTypes = [focusType];

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class PlayerCharacterSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["the-expanse-tim", "sheet", "player-character", playerCharacterType],
            template: "systems/the-expanse/templates/sheets/playerCharacterSheet.hbs",
            width: 600,
            height: 600,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "main",
                },
            ],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
        });
    }
    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable)
            return;
        // Update Inventory Item
        html.find(".item-edit").click((ev) => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemId"));
            item.sheet.render(true);
        });
        // Delete Inventory Item
        html.find(".item-delete").click((ev) => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(li.data("itemId"));
            li.slideUp(200, () => this.render(false));
        });
        html.find(".relationship-add").click(this._onClickRelationshipControl.bind(this));
        html.find(".relationship-delete").click(this._onClickRelationshipControl.bind(this));
		html.find(".rollDam").click((ev) => {
			let act = this.actor;
			let target = $(ev.currentTarget).data();
			let item = act.items.get(target.itemId);
			let ability = item.data.data.attackRoll;
			let damage = item.data.data.damage;
			console.log("actor:", act);
			console.log("target:", target);
			console.log("item:", item);
			console.log("ability:", ability);
			console.log("damage:", damage);
			let roll = new Roll(damage + "+" + act.data.data.abilities[ability], act.getRollData()).roll();
			roll.toMessage({
				flavor: `${item.data.name}'s weapon damage.`,
				speaker: ChatMessage.getSpeaker({actor: act}),
			});
		});
        html.find(".rollable").click((ev) => {
            let target = $(ev.currentTarget).data();
            let ability = target.ability;
            let focus = target.focus;
            if (target.itemId) {
                let item = this.actor.items.get(target.itemId);
                ability = item.data.data.defaultAbility;
                switch (item.data.type) {
                    case focusType:
                        focus = item.name;
                        break;
                    case weaponType:
                        focus = item.data.data.focus;
                        break;
                }
            }
            let roll = new AgeRoll(this.actor, ability, focus);
            roll.render().then((content) => {
                ChatMessage.create({
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                    content: content,
                });
            });
		});
		
}

    getData() {
        const sheetData = super.getData();
        const armor = (sheetData.items || [])
            .filter((i) => i.data.type == armorType)
            .filter((i) => i.data.equipped)
            .map((i) => i.data)
            .reduce((c, v) => (c.armorRating > v.armorRating ? c : v), emptyArmor);
        sheetData.data.armorRating = armor.armorRating;
        sheetData.data.armorPenalty = armor.armorPenalty;
        this._sortItems(sheetData);
        while (sheetData.data.persona.goals.length < 3) {
            sheetData.data.persona.goals.push("");
        }
        return sheetData;
    }
    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 150;
        sheetBody.css("height", bodyHeight);
        return position;
    }
    async _onClickRelationshipControl(event) {
        event.preventDefault();
        const a = event.currentTarget;
        const action = a.dataset.action;
        const relationships = this.object.data.data.relationships;
        if (action == "add") {
            const nk = Object.keys(relationships).reduce((p, c) => Math.max(p, parseInt(c)), 0) + 1;
            let newKey = document.createElement("input");
            newKey.type = "text";
            newKey.name = `data.relationships.${nk}.name`;
            newKey.value = "New Relationship";
            this.form.appendChild(newKey);
            await this._onSubmit(event);
        }
        if (action == "remove") {
            $(`input[name^="data.relationships.${a.dataset.index}"]`).remove();
            await this._onSubmit(event);
        }
    }
    _sortItems(sheetData) {
        const actions = sheetData.items.filter((i) => actionTypes.includes(i.data.type));
        const talents = sheetData.items.filter((i) => talentTypes.includes(i.data.type));
        const gear = sheetData.items.filter((i) => gearTypes.includes(i.data.type));
        const focuses = sheetData.items.filter((i) => focusTypes.includes(i.data.type));
        sheetData.itemGroups = {
            actions,
            talents,
            gear,
            focuses,
        };
    }
    /** @override */
    _updateObject(event, formData) {
        const relationships = expandObject(formData).data.relationships || [];
        for (let k of Object.keys(this.object.data.data.relationships)) {
            if (!relationships.hasOwnProperty(k))
                relationships[`-=${k}`] = null;
        }
        // Re-combine formData
        formData = Object.entries(formData).reduce((obj, e) => {
            obj[e[0]] = e[1];
            return obj;
        }, {
            _id: this.object._id,
            data: { relationships },
        });
        // Update the Actor
        return this.object.update(formData);
    }
}
