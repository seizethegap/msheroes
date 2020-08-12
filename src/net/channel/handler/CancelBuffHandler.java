package net.channel.handler;

import client.MapleClient;
import client.SkillFactory;
import net.AbstractMaplePacketHandler;
import net.MaplePacketHandler;
import server.MapleStatEffect;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.MaplePacketCreator;

public class CancelBuffHandler extends AbstractMaplePacketHandler implements MaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int sourceid = slea.readInt();
        switch (sourceid) {
            case 3121004:
            case 3221001:
            case 2121001:
            case 2221001:
            case 2321001:
            case 5221004:
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.skillCancel(c.getPlayer(), sourceid), false);
                break;
        }
        MapleStatEffect effect = SkillFactory.getSkill(sourceid).getEffect(1);
        c.getPlayer().cancelEffect(effect, false, -1);
    }
}