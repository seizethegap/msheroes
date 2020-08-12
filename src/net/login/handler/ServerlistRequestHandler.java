package net.login.handler;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import net.login.LoginServer;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class ServerlistRequestHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        for (int i = 0; i < LoginServer.getInstance().numberOfWorlds(); i++) {
            c.getSession().write(MaplePacketCreator.getServerList(i, LoginServer.getInstance().getServerName() + " World " + i, LoginServer.getInstance().getLoad()));
            c.getSession().write(MaplePacketCreator.getEndOfServerList());
        }
    }
}
