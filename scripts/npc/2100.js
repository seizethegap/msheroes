/*
	Sera, Entrance - Mushroom Town Training Camp
	Coded by ThomasE
	NostalgicMS
*/

function start()
{
	cm.sendSimple("Welcome to NostalgicMS. It's great to have you here! Since you're playing at BETA, I'm going to give you a cool hat! \r\n#L0##bContinue#k#l");
}

function action(mode, type, selection)
{
	if (mode == 0 || mode == -1)
		cm.dispose();

	else
	{
		if(cm.haveItem(1002527))
		{
			cm.sendOk("You won't get another hat. Fly hack down to #bPeter#k so he can warp you to Maple Island.");
			cm.dispose();
		}
		else
		{
			cm.warp(1,0);
			cm.gainItem(1002527);
			cm.dispose();
		}
	}
}