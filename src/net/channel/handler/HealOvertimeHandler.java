package net.channel.handler;

import client.MapleClient;
import client.SkillFactory;
import client.anticheat.CheatingOffense;
import net.AbstractMaplePacketHandler;
import tools.data.input.SeekableLittleEndianAccessor;

public class HealOvertimeHandler extends AbstractMaplePacketHandler {

	@Override
	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
		slea.readByte();
		slea.readShort();
		slea.readByte();
		int healHP = slea.readShort();
		if (healHP != 0) {
			if (healHP > 140) {
				c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_HP, String.valueOf(healHP));
			}
			c.getPlayer().getCheatTracker().checkHPRegen();
			if (c.getPlayer().getCurrentMaxHp() == c.getPlayer().getHp()) {
				c.getPlayer().getCheatTracker().resetHPRegen();
			}
			c.getPlayer().addHP(healHP);
			c.getPlayer().checkBerserk();
		}
		int healMP = slea.readShort();
		if (healMP != 0) {
			if (healMP > Math.floor(((float)((float)c.getPlayer().getSkillLevel(SkillFactory.getSkill(2000000)) / 10) * c.getPlayer().getLevel()) + 3)) {
				c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_MP, String.valueOf(healMP));
			}
			c.getPlayer().getCheatTracker().checkMPRegen();
			c.getPlayer().addMP(healMP);
			if (c.getPlayer().getCurrentMaxMp() == c.getPlayer().getMp()) {
				c.getPlayer().getCheatTracker().resetMPRegen();
			}
		}
	}
}
