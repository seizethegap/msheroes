nx = 5000;

function start () {
    cm.sendSimple("Would you like to trade #r1 Vote Point#k for #b" + nx + " NX Cash? \r\n#L0#Yes#l\r\n#L1#No#l");
}

function action(mode, type, selection){
    if(mode == 1)
        if (selection == 0)
            //if (cm.getNXPaypal() > 2000) { // Checks how much NX (change this method to change type of nx)
            if (cm.getVotingPoints() > 0) {
		cm.gainVotingPoints(-1);
		cm.modifyNx(2000); 
                cm.sendOk("Enjoy your NX Cash!");
            } else
               cm.sendOk("You don't have any Vote Points.");
        else if (selection == 1)
            cm.sendOk("Vote on our Website for NX Vote Points!");
    cm.dispose();
}