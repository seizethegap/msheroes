var status = 0;

function start()
{
	cm.sendYesNo("Would you like to be warped back to your home town?");
} 

function action(mode, type, selection)
{
	if (mode == -1)
		cm.dispose();
	else
	{
		if (status >= 0 && mode == 0)
		{
			cm.sendOk("Okay. Let me know when you want to get out of here.");
			cm.dispose();
		}
		else
			status++;
		if (status == 1)
			cm.sendNext("Alright, I will send you out from here. Bye!");
		else if (status == 2)
		{
			map = cm.getChar().getSavedLocation(SavedLocationType.WORLDTOUR);
		cm.warp(map, 0);
		cm.dispose();

		}

	}
}
