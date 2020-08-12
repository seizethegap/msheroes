function start() {
    cm.sendSimple("The boats are currently under maintenance. In the meantime, I have been emplyed to warp people who wants to move to another continent. Would you like to go to Orbis? \r\n#L0##bYes#k#l \r\n#L1##bNo#k#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
	if(selection == 0) {
	    cm.warp(200000100,0);
            cm.dispose();
	} else if(selection == 1) {
            cm.sendOk("Okay, let me know if you need any assistance in the future!");
	}
    }
}