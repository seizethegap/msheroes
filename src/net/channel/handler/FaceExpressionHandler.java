package net.channel.handler;

import client.MapleClient;
import client.anticheat.CheatingOffense;
import net.AbstractMaplePacketHandler;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import server.maps.FakeCharacter;

public class FaceExpressionHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int emote = slea.readInt();
        if (emote > 7) {
            int emoteid = 5159992 + emote;
            if (c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(emoteid)).findById(emoteid) == null) {
                c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.USING_UNAVAILABLE_ITEM, Integer.toString(emoteid));
                return;
            }
        }
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.facialExpression(c.getPlayer(), emote), false);
        for (FakeCharacter ch : c.getPlayer().getFakeChars()) {
            c.getPlayer().getMap().broadcastMessage(ch.getFakeChar(), MaplePacketCreator.facialExpression(ch.getFakeChar(), emote), false);
        }
    }
}
