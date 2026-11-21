export default function ProfileCard() {
  return (
    <>
      <section className="card profile">
        <div className="profile-img" role="img" aria-label="Pencil on a desk" />
        <div className="card-body">
          <h3>My Name</h3>
          <p>
            Just me, myself and I, exploring the universe of unknownment. I have
            a heart of love and an interest of lorem ipsum and mauris neque quam
            blog. I want to share my world with you.
          </p>
        </div>
      </section>

      <section className="card popular">
        <h4>Popular Posts</h4>
        <ul>
          {[
            ["Lorem", "Sed mattis nunc"],
            ["Ipsum", "Praes tinci sed"],
            ["Dorum", "Ultricies congue"],
            ["Mingsum", "Lorem ipsum dipsum"],
          ].map(([t, d]) => (
            <li key={t}>
              <span className="thumb" />
              <div>
                <strong>{t}</strong>
                <small>{d}</small>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
