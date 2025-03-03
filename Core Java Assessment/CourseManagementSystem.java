package asses;

import java.util.*;

// Course class to store course details
class Course {
    int id;
    String name;
    double fees;
    String duration;
    String detail;

    public Course(int id, String name, double fees, String duration, String detail) {
        this.id = id;
        this.name = name;
        this.fees = fees;
        this.duration = duration;
        this.detail = detail;
    }
}

// Main class for course management system
public class CourseManagementSystem {
    private static final Scanner scanner = new Scanner(System.in);
    private static final List<Course> courses = new ArrayList<>();

    public static void main(String[] args) {
        while (true) {
            System.out.println("\nCourse Management System");
            System.out.println("1. Add Course");
            System.out.println("2. View Courses");
            System.out.println("3. Search Course");
            System.out.println("4. Edit Course");
            System.out.println("5. Delete Course");
            System.out.println("6. Exit");
            System.out.print("Choose an option: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    addCourse();
                    break;
                case 2:
                    viewCourses();
                    break;
                case 3:
                    searchCourse();
                    break;
                case 4:
                    editCourse();
                    break;
                case 5:
                    deleteCourse();
                    break;
                case 6:
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }

    // Add a new course
    private static void addCourse() {
        System.out.print("Enter Course ID: ");
        int id = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Enter Course Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Course Fees: ");
        double fees = scanner.nextDouble();
        scanner.nextLine();
        System.out.print("Enter Course Duration: ");
        String duration = scanner.nextLine();
        System.out.print("Enter Course Detail: ");
        String detail = scanner.nextLine();

        courses.add(new Course(id, name, fees, duration, detail));
        System.out.println("Course added successfully!");
    }

    // View all courses
    private static void viewCourses() {
        if (courses.isEmpty()) {
            System.out.println("No courses available.");
            return;
        }
        for (Course course : courses) {
            System.out.println("ID: " + course.id + ", Name: " + course.name + ", Fees: " + course.fees + ", Duration: " + course.duration + ", Detail: " + course.detail);
        }
    }

    // Search for a course by ID
    private static void searchCourse() {
        System.out.print("Enter Course ID to search: ");
        int id = scanner.nextInt();
        scanner.nextLine();
        for (Course course : courses) {
            if (course.id == id) {
                System.out.println("Found Course: " + course.name + " (" + course.detail + ")");
                return;
            }
        }
        System.out.println("Course not found!");
    }

    // Edit an existing course
    private static void editCourse() {
        System.out.print("Enter Course ID to edit: ");
        int id = scanner.nextInt();
        scanner.nextLine();
        for (Course course : courses) {
            if (course.id == id) {
                System.out.print("Enter New Course Name: ");
                course.name = scanner.nextLine();
                System.out.print("Enter New Course Fees: ");
                course.fees = scanner.nextDouble();
                scanner.nextLine();
                System.out.print("Enter New Course Duration: ");
                course.duration = scanner.nextLine();
                System.out.print("Enter New Course Detail: ");
                course.detail = scanner.nextLine();
                System.out.println("Course updated successfully!");
                return;
            }
        }
        System.out.println("Course not found!");
    }

    // Delete a course
    private static void deleteCourse() {
        System.out.print("Enter Course ID to delete: ");
        int id = scanner.nextInt();
        scanner.nextLine();
        for (Course course : courses) {
            if (course.id == id) {
                courses.remove(course);
                System.out.println("Course deleted successfully!");
                return;
            }
        }
        System.out.println("Course not found!");
    }
}
