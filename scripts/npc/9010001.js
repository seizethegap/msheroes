importPackage(Packages.client);

var buffs = [4101004, 2311003, 2301004, 1301007, 2001002];

function start() {
	if (cm.getMapId() != 209000002) {
		cm.sendOk("You're not a donator.");
		cm.dispose();
		return;
	} else
		cm.sendSimple("Hi, which buff would you like?\r\n#r#eThese buffs cost 200,000 mesos each.\r\n\r\n#L0##fSkill/410.img/skill/4101004/icon##l\r\n" +
			"#L1##fSkill/231.img/skill/2311003/icon##l\r\n" +
			"#L2##fSkill/230.img/skill/2301004/icon##l\r\n" + 
			"#L3##fSkill/130.img/skill/1301007/icon##l\r\n" +
			"#L4##fSkill/200.img/skill/2001002/icon##l\r\n");
}

function action(m, t, s) {
	if (m < 1) {
		cm.dispose();
		return;
	}
	var skill = SkillFactory.getSkill(buffs[s]);
	if (cm.getMapId() != 209000002) {
		cm.sendOk("You're not a donator.");
		cm.dispose();
		return;
	}
	if (cm.getMeso() < 200000) {
		cm.sendOk("You don't have enough mesos!");
		cm.dispose();
		return;
	} 
	cm.gainMeso(-200000);
	skill.getEffect(skill.getMaxLevel()).applyTo(cm.getPlayer(), cm.getPlayer().getPosition());
	cm.dispose();
}