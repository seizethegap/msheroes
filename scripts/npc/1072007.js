/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Thief Job Instructor
 Thief 2nd Job Advancement
 Hidden Street : Thief's Construction Site (108000400)
 */


function start() {
    if (cm.haveItem(4031013, 30)) {
        cm.gainItem(4031013, -30);
        cm.completeQuest(100010);
        if (cm.getQuestStatus(100010) == Packages.client.MapleQuestStatus.Status.COMPLETED) {
            cm.startQuest(100011);
            cm.sendOk("You're a true hero! Take this and the Dark Lord will acknowledge you.");
        }
        cm.warp(102040000, 0);
    } else {
        cm.sendOk("You will have to collect me #b30 #t4031013##k. Good luck.")
    }
    cm.dispose();
}

function action(mode, type, selection) {
}	