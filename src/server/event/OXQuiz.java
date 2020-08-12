package server.event;

import java.io.File;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;

public class OXQuiz {

    private static MapleDataProvider dataRoot = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Etc.wz"));
    
    public class OXQuizData {
        
        public String q, a;
        public boolean ans;
        
        public OXQuizData(String q, boolean ans, String a) {
            
        }
    }
}
