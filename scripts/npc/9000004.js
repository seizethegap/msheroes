var status = 0;
var party;
var preamble;
var mobcount;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
    }else{
        if (mode == 1)
            status++;
        else
            status--;
        var eim = cm.getPlayer().getEventInstance(); 
        var nthtext = "last";
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            mobcount = eim.getProperty("leader" + nthtext + "mobcount");
            if (preamble == null) {
                cm.sendOk("Hi. Welcome to the " + nthtext + " stage. This is where you fight the #bboss#k. Shall we get started?");
                status = 9;
            }else{
                if(!isLeader()){
                    if(mobcount == null){
                        cm.sendOk("Please tell your #bParty-Leader#k to come talk to me");
                        cm.dispose();
                    }else{
                        cm.warp(109020001,0);
                        cm.dispose();
                    }
                }
                if(mobcount == null){
                    cm.sendYesNo("You're finished?!");
                }
            }
        }else if (status == 1){
            //if (cm.mobCount(600010000)==0) {
            if (cm.mapMobCount() == 0) {
                cm.sendOk("Good job! You've killed 'em!");
            }else{
                cm.sendOk("What are you talking about? Kill those creatures!!");
                cm.dispose();
            }
        }else if (status == 2){
            cm.sendOk("You may continue to the next stage!");
        }else if (status == 3) {
            cm.clear();
            eim.setProperty("leader" + nthtext + "mobcount","done");
            var map = eim.getMapInstance(109020001);
            var members = eim.getPlayers();
            cm.warpMembers(map, members);
            cm.givePartyExp(2500, eim.getPlayers());
            cm.dispose();
        }else if (status == 10){
            eim.setProperty("leader" + nthtext + "preamble","done");
            cm.summonMobAtPosition(8220000,25000000,1500000,1,-762,-1307);
            cm.summonMobAtPosition(8220001,15000000,750000,1,-788,-851);
            cm.summonMobAtPosition(9410015,15000000,750000,1,128,-851);	
            cm.dispose();
        }           
    }
}
     
     
function isLeader(){
    if(cm.getParty() == null){
        return false;
    }else{
        return cm.isLeader();
    }
}