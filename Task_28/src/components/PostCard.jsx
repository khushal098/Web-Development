export default function PostCard({ title = "TITLE HEADING", withImage = false }) {
  return (
    <article className="card post">
      {withImage && <div className="post-img" role="img" aria-label="Fallen trees in a forest" />}
      <div className="card-body">
        <h2>{title}</h2>
        <p className="meta">
          Title description, <span>April 7, 2014</span>
        </p>
        <p>
          Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl.
          Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna
          enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non
          congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed
          vitae justo condimentum, porta lectus vitae, ultricies congue gravida
          diam non fringilla.
        </p>
        <div className="post-footer">
          <button className="btn btn-outline">Read more »</button>
          <span className="comments">Comments <b>0</b></span>
        </div>
      </div>
    </article>
  );
}
