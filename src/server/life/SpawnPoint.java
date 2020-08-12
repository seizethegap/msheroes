package server.life;

import java.awt.Point;
import java.util.concurrent.atomic.AtomicInteger;
import client.MapleCharacter;
import server.maps.MapleMap;

public class SpawnPoint {

    private MapleMonster monster;
    private Point pos;
    private long nextPossibleSpawn;
    private int mobTime;
    private AtomicInteger spawnedMonsters = new AtomicInteger(0);
    private boolean immobile;

    public SpawnPoint(MapleMonster monster, Point pos, int mobTime) {
        super();
        this.monster = monster;
        this.pos = new Point(pos);
        this.mobTime = mobTime * 2;
        this.immobile = !monster.isMobile();
        this.nextPossibleSpawn = System.currentTimeMillis();
    }

    public boolean shouldSpawn() {
        return shouldSpawn(System.currentTimeMillis());
    }

    boolean shouldSpawn(long now) {
        if (mobTime < 0) {
            return false;
        }
        if (((mobTime != 0 || immobile) && spawnedMonsters.get() > 0) || spawnedMonsters.get() > 0) {
            return false;
        }
        return nextPossibleSpawn <= now;
    }

    /**
     * Spawns the monster for this spawnpoint. Creates a new MapleMonster instance for that and returns it.
     *
     * @param mapleMap
     * @return
     */
    public MapleMonster spawnMonster(MapleMap mapleMap) {
        MapleMonster mob = new MapleMonster(monster);
        mob.setPosition(new Point(pos));
        spawnedMonsters.incrementAndGet();
        mob.addListener(new MonsterListener() {

            @Override
            public void monsterKilled(MapleMonster monster, MapleCharacter highestDamageChar) {
                nextPossibleSpawn = System.currentTimeMillis();
                if (mobTime > 0) {
                    nextPossibleSpawn += mobTime * 2 * 1000;
                } else {
                    nextPossibleSpawn += monster.getAnimationTime("die1") + 5000;
                }
                spawnedMonsters.decrementAndGet();
            }
        });
        mapleMap.spawnMonster(mob);
        if (mobTime == 0) {
            nextPossibleSpawn = System.currentTimeMillis() + 10000;
        }
        return mob;
    }
}