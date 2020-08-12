package net.channel.handler;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import scripting.npc.NPCScriptManager;
import scripting.quest.QuestScriptManager;
import server.life.MapleNPC;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
public class NPCTalkHandler extends AbstractMaplePacketHandler {

	@Override
	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
		int oid = slea.readInt();
		slea.readInt(); // dont know
		MapleNPC npc = (MapleNPC) c.getPlayer().getMap().getMapObject(oid);
		if (npc.hasShop()) {
			if (c.getPlayer().getShop() != null) {
				c.getPlayer().setShop(null);
				c.getSession().write(MaplePacketCreator.confirmShopTransaction((byte) 20));
			}
			npc.sendShop(c);
		} else {
			if (c.getCM() != null) NPCScriptManager.getInstance().dispose(c);
			if (c.getQM() != null) QuestScriptManager.getInstance().dispose(c);
			NPCScriptManager.getInstance().start(c, npc.getId());
		}
	}
}
