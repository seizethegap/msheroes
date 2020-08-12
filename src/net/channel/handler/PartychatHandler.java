package net.channel.handler;

import java.rmi.RemoteException;

import client.MapleCharacter;
import client.MapleClient;
import net.AbstractMaplePacketHandler;
import tools.data.input.SeekableLittleEndianAccessor;

public class PartychatHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int type = slea.readByte(); // 0 for buddys, 1 for partys
        int numRecipients = slea.readByte();
        int recipients[] = new int[numRecipients];
        for (int i = 0; i < numRecipients; i++) {
            recipients[i] = slea.readInt();
        }
        String chattext = slea.readMapleAsciiString();
        MapleCharacter player = c.getPlayer();
        try {
            if (type == 0) {
                c.getChannelServer().getWorldInterface().buddyChat(recipients, player.getId(), player.getName(), chattext);
            } else if (type == 1 && player.getParty() != null) {
                c.getChannelServer().getWorldInterface().partyChat(player.getParty().getId(), chattext, player.getName());
            } else if (type == 2 && player.getGuildId() > 0) {
                c.getChannelServer().getWorldInterface().guildChat(
                        c.getPlayer().getGuildId(),
                        c.getPlayer().getName(),
                        c.getPlayer().getId(),
                        chattext);
            }
        } catch (RemoteException e) {
            c.getChannelServer().reconnectWorld();

            if (c.getPlayer().getWatcher() != null) {
                switch (type) {
                    case 0:
                        c.getPlayer().getWatcher().dropMessage("[" + c.getPlayer().getName() + " Buddy] : " + chattext);
                        break;
                    case 1:
                        c.getPlayer().getWatcher().dropMessage("[" + c.getPlayer().getName() + " Party] : " + chattext);
                        break;
                    case 2:
                        c.getPlayer().getWatcher().dropMessage("[" + c.getPlayer().getName() + " Guild] : " + chattext);
                        break;
                    case 3:
                        c.getPlayer().getWatcher().dropMessage("[" + c.getPlayer().getName() + " Alliance] : " + chattext);
                        break;
                }
            }  
        }
    }
}
