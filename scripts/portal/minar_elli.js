function enter(pi) {
	if (pi.getPlayer().getMapId() == 240010100) {
		if (pi.haveItem(4031225)) {
			pi.gainItem(4031225, -1);
			pi.warp(101010000, "minar00");
			return true;
		} else {
			pi.dropMessage(5, "You don't have a Magic Seed.");
			return false;
		}
	} else if (pi.getPlayer().getMapId() == 101010000) {
		if (pi.haveItem(4031225)) {
			pi.gainItem(4031225, -1);
			pi.warp(240010100, "elli00");
			return true;
		} else {
			pi.dropMessage(5, "You don't have a Magic Seed.");
			return false;
		}
	}
}