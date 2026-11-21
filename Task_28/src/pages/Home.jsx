import PostCard from "../components/PostCard.jsx";
import ProfileCard from "../components/ProfileCard.jsx";

export default function Home() {
  return (
    <div className="layout layout-home">
      <div className="col-main">
        <PostCard withImage />
        <PostCard title="ANOTHER POST" />
      </div>
      <aside className="col-side">
        <ProfileCard />
      </aside>
    </div>
  );
}
