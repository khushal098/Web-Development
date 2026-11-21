import PostCard from "../components/PostCard.jsx";
import ProfileCard from "../components/ProfileCard.jsx";

export default function Dashboard() {
  return (
    <div className="layout layout-dashboard">
      <aside className="col-side">
        <ProfileCard />
      </aside>
      <div className="col-main">
        <PostCard />
      </div>
    </div>
  );
}
