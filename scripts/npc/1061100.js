var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection)
{
    if (mode == -1)
        cm.dispose();

        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) 
            cm.sendNext("Welcome. We're the Sleepywood Hotel. Our hotel works hard to serve you the best at all times. If you are tired and worn out from hunting, how about a relaxing stay at our hotel?");
        else if (status == 1)
            cm.sendSimple("We offer two kinds of rooms for service. Please chose the one of your liking. \r\n#L0##bRegular sauna (499 mesos per use)#k#l \r\n#L1##bVIP sauna (999 mesos per use)#k#l");
        else if (status == 2 && selection == 0)
            cm.sendYesNo("You've chosen the regular sauna. Your HP and MP will recover fast and you can even purchase some items there. Are you sure you want to go in?");



        else if (status == 2 && selection == 1)
            cm.sendYesNo("You've chosen the VIP sauna. Your HP and MP will recover even faster than that of the regular sauna and you can even find a special item in there. Are you sure you want to go in?")
        else if (status == 3 && selection == 0)
            cm.warp(105040401, 0);
        else if (status == 3 && selection == 1)
            cm.warp(105040402, 0);
}