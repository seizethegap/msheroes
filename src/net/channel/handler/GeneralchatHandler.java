package net.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.messages.CommandProcessor;
import net.AbstractMaplePacketHandler;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class GeneralchatHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter player = c.getPlayer();
        if (!player.getCanTalk()) {
            player.dropMessage("Your chat has been disabled");
            return;
        }
        String text = slea.readMapleAsciiString();
        if (!CommandProcessor.processCommand(c, text)) {
            player.getMap().broadcastMessage(MaplePacketCreator.getChatText(player.getId(), text, player.gmLevel() > 2 && player.getGMChat() && c.getChannelServer().allowGmWhiteText(), slea.readByte()));

            if (c.getPlayer().getWatcher() != null) {
                c.getPlayer().getWatcher().dropMessage("[" + c.getPlayer().getName() + " All] : " + text);
            }  

        }
    }
}