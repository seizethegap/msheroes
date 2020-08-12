/*
 * This file was designed for NostalgicMS.
 * Do not redistribute without explicit permission from the
 * developer(s).
 */
package net.login;

import java.io.IOException;
import java.net.InetSocketAddress;
import static net.login.LoginServer.log;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.SimpleByteBufferAllocator;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;

public class AuthServer {

    private IoAcceptor acceptor;

    public void run() {
        ByteBuffer.setUseDirectBuffers(false);
        ByteBuffer.setAllocator(new SimpleByteBufferAllocator());
        acceptor = new SocketAcceptor();
        SocketAcceptorConfig cfg = new SocketAcceptorConfig();
        int PORT = 8686;
        try {
            acceptor.bind(new InetSocketAddress(8686), new AuthServerHandler(), cfg);
            log.info("Listening on port {}", PORT);
        } catch (IOException e) {
            log.error("Binding to port {} failed", PORT, e);
        }
    }
}
