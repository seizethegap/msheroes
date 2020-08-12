package constants;

import java.util.Calendar;
import java.util.List;
import java.util.LinkedList;


public class ServerConstants {

	public static boolean TESPIA = false; //true = uses GMS test server
	public static final byte[] serverIP = new byte[] {(byte) 127, (byte) 0, (byte) 0, (byte) 1};
	
	public static boolean getEventTime() {
		int time = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
		switch (Calendar.DAY_OF_WEEK) {
			case 1:
				return time >= 1 && time <= 5;
			case 2:
                return time >= 4 && time <= 9;
            case 3:
                return time >= 7 && time <= 12;
            case 4:
                return time >= 10 && time <= 15;
            case 5:
                return time >= 13 && time <= 18;
            case 6:
                return time >= 16 && time <= 21;
         }
        return time >= 19 && time <= 24;
    }

	public static final short MAPLE_VERSION = (short) 62;
	public static final boolean BLOCK_CS = false;
	public static boolean logLocalhost = false; // true = packets are logged, false = not logged
	public static final String SQL_USER = "root", SQL_PASSWORD = "";
	
}
