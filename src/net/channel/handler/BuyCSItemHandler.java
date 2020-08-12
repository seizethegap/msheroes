package net.channel.handler;

import client.IItem;
import client.Item;
import client.MapleClient;
import client.MapleInventoryType;
import client.MaplePet;
import net.AbstractMaplePacketHandler;
import server.MapleInventoryManipulator;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import server.CashItemFactory;
import server.CashItemInfo;
import server.MapleItemInformationProvider;

/**
 *
 * @author NIGHTCOFFEE based on Acrylic
 */
public class BuyCSItemHandler extends AbstractMaplePacketHandler {

    public static int[] BLOCKED_ITEMS = new int[]{
        5211037,
        5211038,
        5211039,
        5211040,
        5211041,
        5211042,
        5211043,
        5211044,
        5211045,
        5211046,
        5211047,
        5211048,
        5360042
    };

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (slea.readByte() != 3) {
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.enableCSUse1());
            c.getSession().write(MaplePacketCreator.enableCSUse2());
            c.getSession().write(MaplePacketCreator.enableCSUse3());
            return;
        }
        slea.skip(1);
        int way = slea.readByte();
        slea.skip(3);
        int snCS = slea.readInt();
        slea.skip(1);
        CashItemInfo item = CashItemFactory.getItem(snCS);
        if (!c.getPlayer().inCS() || c.getPlayer().getCSPoints(way) < 0 || c.getPlayer().getCSPoints(way) < item.getPrice()) {
            c.getPlayer().ban("Trying to packet edit.");
        }
        if (contains(BLOCKED_ITEMS, item.getId())) {
            c.getSession().write(MaplePacketCreator.serverNotice(1, "This item has been blocked from the Cash Shop."));
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.enableCSUse1());
            c.getSession().write(MaplePacketCreator.enableCSUse2());
            c.getSession().write(MaplePacketCreator.enableCSUse3());
            return;
        }
        if (item.getId() >= 5000000 && item.getId() <= 5000100) {
            MapleInventoryManipulator.addById(c, item.getId(), (short) item.getCount(), "Cash Item was purchased.", null, MaplePet.createPet(item.getId()));
        } else {
            MapleInventoryManipulator.addFromDrop(c, getItemFromCashInfo(item), null);
            // MapleInventoryManipulator.addById(c, item.getId(), (short) item.getCount(), "Cash Item was purchased.");
        }
        c.getSession().write(MaplePacketCreator.showBoughtCSItem(item.getId()));
        c.getPlayer().modifyCSPoints(way, -item.getPrice());
        c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
        c.getSession().write(MaplePacketCreator.enableCSorMTS());
        c.getSession().write(MaplePacketCreator.enableCSUse1());
        c.getSession().write(MaplePacketCreator.enableCSUse2());
        c.getSession().write(MaplePacketCreator.enableCSUse3());
    }

    public IItem getItemFromCashInfo(CashItemInfo cii) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventoryType mit = ii.getInventoryType(cii.getId());
        long wtf = Long.valueOf(cii.getPeriod());
        long add = 1000L * 60L * 60L * 24L * wtf;
        if (cii.getId() == 5211048 || cii.getId() == 5360042) {
            add = 1000L * 60L * 60L * 4L;
        }
        if (mit.equals(MapleInventoryType.EQUIP)) {
            IItem ret = ii.getEquipById(cii.getId());
            ret.setExpiration(System.currentTimeMillis() + add);
            return ret;
        } else {
            IItem nItem = new Item(cii.getId(), (byte) -1, (short) cii.getCount());
            nItem.setExpiration(System.currentTimeMillis() + add);
            return nItem;
        }
    }

    private boolean contains(int[] b, int id) {
        for (int i : b) {
            if (i == id) {
                return true;
            }
        }
        return false;
    }
}