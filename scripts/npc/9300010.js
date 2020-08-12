var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action() {
	cm.sendOk("This NPC is removed from GMS. If you have the text it said, please contact #bThomas#k!");
	cm.dispose();
}