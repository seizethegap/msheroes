package net.channel.handler;

import java.awt.Point;

import java.util.concurrent.ScheduledFuture;

import client.ISkill;
import client.MapleCharacter.CancelCooldownAction;
import client.MapleClient;
import client.SkillFactory;
import client.anticheat.CheatingOffense;
import client.messages.ServernoticeMapleClientMessageCallback;
import net.AbstractMaplePacketHandler;
import server.AutobanManager;
import server.MapleStatEffect;
import server.TimerManager;
import server.life.MapleMonster;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public class SpecialMoveHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        short oldX = slea.readShort();
        short oldY = slea.readShort();
        if (c.getPlayer() == null || !c.getPlayer().canSkill) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int skillid = slea.readInt();
        Point pos = null;
        int __skillLevel = slea.readByte();
        ISkill skill = SkillFactory.getSkill(skillid);
        int skillLevel = c.getPlayer().getSkillLevel(skill);
        MapleStatEffect effect = skill.getEffect(skillLevel);
        if (effect.getCooldown() > 0) {
            if (c.getPlayer().skillisCooling(skillid)) {
                c.getPlayer().getCheatTracker().registerOffense(CheatingOffense.COOLDOWN_HACK);
                return;
            } else {
                c.getSession().write(MaplePacketCreator.skillCooldown(skillid, effect.getCooldown()));
                ScheduledFuture<?> timer = TimerManager.getInstance().schedule(new CancelCooldownAction(c.getPlayer(), skillid), effect.getCooldown() * 1000);
                c.getPlayer().addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown() * 1000, timer);
            }
        }
        if (skillid == 1121001 || skillid == 1221001 || skillid == 1321001) { // Monster Magnet
            int num = slea.readInt();
            int mobId;
            byte success;
            for (int i = 0; i < num; i++) {
                mobId = slea.readInt();
                success = slea.readByte();
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showMagnet(mobId, success), false);
                MapleMonster monster = c.getPlayer().getMap().getMonsterByOid(mobId);
                if (monster != null) {
                    monster.switchController(c.getPlayer(), monster.isControllerHasAggro());
                }
            }
            byte direction = slea.readByte();
            c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showBuffeffect(c.getPlayer().getId(), skillid, 1, direction), false);
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (slea.available() == 5) {
            pos = new Point(slea.readShort(), slea.readShort());
        }
        if (skillLevel == 0 || skillLevel != __skillLevel) {
            AutobanManager.getInstance().addPoints(c.getPlayer().getClient(), 1000, 0, "Using a move skill he doesn't have (" + skill.getId() + ")");
            return;
        } else {
            if (c.getPlayer().isAlive()) {
                if (skill.getId() != 2311002 || c.getPlayer().canDoor()) {
                    skill.getEffect(skillLevel).applyTo(c.getPlayer(), pos);
                } else {
                    new ServernoticeMapleClientMessageCallback(5, c).dropMessage("Please wait 5 seconds before casting Mystic Door again");
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        }
    }
}