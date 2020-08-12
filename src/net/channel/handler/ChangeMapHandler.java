package net.channel.handler;

import java.net.InetAddress;
import client.MapleCharacter;
import client.MapleClient;
import net.AbstractMaplePacketHandler;
import net.MaplePacket;
import net.channel.ChannelServer;
import server.MaplePortal;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class ChangeMapHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (slea.available() == 0) {
            int channel = c.getChannel();
            String ip = ChannelServer.getInstance(c.getChannel()).getIP(channel);
            String[] socket = ip.split(":");
            c.getPlayer().saveToDB(true);
            c.getPlayer().setInCS(false);
            ChannelServer.getInstance(c.getChannel()).removePlayer(c.getPlayer());
            c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION);
            try {
                MaplePacket packet = MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1]));
                c.getSession().write(packet);
                c.getSession().close();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else {
            byte type = slea.readByte(); // 1 = from dying 2 = regular portals
            int targetid = slea.readInt(); // FF FF FF FF
            String startwp = slea.readMapleAsciiString();
            MaplePortal portal = c.getPlayer().getMap().getPortal(startwp);
            MapleCharacter player = c.getPlayer();
            if (targetid != -1 && !c.getPlayer().isAlive()) {
                boolean executeStandardPath = true;
                if (player.getEventInstance() != null) {
                    executeStandardPath = player.getEventInstance().revivePlayer(player);
                }
                if (executeStandardPath) {
                    c.getPlayer().cancelAllBuffs();
                    player.setHp(50);
                    MapleMap to = c.getPlayer().getMap().getReturnMap();
                    MaplePortal pto = to.getPortal(0);
                    player.setStance(0);
                    player.changeMap(to, pto);
                }
            } else if (targetid != -1 && c.getPlayer().isGM()) {
                if (c.getPlayer().getChalkboard() != null) {
                    c.getPlayer().getClient().getSession().write(MaplePacketCreator.useChalkboard(c.getPlayer(), true));
                }
                MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetid);
                MaplePortal pto = to.getPortal(0);
                player.changeMap(to, pto);
            } else if (targetid != -1 && !c.getPlayer().isGM()) {
                //log.warn("Player {} attempted Map jumping without being a GM", c.getPlayer().getName());
            } else {
                if (portal != null) {
                    portal.enterPortal(c);
                } else {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    //log.warn("Portal {} not found on map {}", startwp, c.getPlayer().getMap().getId());
                }
            }
        }
    }
}