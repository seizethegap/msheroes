package net.channel.handler;

import client.MapleClient;
import client.MaplePet;
import client.anticheat.CheatingOffense;
import net.AbstractMaplePacketHandler;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.maps.MapleMapItem;
import server.maps.MapleMapObject;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleInventoryType;

/**
 *
 * @author Raz This file is made by TheRamon Raz has mentioned to me that he
 * DOES NOT want this to be released so please do not. FMS only.
 */
public class PetLootHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (c.getPlayer().getNoPets() == 0) {
            return;
        }
        MaplePet pet = c.getPlayer().getPet(c.getPlayer().getPetIndex(slea.readInt()));
        slea.skip(13);
        int oid = slea.readInt();
        MapleMapObject ob = c.getPlayer().getMap().getMapObject(oid);
        if (ob == null || pet == null) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            return;
        }
        if (ob instanceof MapleMapItem) {
            if (c.getPlayer().getMapId() >= 209000001 && c.getPlayer().getMapId() <= 209000015) {
                MapleMapItem mapitem = (MapleMapItem) ob;
                if (mapitem.getDropper() == c.getPlayer()) {
                    if (MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), "", false)) {
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 2, c.getPlayer().getId()), mapitem.getPosition());
                        c.getPlayer().getCheatTracker().pickupComplete();
                        c.getPlayer().getMap().removeMapObject(ob);
                    } else {
                        c.getPlayer().getCheatTracker().pickupComplete();
                        return;
                    }
                    mapitem.setPickedUp(true);
                } else {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    c.getSession().write(MaplePacketCreator.getShowInventoryFull());
                    return;
                }
                return;
            }
            MapleMapItem mapitem = (MapleMapItem) ob;
            synchronized (mapitem) {
                if (mapitem.isPickedUp()) {
                    c.getSession().write(MaplePacketCreator.getInventoryFull());
                    return;
                }
                double distance = pet.getPos().distanceSq(mapitem.getPosition());
                c.getPlayer().getCheatTracker().checkPickupAgain();
                if (distance > 90000.0) {
                    c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.ITEMVAC);
                } else if (distance > 22500.0) {
                    c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.SHORT_ITEMVAC);
                }
                if (mapitem.getMeso() > 0) {
                    if (c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).findById(1812000) != null) { //Something weird about this item
                        c.getPlayer().gainMeso(mapitem.getMeso(), true, true);
                        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 5, c.getPlayer().getId(), true, c.getPlayer().getPetIndex(pet)), mapitem.getPosition());
                        c.getPlayer().getCheatTracker().pickupComplete();
                        c.getPlayer().getMap().removeMapObject(ob);
                    } else {
                        c.getPlayer().getCheatTracker().pickupComplete();
                        mapitem.setPickedUp(false);
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    }
                } else {
                    if (ii.isPet(mapitem.getItem().getItemId())) {
                        if (MapleInventoryManipulator.addById(c, mapitem.getItem().getItemId(), mapitem.getItem().getQuantity(), "Cash Item was purchased.", null)) {
                            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 5, c.getPlayer().getId(), true, c.getPlayer().getPetIndex(pet)), mapitem.getPosition());
                            c.getPlayer().getCheatTracker().pickupComplete();
                            c.getPlayer().getMap().removeMapObject(ob);
                        } else {
                            c.getPlayer().getCheatTracker().pickupComplete();
                            return;
                        }
                    } else {
                        if (MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), "", true)) {
                            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 5, c.getPlayer().getId(), true, c.getPlayer().getPetIndex(pet)), mapitem.getPosition());
                            c.getPlayer().getCheatTracker().pickupComplete();
                            c.getPlayer().getMap().removeMapObject(ob);
                        } else {
                            c.getPlayer().getCheatTracker().pickupComplete();
                            return;
                        }
                    }
                }
                mapitem.setPickedUp(true);
            }
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}