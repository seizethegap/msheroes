/*
	Mel, Ludibrium
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
		cm.sendNext("Hi there! I'm Mel, and I work for this station. Are you thinking of going to Orbis? This station is where you'll find the train that heads to #bOrbis Station#k of Ossyria leaving #bat the top of the hour, and every 15 minutes afterwards#k.");

	else if (status == 1)
		cm.sendNextPrev("If you are thinking of going to #bOrbis#k, please go talk to #bTian#k on the right.");

	else if (status == 2)
		cm.sendYesNo("Tian won't let you on the ride unless you have a #bTicket to Orbis (Regular)#k, so you will have to buy one from me. It costs #b20,000 mesos#k each. Do you want to proceed?");

	else if (status == 3)
	{
		if (cm.getMeso() >= 20000)
		{
			cm.gainMeso(-20000);
			cm.gainItem(4031045);
			cm.sendOk("There you go. Talk to #bTian#k when you want to head over to #bOrbis Station#k.");
		}
		else
		{
			cm.sendOk("Sorry, you do not have enough mesos.");
		}
	}
	else if (status == 3 && selection == 1)
	{
		cm.sendOk("Alright, take care.")
	}
}