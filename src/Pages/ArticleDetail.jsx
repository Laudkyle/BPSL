import { useParams } from "react-router-dom";
import Hero from "../components/About/Hero";
import { Share } from "lucide-react";
import UndoButton from "../components/UndoButton";
import quote from "../images/general icons/marks.png";
import { Link } from "react-router-dom";
import { getArticle, getArticles } from "../Api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch the specific article
        const articleResponse = await getArticle(id);
        setArticle(articleResponse.data);

        // Fetch related articles
        const articlesResponse = await getArticles();
        setRelatedArticles(articlesResponse.data.filter(a => a.id !== parseInt(id)).slice(0, 5));
      } catch (error) {
        toast.error('Failed to fetch article');
        setArticle(null);
        setRelatedArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
      </div>
    );
  }

  if (!article) {
    return <div className="text-3xl md:text-4xl p-6 text-red-500">Article not found.</div>;
  }

  return (
    <div className="">
      <Hero image={article.image || article.images?.[0]} text1={"News"} />

      <div className="flex flex-col sm:flex-row gap-x-4 lg:gap-x-12 mt-6 md:mt-12 items-start px-4 sm:px-8 md:px-0">
        <div className="hidden md:block bg-purple h-8 w-12 mb-2 text-3xl md:text-4xl" />
        {article.title &&
          (() => {
            const words = article.title.split(" ");
            const len = words.length;

            let topWords = [];
            let bottomWords = [];

            if (len <= 3) {
              topWords = words;
            } else if (len === 5) {
              topWords = words.slice(0, 2);
              bottomWords = words.slice(2);
            } else if (len > 5 && len <= 7) {
              topWords = words.slice(0, 3);
              bottomWords = words.slice(3);
            } else {
              const half = Math.ceil(len / 2);
              topWords = words.slice(0, half);
              bottomWords = words.slice(half);
            }

            return (
              <>
                <UndoButton />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
                  {topWords.join(" ")}
                  {bottomWords.length > 0 && (
                    <>
                      <br />
                      <span className="text-gray-800 font-bold">
                        {bottomWords.join(" ")}
                      </span>
                    </>
                  )}
                </h1>
              </>
            );
          })()}
      </div>

      <div className="px-4 sm:px-8 md:px-12">
        <div className="flex flex-wrap items-center justify-start gap-4 pt-8">
          <div className="bg-purple px-4 py-1 rounded-xl">
            <span className="text-white text-xs">{article.category || "Article"}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <Share size={15} className="text-sm" />
            <span className="text-black text-sm">12</span>
          </div>
          {article.story && (
            <div className="text-black text-sm">
              <span>
                {Math.ceil(article.story.split(" ").length / 200)} min read
              </span>
            </div>
          )}
        </div>

        <div className="w-full mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-12">
            {/* Article Content */}
            <div className="lg:col-span-4 text-justify md:text-left font-extralight mb-6">
              <p className="mb-12 text-sm">{article.story || article.content}</p>

              {article.quote && (
                <div className="relative flex flex-col gap-2 border-l-4 border-purple w-[90%] mx-auto bg-gray-100 p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-2">
                    <img
                      src={quote}
                      alt="Quote Icon"
                      className="w-5 h-5 mt-1 opacity-60"
                    />
                    <p className="text-gray-700 text-base italic">
                      {article.quote.quote || article.quote}
                    </p>
                  </div>
                  {article.quote.person && (
                    <p className="text-left text-sm font-semibold mt-4 text-gray-600">
                      - {article.quote.person}
                    </p>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-7 p-2 gap-y-12 mt-12">
                <div className="p-2">
                  {article.subTitle && (
                    <h1 className="text-purple text-lg font-bold mb-2">
                      {article.subTitle}
                    </h1>
                  )}
                  {/* <p className="text-sm font-extralight">{article.story || article.content}</p> */}
                </div>
                {(article.img || article.images?.[0]) && (
                  <img
                    src={article.img || article.images[0]}
                    className="col-span-7 h-full m-2 rounded-lg w-full object-fit md:object-cover"
                    alt="Article illustration"
                  />
                )}
              </div>
            </div>

            {/* Related Posts */}
            <div className="lg:col-span-3 mx-auto w-full max-w-[312px] mb-6">
              <div className="bg-gray-200 rounded-lg p-4">
                <h2 className="text-lg text-purple-100 mb-4">Related Posts:</h2>
                {relatedArticles.length > 0 ? (
                  <ul className="list-none space-y-2 m-0 p-0">
                    {relatedArticles.map((related) => (
                      <li
                        key={related.id}
                        className="border-b border-gray-300 pb-2"
                      >
                        <Link
                          to={`/stories/${related.id}`}
                          className="text-sm text-gray-700 hover:text-purple-100 font-semibold hover:underline"
                        >
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No related articles found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}