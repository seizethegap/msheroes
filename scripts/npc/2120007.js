/*
 * Gachapon
 */

var common = Array(1432046, 1472065, 1472066, 1472067, 1332067, 1332068, 1332070, 1332071, 1452054, 1452055, 1452056, 1462047, 1462048, 1462049, 1022058, 1012108, 1012109, 1012110, 1012111, 1032046, 1102418, 1002553, 1102082, 1108080, 1102079, 1102083, 1102081, 1002424, 1002425, 1002857, 1102193);
var normal = Array(1332077, 1472072, 1462052, 1462048, 1102040, 1102041, 1102042);
var rare = Array(2340000, 2049100, 2049000, 2049001, 2049002, 2049003, 2049004, 2049005, 2070005, 2070006, 2040807, 2040806, 2044503, 2044703, 2043303, 2044403, 2044303, 2043803, 2043703, 2040506, 2070005, 2070006, 1302033, 1302058, 1302065, 1442030, 2040807, 2040807, 1082149);


function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}

	if (min == max) {
		return(min);
	}

	return(min + parseInt(Math.random() * (max - min + 1)));
}

var icommon = common[getRandom(0, common.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var irare = rare[getRandom(0, rare.length - 1)];

var chance = getRandom(0, 5);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("Alright, I'll keep searching for it then...");
			cm.dispose();
			return;
		} else if (mode == 1) {
			status++;
		}

		if (status == 0) {
			cm.sendNext("Hello, I'm #bRoger#k. I can't find my Apple anywhere, I'm kind of scared that I have eaten it by accident! Have you seen it anywhere? I will give you a reward if you find it!");
		} else if (status == 1) {
			if (!cm.haveItem(2010007)) {
				cm.sendOk("Sorry, it doesn't look like you've found it. Let me know if you find it!");
				cm.dispose();
			} else {
				cm.sendYesNo("Oh, you've found it! I'm so proud of you! Thanks so much, here's the reward for your help!");
			}
		} else if (status == 2) {
			cm.gainItem(2010007, -1);

			if (chance > 0 && chance <= 2) {
				cm.gainItem(icommon, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
			} else {
				cm.gainItem(irare, 1);
			}

			cm.dispose();
		}
	}
}