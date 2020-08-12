/*
	Martin, Orbis
	Coded by ThomasE
	NostalgicMS
*/

var Status = 0;

function start()
{
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
		cm.sendNext("Hey, I'm #bMartin#k. I am waiting for my brothers... What takes them so long? I got bored now... If we do not get there on time, we might not be able to participate in the event...");

	else if (status == 1)
	{
		cm.sendNextPrev("Hmm... What should I do? The event will start, soon... Many people went to participate in the event, so we better be hurry...");
		cm.dispose();
	}

}