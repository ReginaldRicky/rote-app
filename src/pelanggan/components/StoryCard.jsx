export default function StoryCard({ story }) {
  return (
    <div className="story-card">
      <img src={story.image} alt={story.title} className="story-card-image" />
      <div className="story-card-author">
        <img src="https://placehold.co/30x30" alt="" className="story-author-avatar" />
        <span>{story.author}</span>
      </div>
      <h4 className="story-card-title">{story.title}</h4>
    </div>
  );
}