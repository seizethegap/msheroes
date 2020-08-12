package scripting.portal;

import client.MapleClient;
import client.messages.ServernoticeMapleClientMessageCallback;
import scripting.AbstractPlayerInteraction;
import server.MaplePortal;
import server.maps.MapleReactor;
import tools.MaplePacketCreator;
import server.maps.MapMonitor;

public class PortalPlayerInteraction extends AbstractPlayerInteraction {

    private MaplePortal portal;

    public PortalPlayerInteraction(MapleClient c, MaplePortal portal) {
        super(c);
        this.portal = portal;
    }

    public void sendMessage(String message) {
        new ServernoticeMapleClientMessageCallback(0, c).dropMessage(message);
    }

    public void createMapMonitor(int mapId, boolean closePortal, int reactorMap, int reactor) {
        if (closePortal) {
            portal.setPortalStatus(MaplePortal.CLOSED);
        }
        MapleReactor r = null;
        if (reactor > -1) {
            r = c.getChannelServer().getMapFactory().getMap(reactorMap).getReactorById(reactor);
            r.setState((byte) 1);
            c.getChannelServer().getMapFactory().getMap(reactorMap).broadcastMessage(MaplePacketCreator.triggerReactor(r, 1));
        }
        new MapMonitor(c.getChannelServer().getMapFactory().getMap(mapId), closePortal ? portal : null, c.getChannel(), r);
    }

    public MaplePortal getPortal() {
        return portal;
    }
}