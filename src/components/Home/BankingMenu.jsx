import React from "react";
import { Link } from "react-router-dom";

const BankingMenu = () => {
  return (
    <div className="w-[90vw] md:w-[900px] bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Loans Column */}
        <nav>
          <ul className="space-y-2">
            <li className="font-medium text-lg px-2">Loans</li>
            <li>
              <Link
                to={"/products/personal/salary loans"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Salary Loans
              </Link>
            </li>
            <li>
              <Link
                to={"/products/business/sme loans"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                SME Loans
              </Link>
            </li>
            <li>
              <Link
                to={"/products/personal/Government Salary Loans"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Government Salary Loans
              </Link>
            </li>
            <li>
              <Link
                to={"/products/business/Susu and Nkosuo Loans"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Susu and Nkosuo Loans
              </Link>
            </li>
            <li>
              <Link
                to={"/products/loans/Best Quick Loan"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
              Best Quick Loan
              </Link>
            </li>
          </ul>
        </nav>

        {/* Accounts Column */}
        <nav>
          <ul className="space-y-2">
            <li className="font-medium text-lg px-2">Savings</li>
            <li>
              <Link
                to={"/products/accounts/susu account"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Susu Account
              </Link>
            </li>
            <li>
              <Link
                to={"/products/accounts/Sika Dua"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Sika Dua
              </Link>
            </li>
            <li>
              <Link
                to={"products/savings/Current Account"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Current Account
              </Link>
            </li>
            <li>
              <Link
                to={"/products/accounts/Savings Account"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Savings Account
              </Link>
            </li>
            <li>
              <Link
                to={"/products/accounts/Mmofra Daakye Account"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Mmofra Daakye Account
              </Link>
            </li>
          </ul>
        </nav>

        {/* Digital Banking Column */}
        <nav>
          <ul className="space-y-2">
            <li className="font-medium text-lg px-2">Digital Banking</li>
            <li>
              <Link
                to={"/products/digital/best mobile banking"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Best Mobile Banking
              </Link>
            </li>
            <li>
              <Link
                to={"/products/digital/MTN Mobile Money"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Mobile Money Services
              </Link>
            </li>
          </ul>
        </nav>

        {/* Transfers Column */}
        <nav className="md:border-l md:border-gray-300 md:pl-6">
          <ul className="space-y-2">
            <li className="font-medium text-lg px-2">Remmittance</li>
            <li>
              <Link
                to={"/products/remmittance/western union"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Western Union
              </Link>
            </li>
            <li>
              <Link
                to={"/products/remmittance/moneygram"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                MoneyGram
              </Link>
            </li>
            <li>
              <Link
                to={"/products/remmittance/ria money transfer"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Ria Money Transfer
              </Link>
            </li>
            <li>
              <Link
                to={"/products/remmittance/unitylink"}
                className="block text-sm px-2 hover:bg-white/90 rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                UnityLink
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BankingMenu;
