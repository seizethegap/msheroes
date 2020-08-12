var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action() {
	cm.sendOk("This NPC has stopped working in GMS. If you have the text it said before it stopped working, please contact #bThomas#k!");
	cm.dispose();
}