import Navbar from "../../components/layout/Navbar";
import { useState } from "react";
import PeriodToggle from "../../components/ui/PeriodToggle";

function HomeUser() {
  const [period, setPeriod] = useState("Minggu");
  return (
    <>
      <Navbar />
      <h1>Home User</h1>
    </>
  );
}

export default HomeUser;