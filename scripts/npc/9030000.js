importPackage(Packages.client);

var status = -1;
var sinv, inv;

function start() {
	cm.sendSimple("Hello, I'm #bFredrick#k. I'm in charge of estimating the expiry date of cash items around here. Which inventory would you like to check? #b\r\n#L1#Equip#l\r\n#L2#Use#l\r\n#L5#Cash#l");
}

function action(m, t, s) {
	status++;
	if (m != 1) {
		cm.dispose();
	} else {
		if (status == 0) {
			sinv = s;
			if (s == 1) {
				inv = cm.getPlayer().getInventory(MapleInventoryType.EQUIP);
			} else if (s == 2) {
				inv = cm.getPlayer().getInventory(MapleInventoryType.USE);
			} else {
				inv = cm.getPlayer().getInventory(MapleInventoryType.CASH);
			}
			
			var allitem = inv.list().iterator();
			var text = "Alright, please select the item you would like to know the expiry rate on.\r\n";
			while (allitem.hasNext()) {
				var item = allitem.next();
				if (item.getExpiration() > 0)
					text += "#L" + item.getPosition() + "##i" + item.getItemId() + "##l    ";
			}
			if (text.length < 78) {
				cm.sendOk("It doesn't look like you have any cash items in this inventory.");
				cm.dispose();
			} else {
				cm.sendSimple(text);
			}
		} else {
			var mit = MapleInventoryType.getByType(sinv);
			var text = "Hmm, let me see. It looks like this item expires on ";
			var it = cm.getPlayer().getInventory(mit).getItem(s);
			var date = new Date(it.getExpiration());
			text += ("#e" + (date.getMonth() + 1) + "/" + date.getDate() + "/" +date.getFullYear() + "#n at #e" +date.getHours() + ":" +date.getMinutes() + ":" +date.getSeconds() + "#n.");
			cm.sendOk(text);
			cm.dispose();
		}
	}
}