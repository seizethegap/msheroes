package net.channel.handler;

import client.ExpTable;
import client.MapleClient;
import client.MapleInventoryType;
import net.AbstractMaplePacketHandler;
import net.channel.ChannelServer;
import server.MapleInventoryManipulator;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 * @author PurpleMadness
 */
public class UseMountFoodHandler extends AbstractMaplePacketHandler {

    private int expRandom(int mountlevel) { //Shortened by Moogra
        int exp = 0;
        if (mountlevel < 8) {
            exp = rand(15, 26);
        } else if (mountlevel > 9 && mountlevel < 16) {
            exp = rand(7, 20);
        } else if (mountlevel > 15 && mountlevel < 25) {
            exp = rand(9, 29);
        } else if (mountlevel > 24) {
            exp = rand(12, 37);
        }
        return exp;
    }

    private static int rand(int lbound, int ubound) {
        return (int) ((Math.random() * (ubound - lbound + 1)) + lbound);
    }

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readInt();
        slea.readShort();
        int itemid = slea.readInt();
        if (c.getPlayer().getInventory(MapleInventoryType.USE).findById(itemid) != null) {
            if (c.getPlayer().getMount() != null) {
                c.getPlayer().getMount().setTiredness(c.getPlayer().getMount().getTiredness() - 30);
                c.getPlayer().getMount().setExp(expRandom(c.getPlayer().getMount().getLevel()) * ChannelServer.getInstance(c.getChannel()).getMountRate() + c.getPlayer().getMount().getExp());
                int level = c.getPlayer().getMount().getLevel();
                if (c.getPlayer().getMount().getExp() >= ExpTable.getMountExpNeededForLevel(level) && level < 31 && c.getPlayer().getMount().getTiredness() != 0) {
                    c.getPlayer().getMount().setLevel(level + 1);
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.updateMount(c.getPlayer().getId(), c.getPlayer().getMount(), true));
                } else {
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.updateMount(c.getPlayer().getId(), c.getPlayer().getMount(), false));
                }
                MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, true, false);
            } else {
                c.getPlayer().dropMessage("Please get on your mount first before using the mount food.");
            }
        }
    }
}