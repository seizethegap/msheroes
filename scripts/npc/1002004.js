/*
	VIP Cab, Lith Harbor & Donator Map
	Coded by ThomasE
	NostalgicMS
*/

var status = 0;
var cost = 100000;

function start()
{
	cm.sendNext("Hi there! This is Black Cab! For only #b200,000 mesos#k we can take you to #bLudibrium#k. Why is it so cheap, you may think? It is a Black Cab, meaning we skip taxes and other hidden costs that the NostalgicMS staff wants to steal from you.");
}

function action(mode, type, selection)
{
	if (mode == -1)
		cm.dispose();

	else
	{
        	if (status >= 1 && mode == 0)
		{
			cm.sendNext("Well, maybe you're not that kind of person. Peace!");
			cm.dispose();
			return;
		}

		if (mode == 1)
			status++;
		else
			status--;

		if (status == 1)
		{
			if (cm.getJob().equals(Packages.client.MapleJob.BEGINNER))
				cm.sendYesNo("For beginners, we are giving out 50% discount. Would you like to go to #bLudibrum#k for #b100,000 mesos#k?");

		else
		{
			cm.sendYesNo("Ludibrium is located deep inside Ludus Lake. Would you like to go there for #b200,000 mesos#k?");
			cost *= 2;
		}
	}

	else if (status == 2)
	{
		if (cm.getMeso() < cost)
		{
			cm.sendNext("You're broke! You can't use Black Cab without having enough mesos in your inventory. Peace!")
			cm.dispose();
		}
		else
		{
			cm.gainMeso(-cost);
			cm.warp(220000000, 0);
			cm.dispose();
		}
	}
}
}