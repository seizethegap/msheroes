/*
	Joel, Ellinia
	Coded by ThomasE
	NostalgicMS
*/

var status = 0;

function start()
{
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
		cm.sendNext("Hi there! I'm Joel, and I work for this station. Are you thinking of leaving Victoria Island for other places? This station is where you'll find the ship that heads to #bOrbis Station#k of Ossyria leaving #bat the top of the hour, and every 15 minutes afterwards#k.");

	else if (status == 1)
		cm.sendNextPrev("If you are thinking of going to #bOrbis#k, please go talk to #bCherry#k on the right.");

	else if (status == 2)
		cm.sendSimple("Cherry won't let you on the ride unless you have a #bTicket to Orbis (Regular)#k, so you will have to buy one from me. The tickets will cost #b20,000 mesos each#k. Do you want to proceed? \r\n#b#L0#I would like to buy a Ticket to Oribs (Regular).#l \r\n#b#L1#Please send me to Orbis immediately (Donators).#l");

	else if (status == 3)
	{
		if (cm.getMeso() < 20000)
		{
			cm.sendOk("Sorry, you do not have enough mesos.");
		}
		else
		{
			if (selection == 0)
			{
				cm.gainMeso(-20000);
				cm.gainItem(4031045);
				cm.sendOk("There you go. Talk to #bCherry#k when you want to head over to #bOrbis Station#k.");
			}
			else if (selection == 1)
			{
				if (cm.getPlayer().gmLevel() >= 1)
				{
					cm.gainMeso(-20000);
					cm.warp(200000100);
				}
				else
					cm.sendOk("Sorry, only Donators may use this feature. Therefore, I have instead given you a #bTicket to Orbis (Regular)#k. Please talk to #bCherry#k when you want to use it.");
					cm.gainMeso(-20000);
					cm.gainItem(4031045);
			}
		}
	}
}