/* Warrior Job Instructor
 Warrior 2nd Job Advancement
 Hidden Street : Warrior's Rocky Mountain (108000300)
 */

var status = 0;

function start() {
    if (cm.haveItem(4031013, 30)) {
        cm.gainItem(4031013, -30);
        cm.completeQuest(100004);
        if (cm.getQuestStatus(100004) == Packages.client.MapleQuestStatus.Status.COMPLETED) {
            cm.startQuest(100005);
            cm.sendOk("You're a true hero! Take this and Dances with Balrog will acknowledge you.");
        }
        cm.warp(102020300, 0);
    } else {
        cm.sendOk("You will have to collect me #b30 #t4031013##k. Good luck.")
    }
    cm.dispose();
}

function action(mode, type, selection) {
    
}	