import com.company.dbConnection;

public class Database {
    public static void createDatabase() {
       dbConnection.execute("CREATE DATABASE School;");
    }

    public static void createTables() {
        String teacherTable = "CREATE TABLE Teacher ( \n" +
                "id INTEGER NOT NULL, \n" +
                "name VARCHAR(10),\n" +
                "surname VARCHAR(10),\" \n" +
                "FOREIGN KEY(id) REFERENCES Student(id)\n" +
                ");";

        String studentTable = "CREATE TABLE Student (\n" +
                "id INTEGER NOT NULL,\n" +
                "name VARCHAR(10),\n" +
                "surname VARCHAR(10),\n" +
                "FOREIGN KEY(id) REFERENCES Teacher(id)\n" +
                ");";

        String classTable = "CREATE TABLE Class (\n" +
                "teacherId INTEGER NOT NULL,\n" +
                "studentId INTEGER NOT NULL,\n" +
                "FOREIGN KEY(teacherId) REFERENCES Teacher(id),\n" +
                "FOREIGN KEY(studentId) REFERENCES Student(id)\n" +
                ");";

        dbConnection.execute(studentTable);
        dbConnection.execute(teacherTable);
        dbConnection.execute(classTable);
    }
}
