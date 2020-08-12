/*
	Maple Administrator
	Coded by Saint
	NostalgicMS
*/

var rules = false;
var status = -1;

function start(b) {
	if (b == null || b == false) {
		rules = false;
	} else {
		rules = true;
	}
	action(1, 0, 0);
}

function action(m, t, s) {
	if (rules) {
		status++;
		if (status == 0) 
			cm.sendAcceptDecline("Hello and welcome to #bNostalgicMS#k! Once you leave this area, you will be obligated to follow and respect these rules as they govern this server.\r\n\r\n#eThird party tools,#n\r\nUsing third party tools to modify the client memory or server memory is strictly prohibited. Doing so will result in you being forced to cease use of this server immediately.\r\n\r\n#eAbusing exploits,#n\r\nOne shall not abuse available exploits at NostalgicMS. Instead, they shall be reported to Thomas or Saint. They may also be reported on the forums.\r\n\r\n#eMulti-client,#n\r\nEvery individual are allowed up to two accounts each. They may be used at the same time for leeching or in any situation that you consider that it seems fit. If a staff member disagree, you will be warned.\r\n\r\nThese terms of use may be changed at any point in time and you will always be obligated to follow them.");
		else if (status == 1 && m != 1) 
			cm.sendAcceptDecline("Are you sure that you don't want to accept the Terms of Use? If you do not accept them, you will not be allowed to play.");
		else if (status == 1 && m == 1) {
			cm.getPlayer().rules = true;
			cm.sendOk("Enjoy your stay here at #bNostalgicMS#k!");
			cm.dispose();
		} else if (status == 2 && m != 1) {
			cm.getPlayer().getClient().getSession().close();
			return;
		}
	} else {
		cm.sendOk("Check out the event schedule at #bwww.nostalgicms.org#k.");
		cm.dispose();
	}
}