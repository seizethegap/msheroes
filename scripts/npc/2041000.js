/*
	Tian, Ludibrium
	Coded by ThomasE
	NostalgicMS
*/

var Status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection)
{
	if (mode == -1 || mode == 0)
		cm.dispose();

	if (mode == 1)
		status++;
	else
		status--;

	if (status == 0)
		cm.sendNext("We will begin boarding 10 minutes before the takeoff. Please be patient and wait for a few minutes. That's what I'm suppose to say but I'm in a good mood so I'm going to warp you to #bOrbis Station#k of Ossyria if you are interested.");

	if (status == 1) 
	{
		cm.sendYesNo("Would you like to head over to #bOrbis Station#k of Ossyria now? You will need to have a #bTicket to Orbis (Regular)#k to be able to enter. If you don't have one already, you can buy one from #bMel#k.");
	}

	if (status == 2)
	{
		if (cm.haveItem(4031045))
		{
			cm.gainItem(4031045, -1);
			cm.warp(200000100, 0);
			cm.dispose();
		}
		else
			cm.sendOk("Sorry, you will need to buy a #bTicket to Orbis (Regular)#k from #bJoel#k before you can enter.");
	}
}