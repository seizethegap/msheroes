package net.channel.handler;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import server.MaplePortal;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class ChangeMapSpecialHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (c.changingMaps) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.changingMaps = true;
        slea.readByte();
        String startwp = slea.readMapleAsciiString();
        slea.readByte();
        slea.readByte();
        MaplePortal portal = c.getPlayer().getMap().getPortal(startwp);
        if (portal != null) {
            portal.enterPortal(c);
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }
}
