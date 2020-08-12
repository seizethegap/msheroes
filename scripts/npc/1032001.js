/*
	Grendel the Really Old, Ellinia
	Resource from ThePack
	NostalgicMS
*/

importPackage(Packages.client);

var status = 0;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 2) {
            cm.sendOk("Make up your mind and visit me again.");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getJob().equals(Packages.client.MapleJob.BEGINNER)) {
                if (cm.getLevel() > 7 && cm.getChar().getInt() > 19)
                    cm.sendNext("So you decided to become a #rMagician#k?");
                else {
                    cm.sendOk("Train a bit more and I can show you the way of the #rMagician#k.")
                    cm.dispose();
                }
            } else {
                if (cm.getLevel() >= 30 && cm.getJob().equals(Packages.client.MapleJob.MAGICIAN)) {
                    if (cm.getQuestStatus(100006).getId() >= Packages.client.MapleQuestStatus.Status.STARTED.getId()) {
                        cm.completeQuest(100008);
                        if (cm.getQuestStatus(100008) == Packages.client.MapleQuestStatus.Status.COMPLETED) {
                            status = 20;
                            cm.sendNext("I see you have done well. I will allow you to take the next step on your long road.");
                        } else {
                            cm.sendOk("Go and see the #rJob Instructor#k.")
                            cm.dispose();
                        }
                    } else {
                        status = 10;
                        cm.sendNext("The progress you have made is astonishing.");
                    }
                } else if (cm.getQuestStatus(100100).equals(MapleQuestStatus.Status.STARTED)) {
                    cm.completeQuest(100101);
                    if (cm.getQuestStatus(100101).equals(MapleQuestStatus.Status.COMPLETED)) {
                        cm.sendOk("Alright, now take this to #bRobeira#k.");
                    } else {
                        cm.sendOk("Hey, " + cm.getChar().getName() + "! I need a #bBlack Charm#k. Go and find the Door of Dimension.");
                        cm.startQuest(100101);
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("You have chosen wisely.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            cm.sendNextPrev("It is an important and final choice. You will not be able to turn back.");
        } else if (status == 2) {
            cm.sendYesNo("Do you want to become a #rMagician#k?");
        } else if (status == 3) {
            if (cm.getJob().equals(Packages.client.MapleJob.BEGINNER))
                cm.changeJob(Packages.client.MapleJob.MAGICIAN);
            cm.gainItem(1372005, 1);
            cm.sendOk("So be it! Now go, and go with pride.");
            cm.dispose();
        } else if (status == 11) {
            cm.sendNextPrev("You may be ready to take the next step as a #rFire/Poison Wizard#k, #rIce/Lightning Wizard#k or #rCleric#k.");
        } else if (status == 12) {
            cm.sendAcceptDecline("But first I must test your skills. Are you ready?");
        } else if (status == 13) {
            cm.startQuest(100006);
            cm.sendOk("Go see the #bJob Instructor#k near Ellinia. He will show you the way.");
        } else if (status == 21) {
            cm.sendSimple("What do you want to become?#b\r\n#L0#Fire/Poison Wizard#l\r\n#L1#Ice/Lightning Wizard#l\r\n#L2#Cleric#l#k");
        } else if (status == 22) {
            var jobName;
            if (selection == 0) {
                jobName = "Fire/Poison Wizard";
                job = Packages.client.MapleJob.FP_WIZARD;
            } else if (selection == 1) {
                jobName = "Ice/Lightning Wizard";
                job = Packages.client.MapleJob.IL_WIZARD;
            } else {
                jobName = "Cleric";
                job = Packages.client.MapleJob.CLERIC;
            }
            cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
        } else if (status == 23) {
            cm.changeJob(job);
            cm.sendOk("So be it! Now go, and go with pride.");
        }
    }
}	