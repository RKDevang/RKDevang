package OOPS;


class Parent
{
	void a()
	{
		System.out.println("This Is A Parent Class.");
	}
}

class SubClass extends Parent
{
	void b()
	{
		System.out.println("This Is A Child Class.");
	}
}

public class Q2 {
	
	public static void main(String[] args) {
		
		SubClass b1 = new SubClass();
		b1.a();
		b1.b();
		
		Parent p1 = new Parent();
		p1.a();
		
		
	}

}
