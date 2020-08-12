package net.channel.handler;

import client.MapleClient;
import client.MapleInventoryType;
import net.AbstractMaplePacketHandler;
import server.MapleItemInformationProvider;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 * 
 * @author Matze
 */

public class NPCShopHandler extends AbstractMaplePacketHandler {
	
	public NPCShopHandler() {
	}

	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
		byte bmode = slea.readByte();
		if (bmode == 0) { // mode 0 = buy :)
			slea.readShort();//?
			int itemId = slea.readInt();
			short quantity = slea.readShort();
			c.getPlayer().getShop().buy(c, itemId, quantity);
		} else if (bmode == 1) { // sell ;)
			byte slot = (byte) slea.readShort();
			int itemId = slea.readInt();
			MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemId);
			short quantity = slea.readShort();
			c.getPlayer().getShop().sell(c, type, slot, quantity);
		} else if (bmode == 2) { // recharge ;)
			byte slot = (byte) slea.readShort();
			c.getPlayer().getShop().recharge(c, slot);
		}
	}
}