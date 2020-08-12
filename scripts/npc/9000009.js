/*
	Vikin, Lith Harbor
	Coded by ThomasE
	NostalgicMS
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection)
{
	if (mode == -1)
		cm.dispose();

	if (mode == 1)
		status++;
	else
		status--;

	if (status == 0) 
		cm.sendOk("Hahaha! I am the king of the sea!");
}