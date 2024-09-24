import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

export default function SearchResult() {
  return (
    <>
      <NavBar routing="index" />
      <Sidebar routing="SearchResult" />
    </>
  );
}
