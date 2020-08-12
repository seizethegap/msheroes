/*
 * This file was designed for Titanium.
 * Do not redistribute without explicit permission from the
 * developer(s).
 */
package net.login;

import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IdleStatus;
import org.apache.mina.common.IoHandlerAdapter;
import org.apache.mina.common.IoSession;
import org.apache.mina.common.SimpleByteBufferAllocator;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericSeekableLittleEndianAccessor;
import tools.data.input.SeekableLittleEndianAccessor;

public class AuthServerHandler extends IoHandlerAdapter {

    private final static int SEVENBITS = 0x0000007f;
    private final static int SIGNBIT = 0x00000080;
    
    @Override
    public void sessionOpened(IoSession session) throws Exception {
        System.out.println("[AuthServer] : Session with IP " + session.getRemoteAddress().toString() + " opened.");
        session.setIdleTime(IdleStatus.READER_IDLE, 30);
        session.setIdleTime(IdleStatus.WRITER_IDLE, 30);
    }

    @Override
    public void messageReceived(IoSession session, Object message) throws Exception {
        org.apache.mina.common.ByteBuffer content = (org.apache.mina.common.ByteBuffer) message;
        byte[] lol = content.array();
        SeekableLittleEndianAccessor slea = new GenericSeekableLittleEndianAccessor(new ByteArrayByteStream(lol));
        String msg = slea.readAsciiString(10);
        System.out.println("[AuthServer] : Session with IP " + session.getRemoteAddress().toString() + " sent message: " + msg);
        if (msg.contains("ip addauth")) {
            org.apache.mina.common.ByteBuffer buf = ByteBuffer.allocate(13);
            write7BitInt("sessionok".length(), buf);
            buf.put("sessionok".getBytes());
            session.write(buf);
            System.out.println("[AuthServer] : SessionOK sent to " + session.getRemoteAddress().toString());
            LoginServer.getInstance().addAuthIp(session.getRemoteAddress().toString().split(":")[0]);
        }
    }
    
    private void write7BitInt(int value, ByteBuffer mplew) {
        int intValue = value;

        if ((intValue & 0xffffff80) == 0) {
            mplew.put((byte) (intValue & SEVENBITS));
            return;
        }
        mplew.put((byte) ((intValue & SEVENBITS) | SIGNBIT));

        if ((intValue & 0xffffc000) == 0) {
            mplew.put((byte) ((intValue >>> 7) & SEVENBITS));
            return;
        }
        mplew.put((byte) (((intValue >>> 7) & SEVENBITS) | SIGNBIT));

        if ((intValue & 0xffe00000) == 0) {
            mplew.put((byte) ((intValue >>> 14) & SEVENBITS));
            return;
        }
        mplew.put((byte) (((intValue >>> 14) & SEVENBITS) | SIGNBIT));

        if ((intValue & 0xf0000000) == 0) {
            mplew.put((byte) ((intValue >>> 21) & SEVENBITS));
            return;
        }
        mplew.put((byte) (((intValue >>> 21) & SEVENBITS) | SIGNBIT));

        mplew.put((byte) ((intValue >>> 28) & SEVENBITS));
    }
}
