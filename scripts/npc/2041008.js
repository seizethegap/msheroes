/*
	Seppy, Ludibrium
	Coded by Saint
	NostalgicMS
*/

function start()
{
	status = -1;
	action(1, 0, 0);
}

function action(m, t, s)
{
	if (cm.getPlayer().gmLevel() >= 3)
	{
		if(!cm.getPlayer().isGM())
			cm.sendOk("I'm sorry, only Game Masters are allowed to see what people have in their inventories.")
		else
		{
			if (m != 1)
			{
				cm.dispose();
				return;
			} 
				status++;

			if (status == 0)
			{
				player = ChannelServer.getPlayerById(s);
				cm.sendSimple("Which inventory would you like to see? \r\n#b#L0#Equip#l\r\n#L1#Use#l\r\n#L2#Setup#l\r\n#L3#Etc#l\r\n#L4#Cash#l");
			}

			else if (status == 1)
			{
				switch (s)
				{
					case 0:
						inv = player.getInventory(MapleInventoryType.EQUIP);
						break;
					case 1:
						inv = player.getInventory(MapleInventoryType.USE);
						break;
					case 2:
						inv = player.getInventory(MapleInventoryType.SETUP);
						break;
					case 3:
						inv = player.getInventory(MapleInventoryType.ETC);
						break;
					case 4:
						inv = player.getInventory(MapleInventoryType.CASH);
						break;
				}
				var text = "Pick an item. \r\n";
				var items = inv.list().toArray();
				for (var j = 0; j < items.length; j++)
				{
					var i = items[j];
					text += "#L" + i.getPosition() + "##i" + i.getItemId() + "##l    ";
				}
				if (items.length != 0)
					cm.sendSimple(text);
				else
				{
					cm.sendNext("This person doesn't have anything in this inventory.");
					status = -1;
				}
			}

			else if (status == 2)
			{
				item = inv.getItem(s);
				slot = s;
				cm.sendSimple("What would you like to do with this item? #i" + item.getItemId() + "#\r\n\r\n#b#L0#Delete#l\r\n#L1#Make a copy#l");
			}

			else if (status == 3)
			{
				if (s == 0)
					inv.removeItem(slot);
				else
					MapleInventoryManipulator.addFromDrop(cm.getClient(), item, "Copy");
				
				cm.sendOk("Done.")
				cm.dispose();
			}
			else if (status == 4)
			{
				if (s == 0)
				{
					cm.sendSimple("Which inventory would you like to see? \r\n#b#L0#Equip#l\r\n#L1#Use#l\r\n#L2#Setup#l\r\n#L3#Etc#l\r\n#L4#Cash#l");
					status = 0;
				}
				else
				{
					cm.sendOk("Have a nice day.");
					cm.dispose();
				}
			}
		}
	}
	else
	{
		cm.getChar().getStorage().sendStorage(cm.getC(), 2041008);
		cm.dispose();
	}
}