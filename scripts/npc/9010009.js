var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action() {
	cm.sendOk("Sorry, my services are temporarily closed.");
	cm.dispose();
}