main()

async function main(){
	console.log("Hello World")
	//Is a token selected? If not, error
	console.log("Tokens: ", canvas.tokens.controlled)
	if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
	    ui.notifications.error("Please select a single token");}

	new Dialog({
		title: "Roll Query",
		content: `
			<p>Select the approperate Ability, Focus, and additional modifiers.</p>
			<form>
			<div class="form-group">
				<label>Ability</label>
	       		<select id="ability" placeholder="Ability">
					<option value="Accuracy">Accuracy</option>
					<option value="Communication">Communication</option>
					<option value="Constitution">Constitution</option>
					<option value="Dexterity">Dexterity</option>
					<option value="Fighting">Fighting</option>
					<option value="Intelligence">Intelligence</option>
					<option value="Perception">Perception</option>
					<option value="Strength">Strength</option>
					<option value="Willpower">Willpower</option>
	       		</select>
      		</div>
	      	<div class="form-group">
	       		<label>Focus</label>
				<select id="focus-dropdown">
				</select>
				<script>
					target = canvas.tokens.controlled[0].actor;
					focusList = target.items.filter(i => i.type == "Focus");
					select = document.getElementById("focus-dropdown"); 
					for(let i = 0; i < focusList.length; i++) {
					    let opt = focusList[i].data.name;
					    let el = document.createElement("option");
					    el.textContent = opt;
					    el.value = opt;
					    select.appendChild(el);}
				</script>
	      	</div>
	      	<div class="form-group">
	       		<label>Modifier</label>
	       		<input type="text" inputmode="numeric" pattern="\d*" id="mod" value="0">
	      	</div>
     		</form>
		`,
	    buttons: {
			one: {
	        	icon: '<i class="fas fa-check"></i>',
	        	label: "Confirm",
	        	callback: (html) =>{
					let ability = html.find('[id=ability]')[0].value;
					let focus = html.find('[id=focus-dropdown]')[0].value;
	          		let mod = 0; 
					mod = parseInt(html.find('[id=mod]')[0].value);
	          		console.log("target: ", target, ", Ability: ", ability, ", Focus: ", focus, ", Mod: ", mod);
	    			let roll = new game.expanse.AgeRoll(target, ability, focus, mod);
	    			console.log(roll);
	    			roll.render().then((content) => {
	        			ChatMessage.create({
	            			user: game.user._id,
	            			speaker: ChatMessage.getSpeaker({ actor: target }),
	            			content: content,
	        			});
	    			});
	        	}
      		},
	      	two: {
	        	icon: '<i class="fas fa-times"></i>',
	        	label: "Cancel",
	      	}
		},
	    default: "Cancel"
  	}).render(true);
}