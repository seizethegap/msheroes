package net.channel.handler;

import java.util.List;

import java.util.concurrent.ScheduledFuture;
import client.MapleCharacter;
import client.MapleClient;
import net.MaplePacket;
import server.TimerManager;
import server.movement.LifeMovementFragment;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import server.maps.FakeCharacter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MovePlayerHandler extends AbstractMovementPacketHandler {

    private static Logger log = LoggerFactory.getLogger(MovePlayerHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readByte();
        slea.readInt();
        final List<LifeMovementFragment> res = parseMovement(slea);
        if (res != null) {
            if (slea.available() != 18) {
                log.warn("slea.available != 18 (movement parsing error)"); //dash problem?
                return;
            }
            MapleCharacter player = c.getPlayer();
            if (!player.isHidden()) {
                MaplePacket packet = MaplePacketCreator.movePlayer(player.getId(), res);
                c.getPlayer().getMap().broadcastMessage(player, packet, false);
            }
            updatePosition(res, c.getPlayer(), 0);
            c.getPlayer().getMap().movePlayer(c.getPlayer(), c.getPlayer().getPosition());
            if (c.getPlayer().hasFakeChar()) {
                int i = 1;
                for (final FakeCharacter ch : c.getPlayer().getFakeChars()) {
                    ScheduledFuture<?> scheduleRemove = TimerManager.getInstance().schedule(new Runnable() {

                        @Override
                        public void run() {
                            MaplePacket packet = MaplePacketCreator.movePlayer(ch.getFakeChar().getId(), res);
                            ch.getFakeChar().getMap().broadcastMessage(ch.getFakeChar(), packet, false);
                            updatePosition(res, ch.getFakeChar(), 0);
                            ch.getFakeChar().getMap().movePlayer(ch.getFakeChar(), ch.getFakeChar().getPosition());
                        }
                    }, i * 300);
                    i++;
                }
            }
        }
    }
}
