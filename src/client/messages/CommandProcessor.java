package client.messages;

import java.lang.management.ManagementFactory;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import javax.management.MBeanServer;
import javax.management.ObjectName;
import client.MapleCharacter;
import client.MapleClient;
import database.DatabaseConnection;
import net.channel.ChannelServer;
import net.channel.handler.GeneralchatHandler;
import server.TimerManager;
import server.maps.MapleMap;
import tools.MockIOSession;
import tools.Pair;

public class CommandProcessor implements CommandProcessorMBean {

    private static CommandProcessor instance = new CommandProcessor();
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(GeneralchatHandler.class);
    private static List<Pair<MapleCharacter, String>> gmlog = new LinkedList<Pair<MapleCharacter, String>>();
    private static Runnable persister;


    static {
        persister = new PersistingTask();
        TimerManager.getInstance().register(persister, 62000);
    }

    public static CommandProcessor getInstance() {
        return instance;
    }

    private CommandProcessor() {
    }

    public static class PersistingTask implements Runnable {

        @Override
        public void run() {
            synchronized (gmlog) {
                Connection con = DatabaseConnection.getConnection();
                try {
                    PreparedStatement ps = con.prepareStatement("INSERT INTO gmlog (cid, command) VALUES (?, ?)");
                    for (Pair<MapleCharacter, String> logentry : gmlog) {
                        ps.setInt(1, logentry.getLeft().getId());
                        ps.setString(2, logentry.getRight());
                        ps.executeUpdate();
                    }
                    ps.close();
                } catch (SQLException e) {
                }
                gmlog.clear();
            }
        }
    }

    public static void registerMBean() {
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
        try {
            mBeanServer.registerMBean(instance, new ObjectName("client.messages:name=CommandProcessor"));
        } catch (Exception e) {
            log.error("Error registering CommandProcessor MBean");
        }
    }

    public static boolean processCommand(MapleClient c, String line) {
        return processCommandInternal(c, new ServernoticeMapleClientMessageCallback(c), line);
    }

    public String processCommandJMX(int cserver, int mapid, String command) {
        ChannelServer cserv = ChannelServer.getInstance(cserver);
        if (cserv == null) {
            return "The specified channel Server does not exist in this serverprocess";
        }
        MapleClient c = new MapleClient(null, null, new MockIOSession());
        MapleCharacter chr = MapleCharacter.getDefault(c, 26023);
        c.setPlayer(chr);
        chr.setName("/---------jmxuser-------------\\");
        MapleMap map = cserv.getMapFactory().getMap(mapid);
        if (map != null) {
            chr.setMap(map);
            map.addPlayer(chr);
        }
        cserv.addPlayer(chr);
        MessageCallback mc = new StringMessageCallback();
        try {
            processCommandInternal(c, mc, command);
        } finally {
            if (map != null) {
                map.removePlayer(chr);
            }
            cserv.removePlayer(chr);
        }
        return mc.toString();
    }

    private static boolean processCommandInternal(MapleClient c, MessageCallback mc, String line) {
        int gm = c.getPlayer().gmLevel();
        if (line.charAt(0) == '!' && gm > 0) {
            if (c.getPlayer().isLogged() && gm > 1) {
                synchronized (gmlog) {
                    gmlog.add(new Pair<MapleCharacter, String>(c.getPlayer(), line));
                }
            }
            if (gm > 0) {
                if (DonatorCommand.executeDonatorCommand(c, mc, line)) {
                    return true;
                }
            }
            if (gm > 1) {
                if (InternCommand.executeInternCommand(c, mc, line)) {
                    return true;
                }
            }
            if (gm > 2) {
                if (GMCommand.executeGMCommand(c, mc, line)) {
                    return true;
                }
            }
            if (gm > 3) {
                if (SuperCommand.executeSuperCommand(c, mc, line)) {
                    return true;
                }
            }
            if (gm > 4) {
                if (AdminCommand.executeAdminCommand(c, mc, line, log, gmlog, persister)) {
                    return true;
                }
            }
            return false;
        } else if (line.charAt(0) == '@') {
            return gm > -1 && PlayerCommand.executePlayerCommand(c, mc, line);
        }
        return false;
    }
}
