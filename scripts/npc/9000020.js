importPackage(Packages.server.maps);

var status = 0;
var goToShowa = false;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("Alright, see you next time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;

		if (cm.getChar().getMapId() == 800000000) {
			if (status == 0) {
					cm.sendSimple("How's the traveling? Are you enjoying it? #b\r\n#L0#Yes, I would like to go back to where I came from.#l \r\n#L1#Umm, I would like to travel to Showa Town.#l");
			} else if (status == 1) {
				if (selection == 0) {
					cm.sendYesNo("So you want to go back to where you came from?");
				} else {
					goToShowa = true;
					cm.sendYesNo("So you want to go to Showa Town?");
				}
			} else if (status == 2) {
				var map;
				if (goToShowa) {
					map = 801000000;
				} else {
					map = cm.getChar().getSavedLocation(SavedLocationType.WORLDTOUR);
					if (map == -1) {
						map = 104000000;
					}
				}
				cm.warp(map, 0);
				cm.dispose();
			}
		} else {
			if (status == 0) {
				cm.sendNext("If you're tired of the monotonous daily life, how about getting out for a change? There's nothing quite like soaking up a new culture, learning something new by the minute! It's time for you to get out an travel. We, at the Maple Travel Agency recommend you going on a #bWorld Tour#k! Are you worried about the travel expense? You shouldn't be! We, the #bMaple Travel Agency#k, have carefully come up with a plan to let you travel for ONLY #b20,000 mesos#k!");
			} else if (status == 1) {
				cm.sendNextPrev("We currently offer this place for your traveling pleasure: #bMushroom Shrine of Japan#k. I'll be there serving you as the travel guide. Rest assured, the number of destinations will increase over time. Now, would you like to head over to the Mushroom Shrine?");
			} else if (status == 2) {
				if (cm.getMeso() < 50000) {
					cm.sendOk("You do not have enough mesos.")
					cm.dispose();
				} else {
					cm.sendYesNo("Would you like to travel to the #bMushroom Shrine of Japan#k? If you desire to feel the essence of Japan, there's nothing like visiting the Shrine, a Japanese cultural melting pot. Mushroom Shrine is a mythical place that serves the incomparable Mushroom God from ancient times.");
				}
			} else if (status == 3) {
				cm.sendNext("Check out the female shaman serving the Mushroom God, and I strongly recommend trying Takoyaki, Yakisoba, and other delicious food sold in the streets of Japan. Now, let's head over to #bMushroom Shrine#k, a mythical place if there ever was one.");

			} else if (status == 4) {
				cm.gainMeso(-50000);
				cm.getChar().saveLocation(SavedLocationType.WORLDTOUR);
				cm.warp(800000000, 0);
				cm.dispose();
			}
		}
	}
}