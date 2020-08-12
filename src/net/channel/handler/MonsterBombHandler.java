package net.channel.handler;

import client.MapleClient;
import client.anticheat.CheatingOffense;
import net.AbstractMaplePacketHandler;
import server.life.MapleMonster;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class MonsterBombHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int oid = slea.readInt();

        MapleMap map = c.getPlayer().getMap();
        MapleMonster monster = map.getMonsterByOid(oid);

        if (!c.getPlayer().isAlive() || monster == null) {
            return;
        }

        switch (monster.getId()) {
            case 8500003:
            case 8500004:
                monster.getMap().broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), 4));
                map.removeMapObject(oid);
                break;
            default:
                c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.MOB_INSTANT_DEATH_HACK);
                break;
        }
    }
}