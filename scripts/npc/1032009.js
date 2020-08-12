/*
	Purin, On Boat
	Resource from Ragezone
	Modified by ThomasE
*/

var status = 0;

function start()
{
	cm.sendYesNo("We're just about to take off. Are you sure you want to get off the ship? You may do so, but then you'll have to wait until the next available flight, and you will need to bring #bCherry#k a new ticket. Do you still wish to get off board?");
}

function action(mode, type, selection)
{
	if (mode == 1) {
	cm.warp(101000300, 0);
	}
	else
	{
		cm.sendNext("You'll get to your destination in a short while. Talk to other passengers and share your stories to them, and you'll be there before you know it.");
	}
	cm.dispose();
}