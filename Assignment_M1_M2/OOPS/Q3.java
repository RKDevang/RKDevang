package OOPS;


class Member
{
	int Data_Member;
	String Name;
	int Age;
	int Phone_Number;
	String Address;
	int Salary;
	
	void PrintSalary()
	{
		System.out.println("xyz amount");
	}
}


public class Q3 {
	
	public static void main(String[] args) {
		
		Member M = new Member();
		
		M.PrintSalary();
	}

}
