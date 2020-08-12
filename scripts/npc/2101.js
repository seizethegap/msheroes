var status = 0;

function start()
{
	cm.sendYesNo("Are you done with your training? If you wish, I will send you out from this training camp.");
}

function action(mode, type, selection)
{
	if (mode == -1)
		cm.dispose();
	else
	{
		if (status >= 0 && mode == 0)
		{
			cm.sendOk("Haven't you finished the training program yet? If you want to leave this place, please do not hesitate to tell me.");
			cm.dispose();
		}
		else
			status++;

		if (status == 1)
			cm.sendNext("Alright, I will send you out from here. Welcome to NostalgicMS!");

		else if (status == 2)
		{
			cm.warp(3, 0);
			cm.dispose();
		}
	}
}