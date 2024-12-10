package OOPS;

abstract class Parent_1
{
	public void message()
	{
		
	}
}

class B extends Parent_1
{
	public void message()
	{
		System.out.println("This Is A First Class.");
	}
}

class C extends Parent_1
{
	public void message()
	{
		System.out.println("This Is A Second SubClass.");
	}
}

public class Q7 {

	public static void main(String[] args) {
		
		B b1 = new B();
		b1.message();
		
		C c1 = new C();
		c1.message();
	}
}
