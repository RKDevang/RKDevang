package String;

import java.time.LocalTime;

public class DisplayTime {
    public static void main(String[] args) {
        LocalTime currentTime = LocalTime.now();
        System.out.println("Current system time: " + currentTime);
    }
}
