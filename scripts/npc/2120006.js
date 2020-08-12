var items = [1302020, 1302030, 1302064, 1312032, 1322054, 1332025, 1332055, 1332056, 1372034,
1382009, 1382012, 1382039, 1402039, 1412011, 1412027, 1422014, 1422029, 1432012, 1432040,
1442024, 1442051, 1452016, 1452022, 1452045, 1462014, 1462019, 1462040, 1472030, 1472032,
1472055];
var status = -1;
var sel;

function start() {
    var text = "I'm selling Maple weapons. Each item costs #b3 Donator Points#k. Please select CAREFULLY, when you've selected your item the trade will happen. If you have changed your mind, then please select End Chat.\r\n\r\n";
	for (var i = 1; i < items.length; i++) {
		text += "#L" + i + "##i" + items[i - 1] + "##l   ";
		if (i % 5 == 0) text += "\r\n";
	}
	cm.sendSimple(text);
}

function action(mode, type, s)
{
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		cm.sendYesNo("Are you sure you want to buy #i" + items[s - 1] + "#?");
		sel = s;
	} else {
		if (cm.getDonatorPoints() > 2) {
			cm.sendOk("Trade completed. Thanks again for donating!");
			cm.gainDonatorPoints(-3);
			cm.gainItem(items[sel - 1], 1);
		} else {
			cm.sendOk("You don't have enough donor points.");
		}
		cm.dispose();
	}
}

