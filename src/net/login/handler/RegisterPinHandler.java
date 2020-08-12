package net.login.handler;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import net.login.handler.AfterLoginHandler;
import org.slf4j.LoggerFactory;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class RegisterPinHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = LoggerFactory.getLogger(AfterLoginHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte c2 = slea.readByte();
        if (c2 == 0) {
            c.updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN);
        } else {
            String pin = slea.readMapleAsciiString();

            if (pin != null) {
                c.setPin(pin);
                c.getSession().write(MaplePacketCreator.pinRegistered());
                c.updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN); //Restart login attempt when pin is assigned 
            }
        }
    }
}
