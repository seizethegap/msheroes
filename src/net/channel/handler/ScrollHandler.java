package net.channel.handler;

import java.util.List;

import client.IEquip;
import client.IItem;
import client.InventoryException;
import client.ISkill;
import client.Item;
import client.MapleClient;
import client.MapleInventory;
import client.MapleInventoryType;
import client.SkillFactory;
import client.IEquip.ScrollResult;
import net.AbstractMaplePacketHandler;
import server.AutobanManager;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 * @author Matze
 * @author Frz
 */
public class ScrollHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readInt();
        byte slot = (byte) slea.readShort();
        byte dst = (byte) slea.readShort();
        byte ws = (byte) slea.readShort();
        boolean whiteScroll = false; // white scroll being used?
        boolean legendarySpirit = false; // legendary spirit skill
        if ((ws & 2) == 2) {
            whiteScroll = true;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IEquip toScroll;
        if (dst < 0) {
            toScroll = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
        } else {
            legendarySpirit = true;
            toScroll = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(dst);
        }
        byte oldLevel = toScroll.getLevel();
        byte oldSlots = toScroll.getUpgradeSlots();
        if (((IEquip) toScroll).getUpgradeSlots() < 1) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            return;
        }
        MapleInventory useInventory = c.getPlayer().getInventory(MapleInventoryType.USE);
        IItem scroll = useInventory.getItem(slot);
        IItem wscroll = null;
        List<Integer> scrollReqs = ii.getScrollReqs(scroll.getItemId());
        if (scrollReqs.size() > 0 && !scrollReqs.contains(toScroll.getItemId())) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            return;
        }
        if (whiteScroll) {
            wscroll = useInventory.findById(2340000);
            if (wscroll == null || wscroll.getItemId() != 2340000) {
                whiteScroll = false;
                return;
            }
        }
        if (scroll.getItemId() != 2049100 && !ii.isCleanSlate(scroll.getItemId())) {
            if (!ii.canScroll(scroll.getItemId(), toScroll.getItemId())) {
                return;
            }
        }
        if (scroll.getQuantity() <= 0) {
            throw new InventoryException("<= 0 quantity when scrolling");
        }
        boolean isGM = c.getPlayer().isGM();
        IEquip scrolled = (IEquip) ii.scrollEquipWithId(toScroll, scroll.getItemId(), whiteScroll, isGM);
        ScrollResult scrollSuccess = IEquip.ScrollResult.FAIL; // fail
        if (scrolled == null) {
            scrollSuccess = IEquip.ScrollResult.CURSE;
        } else if (scrolled.getLevel() > oldLevel || (ii.isCleanSlate(scroll.getItemId()) && scrolled.getUpgradeSlots() == oldSlots + 1)) {
            scrollSuccess = IEquip.ScrollResult.SUCCESS;
        }
        useInventory.removeItem(scroll.getPosition(), (short) 1, false);
        if (whiteScroll) {
            useInventory.removeItem(wscroll.getPosition(), (short) 1, false);
            if (wscroll.getQuantity() < 1) {
                c.getSession().write(MaplePacketCreator.clearInventoryItem(MapleInventoryType.USE, wscroll.getPosition(), false));
            } else {
                c.getSession().write(MaplePacketCreator.updateInventorySlot(MapleInventoryType.USE, (Item) wscroll));
            }
        }
        if (scrollSuccess == IEquip.ScrollResult.CURSE) {
            c.getSession().write(MaplePacketCreator.scrolledItem(scroll, toScroll, true));
            if (dst < 0) {
                c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeItem(toScroll.getPosition());
            } else {
                c.getPlayer().getInventory(MapleInventoryType.EQUIP).removeItem(toScroll.getPosition());
            }
        } else {
            c.getSession().write(MaplePacketCreator.scrolledItem(scroll, scrolled, false));
        }
        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getScrollEffect(c.getPlayer().getId(), scrollSuccess, legendarySpirit));
        ISkill LS = SkillFactory.getSkill(1003);
        int LSLevel = c.getPlayer().getSkillLevel(LS);
        if (legendarySpirit && LSLevel <= 0) {
            AutobanManager.getInstance().addPoints(c.getPlayer().getClient(), 50, 120000, "using the skill Legendary Spirit without the skill");
            return;
        }
        if (dst < 0 && (scrollSuccess == IEquip.ScrollResult.SUCCESS || scrollSuccess == IEquip.ScrollResult.CURSE)) {
            c.getPlayer().equipChanged();
        }
    }
}