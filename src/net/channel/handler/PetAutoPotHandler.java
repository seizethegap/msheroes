package net.channel.handler;

import client.IItem;
import client.MapleClient;
import client.MapleInventoryType;
import net.AbstractMaplePacketHandler;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Patrick
 */
public class PetAutoPotHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (!c.getPlayer().isAlive() || c.getPlayer().isPvPMap()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        byte type = slea.readByte();
        slea.readLong();
        slea.readInt();
        byte slot = slea.readByte();
        slea.readByte();
        int itemId = slea.readInt();
        IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse != null && toUse.getQuantity() > 0) {
            if (toUse.getItemId() != itemId) {
                return;
            }
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
            MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId()).applyTo(c.getPlayer());
        }
    }
}