"use client";

import React from "react";

// 2. Import dữ liệu mock từ file constants
import { BLOG_POSTS } from "../../../data/mockHome";
import BlogFeaturedPost from "@/features/blog/components/BlogFeaturedPost";
import BlogGridPost from "@/features/blog/components/BlogGridPost";

interface BlogPageProps {
  /** Hàm điều hướng giữa các view (home, shop, blog, v.v.) */
  setCurrentView: (view: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ setCurrentView }) => {
  // Lấy bài viết nổi bật (có thuộc tính large: true)
  const featuredPost = BLOG_POSTS.find((post) => post.large);

  // Lấy danh sách các bài viết còn lại (dạng lưới)
  const gridPosts = BLOG_POSTS.filter((post) => !post.large);

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12">
      {/* 3. Breadcrumbs (Đường dẫn điều hướng nhanh) */}
      <div className="mb-8 text-sm text-gray-500 flex items-center">
        <span
          className="hover:text-red-600 cursor-pointer transition-colors"
          onClick={() => setCurrentView("home")}
        >
          Trang Chủ
        </span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Blog</span>
      </div>

      {/* 4. Hiển thị bài viết nổi bật (Banner lớn) */}
      {featuredPost && <BlogFeaturedPost post={featuredPost} />}

      {/* 5. Grid bài viết đợt 1 (Thường là 3 bài đầu tiên) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {gridPosts.slice(0, 3).map((post, index) => (
          <BlogGridPost key={`grid-1-${index}`} post={post} index={index} />
        ))}
      </div>

      {/* 6. Tiêu đề ngăn cách các bài viết mới hơn */}
      <div className="mb-8 flex justify-between items-center border-b border-gray-100 pb-3">
        <h2 className="text-2xl font-bold text-gray-800">Bài viết Mới nhất</h2>
      </div>

      {/* 7. Grid bài viết đợt 2 (Phần còn lại từ bài thứ 4 trở đi) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gridPosts.slice(3).map((post, index) => (
          <BlogGridPost key={`grid-2-${index}`} post={post} index={index} />
        ))}
      </div>

      {/* Thông báo nếu không có thêm bài viết */}
      {gridPosts.length <= 3 && (
        <p className="text-center text-gray-400 mt-10 italic">
          Bạn đã xem hết bài viết mới nhất.
        </p>
      )}
    </section>
  );
};

export default BlogPage;
