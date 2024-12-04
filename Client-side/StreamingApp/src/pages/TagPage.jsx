import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

export default function TagPage() {
    const params = useParams();

    return (
        <>
            <NavBar routing="index" />
            <Sidebar routing="tagPage" tagid={params.tagid}/>
        </>
    )
}