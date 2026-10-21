package co.za.mahlakoequipmentrentals.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DatabaseConnection {
    
    public static Connection getConnection() {
        Properties props = new Properties();
        
        try (InputStream input = DatabaseConnection.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (input == null) {
                System.out.println("Could not find db.properties in classpath.");
                return null;
            }
            props.load(input);
            
            String host = props.getProperty("db.host");
            String user = props.getProperty("db.user");
            String password = props.getProperty("db.password");
            String url = "jdbc:mysql://" + host + "/defaultdb?useSSL=true&requireSSL=true";
            
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(url, user, password);
            
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
