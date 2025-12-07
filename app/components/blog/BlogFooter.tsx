import Link from 'next/link';

export default function BlogFooter() {
  const siteName = process.env.NEXT_PUBLIC_BLOG_NAME || 'Shagan Plaatjies Blog';
  const siteDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || 'Thoughts on software development and technology';
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL || '/blog';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{siteName}</h3>
            <p className="text-gray-400">{siteDescription}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href={blogUrl}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={`${blogUrl}/about`}
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <p className="text-gray-400">Stay updated with our latest posts.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
