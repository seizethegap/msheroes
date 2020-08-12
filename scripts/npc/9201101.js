/*
	T-1337, Donator Map (209000002)
	(WARNING: Needs to be removed from New Leaf City)
	Coded by ThomasE
	NostalgicMS
*/

importPackage(Packages.server.maps);

var status = 0;

function start()
{
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)
{
	if (mode == -1)
	{
		cm.dispose();
	}
	else
	{
		if (status >= 2 && mode == 0)
		{
			cm.sendOk("Alright, see you next time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;

		if (cm.getChar().getMapId() == 209000002)
		{
			if (status == 0) {
				cm.sendNext("Hi, I am the manager of the Donator Map. Do you need anything?");
		}
		else if (status == 1)
		{
			cm.sendSimple ("If you can't enjoy yourself in here anymore, I can help you back. Are you interested? \r\n#L0##bTake me back!#k#l");
		}
		else if (status == 2)
		{
			if (selection == 0)
			{
				cm.sendYesNo("So you want to go back to where you came from?");
				}
			}
			else if (status == 3)
			{
				map = cm.getChar().getSavedLocation(SavedLocationType.FLORINA);
				if (map == -1)
				{
					map = 910000000;
				}

			cm.warp(map, 0);
			cm.dispose();
			}
		}
		else
		{
			if (status == 0)
			{
				cm.sendNext("I will send you to the Donator map. Please select End Chat if you would like to cancel.")
			}
			else if (status == 1)
			{
				cm.getChar().saveLocation(SavedLocationType.FLORINA);
				cm.warp(209000002, 0);
				cm.dispose();
			}
		}
	}
}