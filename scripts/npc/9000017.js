//Fame Seller by Moogra

var status = 0;
var fame = Array(1,5,10,20);
var price = Array(1,5,9,18);
var pricenow = 0;
var fameget = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("Hello! I am #bCoco#k.\r\nI'm selling fames, would you like to buy any?\n\r\n#b#L0#1 Fame = 1,000,000 mesos.#l\r\n#L1#5 Fame = 5,000,000 mesos.#l\r\n#L2#10 Fame = 9,000,000 mesos.\r\n#L3#20 Fame = 18,000,000 mesos.#l\n\r\n\r##kChoose the best for you!");
        } else if (status == 1) {
            pricenow = price[selection]*1000000;
            fameget = fame[selection];
            cm.sendYesNo("Are you sure you want to buy #b"+fameget+" Fame#k?");
        } else if (status == 2) {
            if (cm.getMeso() >= pricenow) {
                cm.sendOk("Sure then, enjoy!");
                cm.gainMeso(-pricenow);
                cm.gainFame(fameget);
                cm.dispose();
                } else {
                cm.sendOk("Sorry, you don't have enough mesos. You only have " + cm.getMeso() + " and you need " +pricenow);
                cm.dispose();
            }
        }
    }
}