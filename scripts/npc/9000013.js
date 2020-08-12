/*
	Tony, Event Assistant
	Coded by ThomasE
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
	if (mode == -1)
		cm.dispose();

	if (mode == 1)
		status++;
	else
		status--;

	if (status == 0 && cm.getChar().getMapId() == 220000000)
		cm.sendNext("Hey, I'm #bTony#k. I am waiting for my brothers... What takes them so long? I got bored now... If we do not get there on time, we might not be able to participate in the event...");

	else if (status == 1 && cm.getChar().getMapId() == 220000000)
		cm.sendNextPrev("Hmm... What should I do? The event will start, soon... Many people went to participate in the event, so we better be hurry...");

	else
	{
		if(status == 0)
		{
			if (!cm.getPlayer().isGM())
			{
				cm.sendOk("I'm sorry, only Game Masters are allowed to host events.");
				cm.dispose();
			}
			else
			{
				cm.sendSimple("What would you like to do? \r\n#L7##bWarp to Event Map Entrance.#k#l \r\n#L16##bWarp to OX Quiz.#k#l \r\n#L0##bWarp to Physical Fitness Challenge.#k#l \r\n#L1##bWarp to Ola Ola.#k#l \r\n#L8##bWarp to Leaving the Event.#k#l \r\n#L15##bWarp back to Free Market.#k#l");
			}
		}

		else if (status == 1 && selection == 7)
			cm.sendSimple("Who would you like to warp to #bEvent Map Entrance#k? \r\n#L9##bWarp me only.#k#l \r\n#L10##bWarp everyone in this map.#k#l")

		else if (status == 1 && selection == 16)
			cm.sendSimple("Who would you like to warp to #bOX Quiz#k? \r\n#L17##bWarp me only.#k#l \r\n#L18##bWarp everyone in this map.#k#l")

		else if (status == 1 && selection == 0)
			cm.sendSimple("Who would you like to warp to #bPhysical Fitness Challenge#k? \r\n#L2##bWarp me only.#k#l \r\n#L3##bWarp everyone in this map.#k#l")
		
		else if (status == 1 && selection == 1)
			cm.sendSimple("Who would you like to warp to #bOla Ola#k event map? \r\n#L4##bWarp me only.#k#l \r\n#L5##bWarp everyone in this map.#k#l")

		else if (status == 1 && selection == 8)
			cm.sendSimple("Who would you like to warp to #bLeaving the Event#k map? \r\n#L11##bWarp me only.#k#l \r\n#L12##bWarp everyone in this map.#k#l")

		else if (status == 1 && selection == 15)
			cm.sendSimple("Who would you like to warp back to #bFree Market#k? \r\n#L13##bWarp me only.#k#l \r\n#L14##bWarp everyone in this map.#k#l")

		else if (status == 2 && selection == 2)
			cm.warp(109040001, 0);
		else if (status == 2 && selection == 3)
			cm.getPlayer().getMap().warpMap(109040001);

		else if (status == 2 && selection == 17)
			cm.warp(109020001, 0);
		else if (status == 2 && selection == 18)
			cm.getPlayer().getMap().warpMap(109020001)

		else if (status == 2 && selection == 4)
			cm.warp(109030001, 0);
		else if (status == 2 && selection == 5)
			cm.getPlayer().getMap().warpMap(109030001);

		else if (status == 2 && selection == 6)
			cm.warp(109030001, 0);
		else if (status == 2 && selection == 5)
			cm.getPlayer().getMap().warpMap(109030001);

		else if (status == 2 && selection == 9)
			cm.warp(109060001, 0);
		else if (status == 2 && selection == 10)
			cm.getPlayer().getMap().warpMap(109060001);

		else if (status == 2 && selection == 11)
			cm.warp(109050001, 0);
		else if (status == 2 && selection == 12)
			cm.getPlayer().getMap().warpMap(109050001);

		else if (status == 2 && selection == 13)
			cm.warp(910000001, 0);
		else if (status == 2 && selection == 14)
			cm.getPlayer().getMap().warpMap(910000001)
	}
}