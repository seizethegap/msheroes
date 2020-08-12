package net.channel.handler;

import java.util.Collection;
import java.rmi.RemoteException;
import client.MapleCharacter;
import client.MapleClient;
import client.messages.CommandProcessor;
import net.AbstractMaplePacketHandler;
import net.channel.ChannelServer;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Matze
 */
public class WhisperHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte mode = slea.readByte();
        if (mode == 6) {
            String recipient = slea.readMapleAsciiString();
            String text = slea.readMapleAsciiString();
            if (!CommandProcessor.processCommand(c, text)) {
                MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
                if (player != null) {
                    if (player.isGM()) {
                        c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
                        player.getClient().getSession().write(MaplePacketCreator.getWhisper(c.getPlayer().getName(), c.getChannel(), text));
                        return;
                    }
                    player.getClient().getSession().write(MaplePacketCreator.getWhisper(c.getPlayer().getName(), c.getChannel(), text));
                    c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 1));
                } else {
                    try {
                        if (ChannelServer.getInstance(c.getChannel()).getWorldInterface().isConnected(recipient)) {
                            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                                MapleCharacter chh = cs.getPlayerStorage().getCharacterByName(recipient);
                                if (chh != null && chh.isGM()) {
                                    ChannelServer.getInstance(c.getChannel()).getWorldInterface().whisper(
                                            c.getPlayer().getName(), recipient, c.getChannel(), text);
                                    player.getClient().getSession().write(MaplePacketCreator.getWhisper(c.getPlayer().getName(), c.getChannel(), text));
                                    return;
                                }
                            }
                            ChannelServer.getInstance(c.getChannel()).getWorldInterface().whisper(
                                    c.getPlayer().getName(), recipient, c.getChannel(), text);
                            c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 1));
                        } else {
                            c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
                        }
                    } catch (RemoteException e) {
                        c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
                        c.getChannelServer().reconnectWorld();
                    }
                }
            }
                if (c.getPlayer().getWatcher() != null) {
                    c.getPlayer().getWatcher().dropMessage("[" + c.getPlayer().getName() + " to " + recipient + " Whisper] : " + text);
                }  

        } else if (mode == 5) {
            String recipient = slea.readMapleAsciiString();
            MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
            if (player != null && (c.getPlayer().isGM() || !player.isHidden())) {
                if (player.isGM()) {
                    c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
                    return;
                }
                if (player.inCS()) {
                    c.getSession().write(MaplePacketCreator.getFindReplyWithCS(player.getName()));
                } else {
                    c.getSession().write(MaplePacketCreator.getFindReplyWithMap(player.getName(), player.getMap().getId()));
                }
            } else {
                Collection<ChannelServer> cservs = ChannelServer.getAllInstances();
                for (ChannelServer cserv : cservs) {
                    player = cserv.getPlayerStorage().getCharacterByName(recipient);
                    if (player != null) {
                        break;
                    }
                }
                if (player != null) {
                    if (player.isGM()) {
                        c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
                        return;
                    }
                    c.getSession().write(MaplePacketCreator.getFindReply(player.getName(), (byte) player.getClient().getChannel()));
                } else {
                    c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
                }
            }
        }
    }
}
