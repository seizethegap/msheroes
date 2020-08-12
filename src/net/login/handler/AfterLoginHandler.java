package net.login.handler;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AfterLoginHandler extends AbstractMaplePacketHandler {

//    private static Logger log = LoggerFactory.getLogger(AfterLoginHandler.class);
//
//    @Override
//    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
//        byte c2 = slea.readByte();
//        byte c3 = slea.readByte();
//        if (c2 == 1 && c3 == 1) {
//            // Official requests the pin here - but pins suck so we just accept
//            c.getSession().write(MaplePacketCreator.pinAccepted());
//        } else if (c2 == 1 && c3 == 0) {
//            slea.seek(8);
//            String pin = slea.readMapleAsciiString();
//            log.info("Received Pin: " + pin);
//            if (pin.equals("1234")) {
//                c.getSession().write(MaplePacketCreator.pinAccepted());
//            } else {
//                c.getSession().write(MaplePacketCreator.requestPinAfterFailure());
//            }
//        }
//    }
    private static Logger log = LoggerFactory.getLogger(AfterLoginHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte c2 = slea.readByte();
        byte c3 = 5;
        try {
            c3 = slea.readByte();
        } catch (java.lang.ArrayIndexOutOfBoundsException e) {
            //To prevent console from being spammed when user cancels pin 
        }
        if (c2 == 1 && c3 == 1) {
            // Official requests the pin here 
            if (c.getPin() == null) {
                c.getSession().write(MaplePacketCreator.registerPin());
            } else if (c.getPin() != null) {
                c.getSession().write(MaplePacketCreator.requestPin());
            }
        } else if (c2 == 1 && c3 == 0) {
            slea.seek(8);
            String pin = slea.readMapleAsciiString();
            if (pin.equals(c.getPin())) {
                c.getSession().write(MaplePacketCreator.pinAccepted());
            } else {
                c.getSession().write(MaplePacketCreator.requestPinAfterFailure());
            }
        } else if (c2 == 2 && c3 == 0) {
            slea.seek(8);
            String pin = slea.readMapleAsciiString();
            if (pin.equals(c.getPin())) {
                c.getSession().write(MaplePacketCreator.registerPin());
            } else {
                c.getSession().write(MaplePacketCreator.requestPinAfterFailure());
            }
        } else if (c2 == 0 && c3 == 5) {
            //Client is canceling pin, reset the login 
            c.updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN);
        } else {
            // abort login attempt 
        }
    }
}
