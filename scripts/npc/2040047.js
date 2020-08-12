/*
	Sgt. Anderson, Ludibrium PQ
	Coded by Raz
	Modified by Saint
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
	if (mode == -1) //Exit Chat
		cm.dispose();

	else if (mode == 0) //No
	{
		cm.sendOk("Okay, just let me know if you want to leave.");
		cm.dispose();
	}
	else
	{
		if (mode == 1)
			status++;
		else
			status--;

	if(cm.getPlayer().getMap().getId() == 922010000)
	{
		if(status == 0)
			cm.sendNext("See you net time!");

		else if (status == 1)
		{
			cm.warp(221024500);
			cm.dispose();
		}
	}
	else
	{
		if (status == 0)
			cm.sendYesNo("Do you really want to leave the Ludibrium PQ?");
		
		else if (status == 1)
			cm.sendNext("Alright, see you next time!");
		
		else if (status == 2)
		{
			var eim = cm.getPlayer().getEventInstance();

			if (eim == null)
				cm.sendOk("Hmm, how did you end up here?\r\nOh well, I'll send you out from here.");
			
			else
			{
				if (isLeader() == true)
				{
					eim.disbandParty();
					cm.removeFromParty(4001008, eim.getPlayers());
				}
				else
				{
					eim.leftParty(cm.getPlayer());
					cm.removeAll(4001022);
				}
				cm.dispose();
			}
		}
		else if (status == 3)
		{
			cm.warp(221024500);
			cm.removeAll(4001022);
			cm.dispose();
		}
	}
}
}

function isLeader()
{
	if (cm.getParty() == null)
		return false;
	else
		return cm.isLeader();
}