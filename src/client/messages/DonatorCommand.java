package client.messages;

import java.util.HashMap;
import client.MapleCharacter;
import client.MapleCharacterUtil;
import client.MapleClient;
import client.SkillFactory;
import static client.messages.PlayerCommand.blockedmap;
import net.channel.ChannelServer;
import scripting.npc.NPCScriptManager;

/**
 * @author Moogra
 */
public class DonatorCommand {

    public static boolean executeDonatorCommand(MapleClient c, MessageCallback mc, String line) {
        MapleCharacter player = c.getPlayer();
        ChannelServer cserv = c.getChannelServer();
        String[] splitted = line.split(" ");
        if (splitted[0].equals("!unlog")) {
            player.setLogged();
            mc.dropMessage("Done");
        } else if (splitted[0].equals("!cody")) {
            NPCScriptManager.getInstance().dispose(c);
            NPCScriptManager.getInstance().start(c, 9200000, null, null);
        } else if (splitted[0].equals("!donator")) {
            for (int i : blockedmap) {
                if (player.getMapId() == i) {
                    mc.dropMessage("You may not sure this command at this location.");
                    return true;
                }
            }
            NPCScriptManager.getInstance().dispose(c);
            NPCScriptManager.getInstance().start(c, 9201101, null, null);
        } else {
            if (c.getPlayer().gmLevel() == 1) {
                mc.dropMessage("Donator Command " + splitted[0] + " does not exist");
            }
            return false;
        }
        return true;
    }
}
