importPackage(Packages.client);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (cm.getPlayer().isGM() && cm.getChar().getMapId() == 100040106)
		cm.warp(180000000);

	else if (cm.getQuestStatus(100101).equals(MapleQuestStatus.Status.STARTED) && !cm.haveItem(4031059)) {
		var em = cm.getEventManager("3rdjob");
		if (em == null) {
			cm.sendOk("Sorry, but 3rd job advancement is closed.");

		} else {
			em.newInstance(cm.getChar().getName()).registerPlayer(cm.getChar());
		}
	} else {
		cm.warp(100040106);
	} cm.dispose();
}