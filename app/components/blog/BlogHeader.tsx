import Link from 'next/link';

export default function BlogHeader() {
  const siteName = process.env.NEXT_PUBLIC_BLOG_NAME || 'Shagan Plaatjies Blog';
  const siteDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || 'Thoughts on software development and technology';
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL || '/blog';

  return (
    <header className="site-header bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          <div className="site-branding">
            <h1 className="text-2xl font-bold text-gray-900 m-0">
              <Link
                href={blogUrl}
                className="hover:text-primary-600 transition-colors"
              >
                {siteName}
              </Link>
            </h1>
            {siteDescription && (
              <p className="text-sm text-gray-600 mt-1">
                {siteDescription}
              </p>
            )}
          </div>

          <nav className="site-navigation">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href={blogUrl}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={`${blogUrl}/about`}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
