/*
	Spiegelmann, Towns
	Coded by ThomasE
	NostalgicMS
*/

var status;

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
		//cm.sendNext("Why not join our self-coded exclusive Monster Carnival that we offer on NostalgicMS? It is free of charge and anyone who is #bbetween level 30 and level 50#k may join it.")
		cm.sendOk("Sorry, my services are currently being prepared. Please check back later!");
		cm.dispose();

	if (status == 1)
	{
		if (cm.getPlayer().getLevel() > 50 || cm.getPlayer().getLevel() < 30)
		{
			cm.sendOk("Sorry, you are not qualified to join the battle.");
			cm.dispose();
		}
		else
			cm.sendYesNo("Would you like to enter the Monster Carnival?");
	}

	if (status == 2)
	{
		cm.warp(980000000, 0);
		cm.dispose();
	}
}
