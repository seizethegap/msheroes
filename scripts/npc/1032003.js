/*
	Shane, Ellinia
	Coded by ThomasE
	NostalgicMS
*/

var status = -1;

function start()
{
	status = -1;
	action(1, 0, 0);
}

function action()
{
	cm.sendNext("You want to go in? Must have heard that there's a precious medicinal herb in here, huh? But I can't let some stranger like you who doesn't know that I own this land in. I'm sorry but I'm afraid that's all there is to it.");
	cm.dispose();
}