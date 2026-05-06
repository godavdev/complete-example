import { CreatePostCard } from "./create-post-card"
import { PostsFeed } from "./feed"

const PostsPage = () => (
  <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 md:px-0">
    <CreatePostCard />
    <PostsFeed />
  </div>
)

export default PostsPage
