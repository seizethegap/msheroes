/*
	Robin, Snail Hunting Ground 1 & Donator Map
	Coded by ThomasE
	NostalgicMS
*/

function start()
{
	cm.sendYesNo("Hi there! Any chance that you may want a stat reset? It will cost you #b10,000,000 mesos#k if you're level 50 or above. If you're under level 50, it will be free. All stats will be reset except for ability points distributed at Health or Mana.");
}

function action(mode, type, selection)
{
	if(mode > 0)
	{
		if (cm.getPlayer().getLevel() >= 50)
		{
			if (cm.getMeso() < 10000000)
			{
				cm.sendOk("I'm sorry, but you do not have enough mesos.")
				cm.dispose();
			}
			else
			{
				cm.gainMeso(-10000000);
        			cm.resetStats();
        			cm.sendOk("There you go! Just let me know if you ever would like to have them reset again.");
				cm.dispose();
			}
		}
		else
		{
			cm.resetStats();
        		cm.sendOk("There you go! Just let me know if you ever would like to have them reset again.");
			cm.dispose();
		}
	}
}