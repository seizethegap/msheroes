importPackage(Packages.client);
var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 3);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis())
        nextTime += 1000*600; //10 min
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
    var Message = new Array("If you didn't know already, you are playing NostalgicMS. :]", "You can gain 6,000 NX per day by voting at the website (nostalgicms.org).", "To see the expiry date of your cash items, talk to Fredrick in the Free Market.", "Cody is trading 2x EXP/Mesos coupons for 1 Vote Point each.", "Head over to Kerning City with your friends and do the Kerning PQ!");
    em.getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(5, "[NostalgicTip] " + Message[Math.floor(Math.random() * Message.length)]));
    var iter = em.getInstances().iterator();
    while (iter.hasNext())
        var eim = iter.next();
}