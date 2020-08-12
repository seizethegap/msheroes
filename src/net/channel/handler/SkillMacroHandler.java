package net.channel.handler;

import client.MapleClient;
import client.SkillMacro;
import tools.data.input.SeekableLittleEndianAccessor;
import net.AbstractMaplePacketHandler;

public class SkillMacroHandler extends AbstractMaplePacketHandler {

    public SkillMacroHandler() {
    }

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        for (int i = 0; i < slea.readByte(); i++) {
            String name = slea.readMapleAsciiString();
            int shout = slea.readByte();
            int skill1 = slea.readInt();
            int skill2 = slea.readInt();
            int skill3 = slea.readInt();
            c.getPlayer().updateMacros(i, new SkillMacro(skill1, skill2, skill3, name, shout, i));
        }
    }
}