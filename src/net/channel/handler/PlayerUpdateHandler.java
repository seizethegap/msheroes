package net.channel.handler;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Mats
 */

public class PlayerUpdateHandler extends AbstractMaplePacketHandler {

	@Override
	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
		try {
			c.getPlayer().saveToDB (true);
		} catch (Exception ex) {
			org.slf4j.LoggerFactory.getLogger(PlayerUpdateHandler.class).error("Error updating player", ex);
		}
	}
}
