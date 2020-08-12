/* * * * * * * * * * * * * * * \
*         Inventory Spy        *
*  By Hugo of MadStory/VoidMS  *
*      gugubro1@gmail.com      *
*         madstory.org         *
*          voidms.com          *
\ * * * * * * * * * * * * * * */

var name;
var status = 0;
var thing = 0;
var slot;
var p = null;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 2 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getPlayer().getGMLevel() >= 3) {
                cm.sendGetText("Hello #h #! I can view someone's item inventory for you. \r\n\r\nPlease select a player. The player must be logged in and in the same channel as you. \r\n");
            } else {
                cm.sendOk("I'm sorry, only Game Masters may view other people's inventory.");
                cm.dispose();
            }
        } else if (status == 1) {
            name = cm.getText(); 
            p = cm.getCharByName(name);
            if (p != null) {
                cm.sendSimple("Choose an inventory#b\r\n#L0#Equip#l\r\n#L1#Use#l\r\n#L2#Set-up#l\r\n#L3#ETC#l\r\n#L4#Cash#l");
            } else {
                cm.sendOk("The player you are trying to view the inventory of either is offline or not in the same channel as you.");
            }
        } else if (status == 2) {
            string = "Click on an item to remove #rall#k of it.\r\n";
            thing = selection;
            if (selection == 0) {                
                cm.sendSimple(string+cm.EquipList(p.getClient()));
            } else if (selection == 1) {
                cm.sendSimple(string+cm.UseList(p.getClient()));
            } else if (selection == 2) {
                cm.sendSimple(string+cm.SetupList(p.getClient()));
            } else if (selection == 3) {
                cm.sendSimple(string+cm.ETCList(p.getClient()));
            } else if (selection == 4) {
                cm.sendSimple(string+cm.CashList(p.getClient()));
            }
        } else if (status == 3) {
            slot = selection;
            send = "This player has #r";
            send2 = "#k of the following item: #i";
            if (thing == 0) {
                send += p.getItemQuantity(p.getEquipId(selection), true);
                send2 += p.getEquipId(selection);
            } else if (thing  == 1) {
                send += p.getItemQuantity(p.getUseId(selection), true);
                send2 += p.getUseId(selection);
            } else if (thing == 2) {
                send += p.getItemQuantity(p.getSetupId(selection), true);
                send2 += p.getSetupId(selection);
            } else if (thing == 3) {
                send += p.getItemQuantity(p.getETCId(selection), true);
                send2 += p.getETCId(selection);
            } else if (thing == 4) {
                send += p.getItemQuantity(p.getCashId(selection), true);
                send2 += p.getCashId(selection);
            }
            var send3 = send + send2 + "#. Are you really sure you want to delete #rall#k of it? This action may not be undone.";
            cm.sendYesNo(send3);
        } else if (status == 4) {
            if (thing == 0) { 
                p.deleteAll(p.getEquipId(slot));
            } else if (thing == 1) {
                p.deleteAll(p.getUseId(slot));
            } else if (thing == 2) {
                p.deleteAll(p.getSetupId(slot));
            } else if (thing == 3) {
                p.deleteAll(p.getETCId(slot));
            } else if (thing == 4) {
                p.deleteAll(p.getCashId(slot));
            }
            cm.sendOk("Successfully deleted " +  name + "'s item(s). Have a nice day!");
            cm.dispose();
        }
    }
}  