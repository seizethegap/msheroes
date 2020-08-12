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
            cm.sendSimple("The boats are currently under maintenance. In the meantime, I have been employed to warp people who wants to move to another continent. Where would you like to go? \r\n#L0##bEllinia of Victoria Island (20,000 mesos)#k#l \r\n#L1##bLudibrium#k#l \r\n#L2##bLeafre#k#l \r\n#L3##bAriant#k#l \r\n#L4##bMu Lung#k#l \r\n#L5##bI'd like to stay in Orbis#k#l");
        else if (status == 1 && selection == 0 && cm.getMeso() >= 20000) {

	cm.gainMeso(-20000);
        cm.gainItem(4031047);
	cm.sendOk("Alright, have a great time in the cabin.");
        } else if (status == 1 && selection == 1)
            cm.warp(220000100, 0);
        else if (status == 1 && selection == 2)
            cm.warp(240000100, 0);
        else if (status == 1 && selection == 3)
            cm.warp(260000100, 0);
        else if (status == 1 && selection == 4)
            cm.warp(250000100, 0);
        else if (status == 1 && selection == 5)
            cm.dispose();
        }