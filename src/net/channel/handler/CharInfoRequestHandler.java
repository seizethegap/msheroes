package net.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import net.AbstractMaplePacketHandler;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class CharInfoRequestHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readShort(); // most likely two shorts rather than one int but dunno ^___^
        slea.readShort();
        int cid = slea.readInt();
        MapleCharacter player = (MapleCharacter) c.getPlayer().getMap().getMapObject(cid);
        if (!player.isGM() || c.getPlayer().isGM()) {
            c.getSession().write(MaplePacketCreator.charInfo((MapleCharacter) c.getPlayer().getMap().getMapObject(cid), cid==c.getPlayer().getId()));
        } else if (c.getPlayer().isGM() && player.isGM()) {
            c.getSession().write(MaplePacketCreator.charInfo((MapleCharacter) c.getPlayer().getMap().getMapObject(cid), cid==c.getPlayer().getId()));
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
    }
}
