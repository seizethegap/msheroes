/*
	Regular Cab, Henesys
	Resource from ThePack
	Modified & Fixed by Saint
	NostalgicMS
*/

var status = 0;
var maps = Array(104000000, 102000000, 103000000, 101000000);
var cost = Array(800, 1000, 1200, 800);
var costBeginner = Array(80, 100, 120, 80);
var selectedMap = -1;
var job;
 
importPackage(Packages.client);
 
function start() {
        status = -1;
        action(1, 0, 0);
}
 
function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
        if (status == 1 && mode == 0) {
                cm.dispose();
                return;
        } else if (status >= 2 && mode == 0) {
                cm.sendNext("There's a lot to see in this town, too. Come back and find us when you need to go to a different town.");
                cm.dispose();
                return;
        }
        if (mode == 1)
                status++;
        else
                status--;
        if (status == 0) {
                cm.sendNext("How's it going? I drive the Henesys Taxi. If you want to go from town to town safely and fast, then ride our cab. We'll gladly take you to your destination for an affordable price.");
        } else if (status == 1) {
                if (cm.getJob().equals(MapleJob.BEGINNER)) {
                        var selStr = "We have a special 90% discount for beginners. Choose your destination, for fees will change from place to place.#b";
                                for (var i = 0; i < maps.length; i++) {
                                        selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + costBeginner[i] + " mesos)#l";
                                }
                } else {
                        var selStr = "Choose your destination, for fees will change from place to place.#b";
                        for (var i = 0; i < maps.length; i++) {
                                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + cost[i] + " mesos)#l";
                        }
                }
                cm.sendSimple(selStr);
        } else if (status == 2) {
                cm.sendYesNo("You don't have anything else to do here, huh? Do you really want to go to #b#m" + maps[selection] + "##k? It'll cost you #b"+ cost[selection] + " mesos#k.");
                selectedMap = selection;       
        } else if (status == 3) {
                if (cm.getJob().equals(MapleJob.BEGINNER)) {
                        if (cm.getMeso() < costBeginner[selectedMap]) {
                                cm.sendNext("You don't have enough mesos.");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-costBeginner[selectedMap]);
				cm.warp(maps[selectedMap], 0);
                        	cm.dispose();
                        }
                } else {
                        if (cm.getMeso() < cost[selectedMap]) {
                                cm.sendNext("You don't have enough mesos.");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-cost[selectedMap]);
                        }
                        cm.warp(maps[selectedMap], 0);
                        cm.dispose();
                        }
                }
        }
}