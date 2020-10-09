main()

async function main(){
    console.log("Hello World")
    //Is a token selected? If not, error
    console.log("Tokens: ", canvas.tokens.controlled)
    if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
        ui.notifications.error("Please select a single token");
        return;
	}
    let actor = canvas.tokens.controlled[0].actor
    let ability = "Dexterity";
    let focus = "Initiative";
    console.log("Actor: ", actor, ", Ability: ", ability, ", Focus: ", focus);
    let initiative = new game.expanse.AgeRoll(actor, ability, focus);
    console.log(initiative);
    initiative.render().then((content) => {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ actor: actor }),
            content: content,
        });
    });
}
