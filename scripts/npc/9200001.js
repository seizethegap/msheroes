var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action() {
	cm.sendOk("Come back to me at Easter, then I might have something for you!");
	cm.dispose();
}