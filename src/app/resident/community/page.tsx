"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  X,
  Send,
  Image as ImageIcon,
} from "lucide-react";

const posts = [
  {
    id: "1",
    author: "Sarah T.",
    unit: "#08-12",
    avatar: "ST",
    title: "Lost Cat - Please Help!",
    content: "My orange tabby cat escaped this morning around 8am. He responds to the name 'Mochi'. If you see him, please contact me at 9123-4567. Reward offered!",
    images: [],
    likes: 24,
    comments: 8,
    createdAt: "2026-02-07T10:30:00",
    category: "lost-found",
  },
  {
    id: "2",
    author: "Michael L.",
    unit: "#15-03",
    avatar: "ML",
    title: "Recommendation for Aircon Servicing",
    content: "Can anyone recommend a reliable aircon servicing company? Looking for someone who can service all 3 units in my apartment. Thanks in advance!",
    images: [],
    likes: 5,
    comments: 12,
    createdAt: "2026-02-06T15:45:00",
    category: "recommendation",
  },
  {
    id: "3",
    author: "Jenny W.",
    unit: "#12-08",
    avatar: "JW",
    title: "Free Piano Lessons for Kids",
    content: "Hi neighbors! I'm a piano teacher and would like to offer free trial lessons for kids aged 5-12 in our condo. Lessons will be held at my unit on weekends. DM if interested!",
    images: [],
    likes: 45,
    comments: 15,
    createdAt: "2026-02-05T09:00:00",
    category: "community",
  },
  {
    id: "4",
    author: "David C.",
    unit: "#03-15",
    avatar: "DC",
    title: "Giving Away: Baby Items",
    content: "We have some baby items to give away - crib, stroller, and high chair. All in good condition. First come first served. Collection from my unit.",
    images: [],
    likes: 18,
    comments: 6,
    createdAt: "2026-02-04T14:20:00",
    category: "giveaway",
  },
];

const categoryColors: Record<string, string> = {
  "lost-found": "bg-red-100 text-red-700",
  "recommendation": "bg-blue-100 text-blue-700",
  "community": "bg-purple-100 text-purple-700",
  "giveaway": "bg-green-100 text-green-700",
  "general": "bg-gray-100 text-gray-700",
};

export default function CommunityPage() {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return "Just now";
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-500">Connect with your neighbors</p>
        </div>
        <Button onClick={() => setShowNewPost(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-medium text-sm">{post.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{post.author}</span>
                    <span className="text-gray-400 text-sm">{post.unit}</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatTimeAgo(post.createdAt)}</span>
                </div>
                <Badge className={categoryColors[post.category]}>
                  {post.category.replace("-", " ")}
                </Badge>
              </div>

              {/* Content */}
              <h3 className="font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{post.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-6 pt-3 border-t">
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Create Post</CardTitle>
              <button onClick={() => setShowNewPost(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                >
                  <option value="general">General</option>
                  <option value="recommendation">Recommendation</option>
                  <option value="lost-found">Lost & Found</option>
                  <option value="giveaway">Giveaway</option>
                  <option value="community">Community</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share with your neighbors..."
                  rows={4}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Add Photo
                </Button>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
