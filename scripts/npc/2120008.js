importPackage(Packages.client);

var buffs = [4101004, 2311003, 2301004, 1301007, 2001002];

function start() {
	if (cm.getMapId() != 209000002) {
		cm.sendOk("This feature is donator-exclusive.");
		cm.dispose();
		return;
	} else
		cm.sendSimple("Hello there, I am selling buffs. The prices for the buffs are #r100,000 mesos#k or #r50,000 mesos#k each if you are under level 50.\r\n\r\n#L0##fSkill/410.img/skill/4101004/icon##l" +
			"#L1##fSkill/231.img/skill/2311003/icon##l" +
			"#L2##fSkill/230.img/skill/2301004/icon##l" + 
			"#L3##fSkill/130.img/skill/1301007/icon##l" +
			"#L4##fSkill/200.img/skill/2001002/icon##l");
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
	if (cm.getMeso() < 90000) {
		cm.sendOk("You do not have enough mesos.");
		cm.dispose();
		return;
	} 
	if (cm.getPlayer().getLevel() >= 50)
		cm.gainMeso(-90000);
	else
		cm.gainMeso(-50000);
	skill.getEffect(skill.getMaxLevel()).applyTo(cm.getPlayer(), cm.getPlayer().getPosition());
	cm.dispose();
}