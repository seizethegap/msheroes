package client.messages;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import net.channel.ChannelServer;
import scripting.npc.NPCScriptManager;
import tools.MaplePacketCreator;
import server.MaplePortal;
import server.maps.MapleMap;
import net.world.remote.WorldChannelInterface;
import server.maps.SavedLocationType;

public class PlayerCommand {

    public static int[] blockedmap = new int[]{109030001, 109030002, 109030003, 109030101, 109030102, 109030103, 109030201, 109030202, 109030203, 109030301, 109030302, 109030303, 109030401, 109030402, 109030403, 109040000, 109040001, 109040002, 109040003, 109040004, 109020001, 109050000, 109050001, 109060001};

    public static boolean executePlayerCommand(MapleClient c, MessageCallback mc, String line) {
        MapleCharacter player = c.getPlayer();
        String[] splitted = line.split(" ");
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("@staff") || splitted[0].equals("@version")) {
            mc.dropMessage("Administrators: Thomas & NetheBell. Coders: Saint & Thomas.");
        } else if (splitted[0].equals("@help") || splitted[0].equals("@commands") || splitted[0].equals("@command")) {
            mc.dropMessage("============================================================");
            mc.dropMessage("                 NostalgicMS Player Commands");
            mc.dropMessage("============================================================");
            mc.dropMessage("@commands / @help   - Show all commands.");
            mc.dropMessage("@callgm   - Sends an assistance request to all available Game Masters.");
            mc.dropMessage("@cody   - Opens chat with Cody.");
            mc.dropMessage("@dispose   - Unstucks your character.");
            mc.dropMessage("@donatorpoints   - Shows how many Donator Points you have.");
            mc.dropMessage("@expfix / @resetexp   - Fixes negative EXP.");
            mc.dropMessage("@fm / @freemarket   - Warps you to the Free Market Entrance.");
            mc.dropMessage("@gmhat   - Gives you a free GM hat.");
            mc.dropMessage("@joinevent   - Will warp you to the Event Map.");
            mc.dropMessage("@leaveevent   - Will warp you back to the Free Market.");
            mc.dropMessage("@save   - Saves your character data.");
            mc.dropMessage("@staff   - Shows the NostalgicMS staff.");
            mc.dropMessage("@stat [amount]   - Adds [amount] str/dex/int/luk.");
            mc.dropMessage("@votepoints   - Shows how many Vote Points you have.");
        } else if (splitted[0].equals("@gmhat") && !player.inBlockedMap()) {
            player.setHp(1);
            player.updateSingleStat(MapleStat.HP, 1);
            player.dropMessage(1, "Heh, you really thought you would get a free GM hat?");
        } else if (splitted[0].equals("@expfix") || splitted[0].equals("@resetexp")) {
            player.setExp(0);
            player.updateSingleStat(MapleStat.EXP, Integer.valueOf(0));
            player.dropMessage(1, "Your EXP has been reset.");
        } else if (splitted[0].equals("@save")) {
            player.saveToDB(true);
            player.dropMessage(1, "Saved successfully!");
        } else if (splitted[0].equals("@votepoints")) {
            mc.dropMessage("You have " + player.getVotePoints() + " Vote Points.");
        } else if (splitted[0].equals("@donatorpoints")) {
            mc.dropMessage("You have " + player.getDonatorPoints() + " Donator Points.");
        } else if (splitted[0].equals("@str") || splitted[0].equals("@int") || splitted[0].equals("@luk") || splitted[0].equals("@dex")) {
            int amount = Integer.parseInt(splitted[1]);
            if (amount > 0 && amount <= player.getRemainingAp() && amount < 31997) {
                if (splitted[0].equals("@str") && amount + player.getStr() < 32001) {
                    player.setStr(player.getStr() + amount);
                    player.updateSingleStat(MapleStat.STR, player.getStr());
                } else if (splitted[0].equals("@int") && amount + player.getInt() < 32001) {
                    player.setInt(player.getInt() + amount);
                    player.updateSingleStat(MapleStat.INT, player.getInt());
                } else if (splitted[0].equals("@luk") && amount + player.getLuk() < 32001) {
                    player.setLuk(player.getLuk() + amount);
                    player.updateSingleStat(MapleStat.LUK, player.getLuk());
                } else if (splitted[0].equals("@dex") && amount + player.getDex() < 32001) {
                    player.setDex(player.getDex() + amount);
                    player.updateSingleStat(MapleStat.DEX, player.getDex());
                } else {
                    mc.dropMessage("Make sure the stat you are trying to raise will not be over 32000.");
                }
                player.setRemainingAp(player.getRemainingAp() - amount);
                player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
            } else {
                mc.dropMessage("Please make sure your AP is not over 32000 and you have enough to distribute.");
            }
        } else if (splitted[0].equals("@callgm")) {
            if (System.currentTimeMillis() - player.lastGMCall < 90000) {
                mc.dropMessage("Sorry, you may only use this command once every 15 minutes.");
                return true;
            }
            StringBuilder sb = new StringBuilder();
            sb.append(c.getPlayer().getName());
            sb.append(" Needs Your Assistance.");
            WorldChannelInterface wci = c.getChannelServer().getWorldInterface();
            try {
                wci.broadcastGMMessage(null, MaplePacketCreator.serverNotice(5, sb.toString()).getBytes());
            } catch (Exception ex) {
            }
            player.dropMessage(1, "Your request will be processed in a few moments.");
            Long now = System.currentTimeMillis();
            player.lastGMCall = now.longValue();

        } else if (splitted[0].equals("@fm") || splitted[0].equals("@freemarket")) {
//            player.saveLocation(SavedLocationType.FREE_MARKET);
//            player.changeMap(cserv.getMapFactory().getMap(910000000), cserv.getMapFactory().getMap(910000000).getPortal(0));     
            for (int i : blockedmap) {
                if (player.getMapId() == i) {
                    mc.dropMessage("You may not use this command at this location.");
                    return true;
                }
            }
            if ((c.getPlayer().getMapId() < 910000000) || (c.getPlayer().getMapId() > 910000022)) {
                mc.dropMessage("You have been warped to the Free Market Entrance.");
                c.getSession().write(MaplePacketCreator.enableActions());
                MapleMap to;
                MaplePortal pto;
                to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(910000000);
                c.getPlayer().saveLocation(SavedLocationType.FREE_MARKET);
                pto = to.getPortal("out00");
                c.getPlayer().changeMap(to, pto);
            } else {
                mc.dropMessage("You can not use this command at this location.");
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else if (splitted[0].equals("@cody")) {
            NPCScriptManager.getInstance().dispose(c);
            NPCScriptManager.getInstance().start(c, 9200000, null, null);
        } else if (splitted[0].equals("@warphere") && player.getKarma() > 4) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (player.isBuddy(MapleCharacter.getIdByName(splitted[1], victim.getWorld())) && !victim.isGM()) {
                victim.changeMap(player.getMap(), player.getMap().findClosestSpawnpoint(player.getPosition()));
            } else {
                mc.dropMessage("Either " + victim + " is not your buddy, or " + victim + " is a GM.");
            }
        } else if (splitted[0].equals("@dispose")) {
            c.getCM().dispose();
            NPCScriptManager.getInstance().dispose(c);
            player.dropMessage(1, "Disposed successfully!");
        } else if (splitted[0].equals("@joinevent")) {
            if (player.getMapId() != 910000000) {
                mc.dropMessage("You may only use this command in the Free Market Entrance.");
                return true;
            }
            MapleMap map = cserv.getMapFactory().getMap(109060001);
            player.changeMap(map, map.getPortal(0));
        } else if (splitted[0].equals("@leaveevent")) {
            if (player.getMapId() != 109050001) {
                mc.dropMessage("You may only use this command in the Leaving the Event map.");
                return true;
            }
            MapleMap map = cserv.getMapFactory().getMap(910000000);
            player.changeMap(map, map.getPortal(0));
        } else {
            player.dropMessage(1, "Invalid syntax!");
            return false;
        }
        return true;
    }
}