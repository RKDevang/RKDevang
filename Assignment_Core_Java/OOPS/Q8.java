package OOPS;

abstract class Bank
{
	public abstract int getBalance();
}

class Bank_X extends Bank
{
	private int X_Balance = 100;

	@Override
	public int getBalance()
	{
		return X_Balance;
	}
}

class Bank_Y extends Bank
{
	private int Y_Balance = 150;

	@Override
	public int getBalance()
	{
		return Y_Balance;
	}
	
}

class Bank_Z extends Bank
{
	private int Z_Balance = 200;

	@Override
	public int getBalance()
	{
		return Z_Balance;
	}
}


public class Q8 {
	
	public static void main(String[] args) {
		
		Bank X = new Bank_X();
		Bank Y = new Bank_Y();
		Bank Z = new Bank_Z();
		
		System.out.println("X Balance " + X.getBalance());
		System.out.println("Y Balance " + Y.getBalance());
		System.out.println("Z Balance " + Z.getBalance());
 		
	}

}
