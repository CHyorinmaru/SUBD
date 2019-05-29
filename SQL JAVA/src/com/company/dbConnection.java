package com.company;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class dbConnection {
    private static String username = "root";
    private static String password = "password";
    private static String dbms = "Classbook";
    private static String serverName = "localhost";
    private static String portNumber = "1303";

    private static Connection conn;

    public static Connection getConnection() throws SQLException {
        if (conn == null) {
            Properties connectionProps = new Properties();
            connectionProps.put("user", username);
            connectionProps.put("password", password);

            if (dbms.equals("mysql")) {
                conn = DriverManager.getConnection(
                    "jdbc:" + dbms + "://" +
                        serverName + ":" + portNumber + "/",
                        connectionProps
                );
            }
            System.out.println("Connected to database");
        }
        return conn;
    }

    public static Statement getStatement() {
        Statement ret = null;
        try {
            ret = conn.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ret;
    }

    public static void execute(String query) {
        try {
            dbConnection.getStatement().executeQuery(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
