main();
main();
main();
main();
main();
main();
main();
main();
main();
async function main(){
    let value = 0;
    let r = new Roll("3d6").roll();
    console.log("roll:", r);
	let ability = r.result;
    console.log(ability);

    if (ability == 3) {
        value = -2;
    }
    else if (ability == 4 || ability == 5 ) {
        value = -1;
    }
        else if (ability == 9 || ability == 10 || ability == 11 ) {
        value = 1;
    }
            else if (ability == 12 || ability == 13 || ability == 14 ) {
        value = 2;
    }
            else if (ability == 15 || ability == 16 || ability == 17 ) {
        value = 3;
    }
            else if (ability == 18) {
        value = 4;
    }
    console.log("value:", value);
	r.toMessage({
		flavor: `<h1><b>Ability Score: ${value}</b></h1>`,
	});
}