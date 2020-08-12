package scripting.npc;

import client.MapleCharacter;

public interface NPCScript {
    public void start();
    public void start(MapleCharacter chr);
    public void start(boolean rules);
    public void action(byte mode, byte type, int selection);
}
