/*
	Cody
	Coded by ThomasE
	NostalgicMS
*/

var status;

function start()
{
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)
{
	if (cm.getChar().getMapId() == 209000002)
	{
		status++;
		if (mode != 1)
		{
			cm.dispose();
			return;
		}

		if (status == 0)
			cm.sendSimple("Hi there, I'm #bCody#k. I'm the manager of the Donator Points at NostalgicMS. What would you like to do? #b\r\n#L4#I'd like to know more about Roger's Apple.#l \r\n#L5#I've missed all events! Do you have any Event Ticket?#l \r\n#L10#Umm, I'm out of Mesos. Can you help me?#l \r\n#L13#Trade 1 Donator Point(s) for 5,000 Nexon Cash.#l")

		else if (status == 1 && selection == 4)
			cm.sendSimple("I think #bRoger#k is missing an apple. I have lots of them. Would you like to trade #r1 Donator Point(s)#k for a #rRoger's Apple#k? #b\r\n#L6#Yes#l \r\n#L7#No#l");

		if (status == 2 && selection == 6)
		{
			if (cm.getDonatorPoints() >= 1) 
			{
				cm.sendOk("I have traded one of your Donator Points for a #rRoger's Apple#k. I'm sure he will give you a handsome reward if you give it to him!");
				cm.gainDonatorPoints(-1);
				cm.gainItem(2010007, 1);
				cm.dispose();
			}
			else
			{
				cm.sendOk("Sorry, you are lacking Donator Points! You need #r1 Donator Point(s)#k to complete this trade. To see your current balance, try out #r@donatorpoints#k.");
				cm.dispose();
			}
		}

		if (status == 2 && selection == 7)
			cm.dispose();

		else if (status == 1 && selection == 5)
		{
			cm.sendSimple("Do you want to buy an #rEvent Ticket#k from me? It'll cost you #r4 Donator Point(s)#k. #b\r\n#L8#Yes#l \r\n#L9#No#l");
		}

		else if (status == 2 && selection == 8)
		{
			if (cm.getDonatorPoints() >= 4) 
			{
				cm.sendOk("There you go. Have a nice day!");
				cm.gainDonatorPoints(-4);
				cm.gainItem(4032055, 1);
				cm.dispose();
			}
			else
			{
				cm.sendOk("Sorry, you are lacking Donator Points! You need #r2 Donator Point(s)#k to complete this trade. To see your current balance, try out #r@donatorpoints#k.");
				cm.dispose();
			}
		}

		if (status == 2 && selection == 9)
			cm.dispose();

		else if (status == 1 && selection == 10)
			cm.sendSimple("Uhm, actually I can. Do you want to buy #r250,000 mesos#k from me? It'll cost you #r1 Donator Point(s)#k. #b\r\n#L11#Yes#l \r\n#L12#No#l");

		else if (status == 2 && selection == 11)
		{
			if (cm.getDonatorPoints() >= 1) 
			{
				cm.sendOk("I have credited your account with #r250,000 mesos#k. Have a nice day!");
				cm.gainDonatorPoints(-1);
				cm.gainMeso(250000);
				cm.dispose();
			}
			else
			{
				cm.sendOk("Sorry, you are lacking Donator Points! You need #r1 Donator Point(s)#k to complete this trade. To see your current balance, try out #r@donatorpoints#k.");
				cm.dispose();
			}
		}

		if (status == 2 && selection == 12)
			cm.dispose();

		else if (status == 1 && selection == 13)
			cm.sendSimple("Are you sure that you want to trade #r1 Donator Point(s)#k for #r5,000 Nexon Cash#k? This action may not be undone. #b\r\n#L14#Yes#l \r\n#L15#No#l");

		else if (status == 2 && selection == 14)
		{
			if (cm.getDonatorPoints() >= 1) 
			{
				cm.sendOk("Alright! I have added #r5,000 Nexon Cash#k to your account.. Have a nice day!");
				cm.gainDonatorPoints(-1);
				cm.modifyNX(5000, 1);
				cm.dispose();
			}
			else
			{
				cm.sendOk("Sorry, you are lacking Donator Points! You need #r1 Donator Point(s)#k to complete this trade. To see your current balance, try out #r@donatorpoints#k.");
				cm.dispose();
			}
		}

		if (status == 2 && selection == 15)
			cm.dispose();
	}
	else
	{
		status++;
		if (status == 0)
			cm.sendSimple("Hi there, I'm #bCody#k. I'm the manager of the Vote Points at NostalgicMS. What would you like to do? \r\n#b#L1#Trade 1 Vote Point(s) for 3,000 Nexon Cash#l \r\n#L16#Trade 1 Vote Point(s) for 100,000 Mesos#l \r\n#L2#Trade 2 Vote Point(s) for 6 Hours of 2x EXP & Mesos#l \r\n#L3#Trade 8 Vote Point(s) for 1 Event Ticket#l");

		else if (status == 1)
		{
			if (selection == 1)
			{
				if (cm.getPlayer().getVotePoints() < 1)
					cm.sendOk("Sorry, you do not have enough Vote Points to complete the trade.");

				else
				{
					cm.getPlayer().gainVotePoints(-1);
					cm.modifyNX(3000, 1);
					cm.sendOk("Alright, there you go. Do not hestiate to get back to me if you need anything else.");
				}
			}

			else if (selection == 2)
			{
				if (cm.getPlayer().getVotePoints() < 2)
					cm.sendOk("Sorry, you do not have enough Vote Points to complete the trade.");

				else
				{
					cm.getPlayer().gainVotePoints(-2);
					cm.gainExpCard();
					cm.gainDropCard();
					cm.sendOk("Alright, there you go. The coupon will expire in exactly six hours #rstarting now#k.");
				}
			}

			else if (selection == 3)
			{
				if (cm.getPlayer().getVotePoints() < 8)
					cm.sendOk("Sorry, you do not have enough Vote Points to complete the trade.");

				else
					cm.getPlayer().gainVotePoints(-8);
					cm.gainItem(4032055);
					cm.sendOk("Alright, there you go. Do not hestiate to get back to me if you need anything else.");
			}

			else if (selection == 16)
			{
				if (cm.getPlayer().getVotePoints() < 1)
					cm.sendOk("Sorry, you do not have enough Vote Points to complete the trade.");

				else
					cm.getPlayer().gainVotePoints(-1);
					cm.gainMeso(100000);
					cm.sendOk("Okay, okay. I've credited your account with #r100,000 mesos#k.");
			}
			cm.dispose();
		}
	}
}