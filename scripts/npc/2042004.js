/*Map: Monster Carnival Room 4 Lobby: mapt* Credits go to Thane Krios (alias: lfatelhighdef)*/
var status;
var min = 2;
var max = 6;
var coin = 4001129;
var startspiece = 4000004; // this is the item given to players to let the NPC know whether or not the PQ has began.
// IMPORTANT
// Change it to some undroppable item so they cannot abuse respawning. And make sure to change Spiegelmann's removal of the item so that players do not keep the PQ starting item when they leave
// IMPORTANT
var map = 980000400;
var mapt = 980000300;
var starts = 0;
var finish;
var leave;
var players;
var mobs = [[9300128, 9300129, 9300130, 9300131, 9300132, 9300133, 9300134, 9300135, 9300136],[2,2,3,4,4,5,6,10,20,30], 
["Brown Teddy", "Bloctopus", "Ratz", "Chronos", "Toy Trojan", "Tick-Tock", "Robo", "King Block", "Master Chronos", "Rombot"]]; // mobs, cost // name
// brown teddy, bloctopus, ratz, chronos, toy trojan, tick-tock, robo, king block, master chronos, rombot

function start() {
    status = -1;
    action(1,0,0);
}    

function action(mode, type, selection) {
    if (mode == -1) {
        return;
        cm.dispose(); 
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }
    if (status == 0) {
            var party = cm.partyMembersInMap(); var count = cm.getPlayerCount(map); var countt = cm.getPlayerCount(mapt); var mob = cm.getMonsterCount(map); 
            var mobt = cm.getMonsterCount(mapt); var yours = cm.getMapId(); var your = cm.getMonsterCount(yours);
            (count == 0 || countt == 0 ? players = 0 : players = 1); // note to self, change players back
            (!cm.haveItem(startspiece,1) ? starts = 0 : starts = 1); // if they do not have starting item then the PQ has not begun
            (cm.haveItem(startspiece,1) && cm.getMapId()==map && countt < 1 ? finish = 0 : cm.haveItem(startspiece,1) && cm.getMapId()==map && mob == 0 ? finish = 1 : 
            cm.haveItem(startspiece,1) && cm.getMapId()==mapt && count < 1 ? finish = 0 : cm.haveItem(startspiece,1) && cm.getMapId()==mapt && mobt == 0 ? finish = 1 : finish = -1);
            // the above is a series of checks to see which team has won, and which team has lost. 0 = lose, 1 = win
        if (cm.getParty() == null) {
            cm.warp(980000504);
            cm.sendOk("You have been warped out due to not being in a party.");
            cm.dispose();
                } else if (!cm.haveItem(startspiece,1) && (mob > 0 || mobt > 0)) {
            cm.givePartyItems(startspiece, 1, cm.getPartyMembers());
                        cm.mapMessage(5, "Your party has been updated to active. You will now be able to summon monsters.");
            cm.dispose();
        } else if (finish == 0) {
            cm.warpParty(980000404);
            cm.mapMessage(5, "Sorry! The enemy team has won the match. Please talk to Spiegelmann to gain your rewards!");
            cm.dispose();
        } else if (finish == 1) {
            cm.warpParty(980000403);
            cm.mapMessage(5, "Congratulations! You have won the carnival game! Please talk to Spiegelmann for a handsome reward for your participation!");
            cm.dispose();
        } else if (players == 0) {
            leave = 1;
            cm.sendYesNo("You must wait for an opposing party to enter before you can starts the PQ. Would you like to leave?\r\n\r\n#eChoosing to leave will exit your entire party.#n");
        } else if (starts == 0) {
            if (!cm.isLeader()) {
                cm.sendOk("Please wait for the leaders to begin the PQ. Both teams are ready and able-bodied to begin the game.");
                cm.dispose();
            } else if (!cm.haveItem(startspiece,1)) {
                if (cm.getMapId()==map) {
                    cm.givePartyItems(startspiece, 1, cm.getPartyMembers());
                    cm.mapMessage(5, "You have been given a Shiny Maple Coin. Do not drop this item. If you do, then you will be unable to spawn any more monsters.");
                    cm.summonMobAtPosition(9300133,3,-111,162);
                    cm.summonMobAtPosition(9300136,3,231,162);
                    cm.summonMobAtPosition(9300136,3,36,162);
                    cm.summonMobAtPosition(9300133,3,185,162);
                    cm.summonMobAtPosition(9300136,3,295,-138);
                    cm.summonMobAtPosition(9300133,3,115,-138);                
                    cm.spawnMobOnDiffMap(mapt,9300133,3,-111,162);
                    cm.spawnMobOnDiffMap(mapt, 9300136,3,231,162);
                    cm.spawnMobOnDiffMap(mapt, 9300136,3,36,162);
                    cm.spawnMobOnDiffMap(mapt, 9300133,3,185,162);
                    cm.spawnMobOnDiffMap(mapt, 9300136,3,295,-138);
                    cm.spawnMobOnDiffMap(mapt, 9300133,3,115,-138);
                    cm.dispose();
                } else {
                    cm.summonMobAtPosition(9300133,3,-111,162);
                    cm.summonMobAtPosition(9300136,3,231,162);
                    cm.summonMobAtPosition(9300136,3,36,162);
                    cm.summonMobAtPosition(9300133,3,185,162);
                    cm.summonMobAtPosition(9300136,3,295,-138);
                    cm.summonMobAtPosition(9300133,3,115,-138);                
                    cm.spawnMobOnDiffMap(map,9300133,3,-111,162);
                    cm.spawnMobOnDiffMap(map, 9300136,3,231,162);
                    cm.spawnMobOnDiffMap(map, 9300136,3,36,162);
                    cm.spawnMobOnDiffMap(map, 9300133,3,185,162);
                    cm.spawnMobOnDiffMap(map, 9300136,3,295,-138);
                    cm.spawnMobOnDiffMap(map, 9300133,3,115,-138);
                }
            }
        } else {
            txt = "These are the monsters that you can summon on the opposing map. You will spawn a total of #e21#n mobs on the other side each time you select a mob to spawn.";
            for (var i = 0; i < mobs[0].length; i++)
            txt += "\r\n#L"+i+"##o"+mobs[0][i]+"# - #b"+mobs[1][i]+"#k #i"+coin+"#";
            cm.sendSimple(txt);
            }
        } else if (status == 1) {
            if (leave == 1) {
                cm.warpParty(980000000);
                cm.dispose();
            } else if (!cm.haveItem(coin, mobs[1][selection])) {
                    cm.sendOk("You cannot summon this monster, #b#o"+mobs[0][selection]+"##k. You are lacking #b"+(mobs[1][selection] - cm.haveItem(coin))+"#k #i"+coin+"#.");
                    cm.dispose();
                } else {
                    if (cm.getMapId()==map) {
                        cm.mapMessage(5, ""+cm.getPlayer().getName+" has summoned 21 "+mobs[2][selection]+" on the enemy's side!");
                        cm.gainItem(coin, -mobs[1][selection]);
                        cm.spawnMobOnDiffMap(mapt, mobs[0][selection], 7, -207, 162);
                        cm.spawnMobOnDiffMap(mapt,mobs[0][selection], 7, 221, -138);
                        cm.spawnMobOnDiffMap(mapt, mobs[0][selection], 7, 232, 162);
                        cm.dispose();
                    } else {
                        cm.mapMessage(5, ""+cm.getPlayer().getName+" has summoned 21 "+mobs[2][selection]+" on the enemy's side!");
                        cm.gainItem(coin, -mobs[1][selection]);
                        cm.spawnMobOnDiffMap(map, mobs[0][selection], 7, -207, 162);
                        cm.spawnMobOnDiffMap(map,mobs[0][selection], 7, 221, -138);
                        cm.spawnMobOnDiffMap(map, mobs[0][selection], 7, 232, 162);
                        cm.dispose();
                }
            }
        }
    }  