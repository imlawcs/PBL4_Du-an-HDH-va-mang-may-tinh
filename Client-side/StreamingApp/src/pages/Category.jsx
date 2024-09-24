import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

export default function Category() {
  return (
    <>
      <NavBar routing="index" />
      <Sidebar routing="category" />
    </>
  );
}
