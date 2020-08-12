/*
	Cherry, Ellinia
	Resource from RageZone
	Modified by ThomasE
	NostalgicMS
*/

function start()
{
	if(cm.haveItem(4031045))
	{
		var em = cm.getEventManager("Boats");

		if (em.getProperty("entry") == "true" && cm.getPlayer().getMap().hasBoat() == 2)
		{
			cm.sendYesNo("This will not be a short flight, so if you need to take care of some things, I suggest you do that first before getting on board. Do you still wish to board the ship? In that case, make sure to have your ticket ready. If you don't have one yet, you can buy one from #bJoel#k.");
		}
		else
		{
			if (em.getProperty("entry") == "false" && em.getProperty("docked") == "true" && cm.getPlayer().getMap().hasBoat() == 2)
			{
				cm.sendNext("We will begin boarding 10 minutes before the takeoff. Please be patient and wait for a few minutes. Be aware that the ship will take off right on time, and we stop boarding 1 minute before that, so please make sure to be here on time.");
			}
			else
			{
				if (cm.getPlayer().getMap().hasBoat() == 2)
				{
					cm.sendNext("This ship is getting ready for takeoff. I'm sorry, but you'll have to get on the next ride. The ride schedule is available through the guide at the ticketing booth.");
				}
				else
				{
					cm.sendNext("We will begin boarding 10 minutes before the takeoff. Please be patient and wait for a few minutes. Be aware that the ship will take off right on time, and we stop boarding 1 minute before that, so please make sure to be here on time.");
				}
			}
			cm.dispose();
		}
	}
	else
	{
		cm.sendOk("I'm sorry, you will need to buy a #bTicket to Orbis (Regular)#k from #bJoel#k before you can enter.");
		cm.dispose();
	}
}

function action(mode, type, selection)
{
	cm.gainItem(4031045, -1);
	cm.warp(101000301);
	cm.dispose();
}