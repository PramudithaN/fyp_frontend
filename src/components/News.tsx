import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pagination } from "antd";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, Newspaper, RefreshCw, Search } from "lucide-react";
import { fetchNews, FetchNewsOptions, getCachedNews } from "../api";
import { NewsArticle } from "../types/api";
import AnimatedButton from "./ui/AnimatedButton";
import { useNotification } from "../context/NotificationContext";

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const NewsImage = ({
  src,
  alt,
  articleId,
  onError,
}: {
  src: string;
  alt: string;
  articleId: string | number;
  onError: (id: string | number) => void;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="skeleton-loader absolute inset-0 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => onError(articleId)}
      />
    </>
  );
};

type Mode = "recent" | "date";
const ARTICLES_PER_PAGE = 6;

const formatArticleDate = (dateString: string) => {
  if (!dateString || dateString === "Unknown") return "Unknown date";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const initialCachedNews = getCachedNews();

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(() => initialCachedNews?.articles ?? []);
  const [loading, setLoading] = useState(() => !initialCachedNews);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<Mode>("recent");
  const [daysInput, setDaysInput] = useState("7");
  const [dateInput, setDateInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { notify } = useNotification();
  const initialFetchDone = useRef(false);

  const distinctDates = useMemo(
    () => new Set(articles.map((article) => article.article_date).filter(Boolean)).size,
    [articles],
  );

  const pagedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    const end = start + ARTICLES_PER_PAGE;
    return articles.slice(start, end);
  }, [articles, currentPage]);

  useEffect(() => {
    const nextStart = currentPage * ARTICLES_PER_PAGE;
    const nextPageArticles = articles.slice(nextStart, nextStart + ARTICLES_PER_PAGE);
    nextPageArticles.forEach((article) => {
      if (article.image_url && !failedImages[article.id]) {
        preloadImage(article.image_url);
      }
    });
  }, [currentPage, articles, failedImages]);

  const handleImageError = useCallback((id: string | number) => {
    setFailedImages((current) => ({ ...current, [id]: true }));
  }, []);

  const loadNews = async (
    options?: FetchNewsOptions,
    requestOptions?: { forceRefresh?: boolean },
  ) => {
    const cachedNews = requestOptions?.forceRefresh ? null : getCachedNews(options);

    try {
      if (cachedNews) {
        setArticles(cachedNews.articles);
        setFailedImages({});
        setCurrentPage(1);
        setError(null);
        setLoading(false);
      } else {
        setLoading(true);
        setError(null);
      }

      const result = await fetchNews(options, requestOptions);
      setArticles(result.articles);
      setFailedImages({});
      setCurrentPage(1);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch news articles";
      setError(message);
      notify({ type: "error", title: "News fetch failed", message });
    } finally {
      if (!cachedNews || requestOptions?.forceRefresh) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    loadNews();
  }, []);

  const handleFilterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "date") {
      if (!dateInput) {
        setError("Pick a date first to filter articles.");
        notify({
          type: "warning",
          title: "Date required",
          message: "Pick a date first to filter articles.",
        });
        return;
      }
      loadNews({ articleDate: dateInput });
      return;
    }

    const parsedDays = Number(daysInput);
    if (!Number.isInteger(parsedDays) || parsedDays <= 0) {
      setError("Days must be a positive whole number.");
      notify({
        type: "warning",
        title: "Invalid days value",
        message: "Days must be a positive whole number.",
      });
      return;
    }

    loadNews({ days: parsedDays });
  };

  const handleReset = () => {
    setMode("recent");
    setDaysInput("7");
    setDateInput("");
    setCurrentPage(1);
    loadNews();
  };

  return (
    <div className="relative min-h-screen bg-oil-black pt-24 pb-20 px-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[660px] h-[420px] rounded-full bg-oil-gold/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto space-y-7">
        <header className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7 md:p-9">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-oil-gold/90 font-semibold">
                Market Intelligence Feed
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mt-3">
                Energy News Desk
              </h1>
              <p className="text-base text-gray-300 mt-3 max-w-2xl leading-7">
                A cleaner editorial feed for tracking headlines that can influence near-term Brent price direction.
                Browse by recency windows or inspect a specific publication date.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 min-w-[220px]">
              <div className="rounded-xl border border-white/10 bg-oil-black/35 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500">Articles</p>
                <p className="text-2xl font-display font-bold text-white mt-1">{articles.length}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-oil-black/35 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500">Distinct Dates</p>
                <p className="text-2xl font-display font-bold text-white mt-1">{distinctDates}</p>
              </div>
            </div>
          </div>
        </header>

        <form onSubmit={handleFilterSubmit} className="rounded-2xl border border-white/10 bg-[#14120f]/90 p-5 sm:p-6">
          <div className="flex flex-col xl:flex-row gap-4 xl:items-end xl:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500 font-semibold mb-2">View Mode</p>
              <div className="inline-flex rounded-xl border border-white/10 bg-oil-black/40 p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setMode("recent")}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    mode === "recent"
                      ? "bg-oil-gold text-oil-black font-semibold"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  Recent Dates
                </button>
                <button
                  type="button"
                  onClick={() => setMode("date")}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    mode === "date"
                      ? "bg-oil-gold text-oil-black font-semibold"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  Exact Date
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
              {mode === "recent" ? (
                <div className="flex flex-col gap-1">
                  <label htmlFor="days" className="text-xs text-gray-400">Distinct date count</label>
                  <input
                    id="days"
                    type="number"
                    min={1}
                    value={daysInput}
                    onChange={(event) => setDaysInput(event.target.value)}
                    className="h-11 rounded-xl bg-oil-dark/70 border border-white/10 px-4 text-sm text-white focus:outline-none focus:border-oil-gold/60"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <label htmlFor="article-date" className="text-xs text-gray-400">Article date</label>
                  <input
                    id="article-date"
                    type="date"
                    value={dateInput}
                    onChange={(event) => setDateInput(event.target.value)}
                    className="h-11 rounded-xl bg-oil-dark/70 border border-white/10 px-4 text-sm text-white focus:outline-none focus:border-oil-gold/60"
                  />
                </div>
              )}

              <div className="flex items-end gap-2">
                <AnimatedButton type="submit" variant="primary" className="h-11 px-5">
                  <Search size={16} />
                  Apply
                </AnimatedButton>
                <AnimatedButton type="button" variant="secondary" onClick={handleReset} className="h-11 px-4">
                  <RefreshCw size={16} />
                  Reset
                </AnimatedButton>
              </div>
            </div>
          </div>
        </form>

        {error && (
          <div className="rounded-xl border border-oil-gold/35 bg-oil-gold/10 px-4 py-3 text-sm text-oil-gold">
            {error}
          </div>
        )}

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((key) => (
              <div key={key} className="skeleton-loader h-44 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#14120f]/90 p-10 text-center">
            <Newspaper className="mx-auto text-gray-500" size={34} />
            <p className="mt-3 text-white font-semibold">No articles found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different filter or reset to the default feed.</p>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Latest Coverage</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">
                Page {currentPage} of {Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE))}
              </p>
            </div>

            <div className="space-y-4">
              {pagedArticles.map((article, index) => (
                <motion.article
                  key={`${article.id}-${(currentPage - 1) * ARTICLES_PER_PAGE + index}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-2xl border border-white/10 bg-[#14120f]/90 p-4 sm:p-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
                    <div className="relative overflow-hidden rounded-xl h-44 md:h-full bg-oil-dark/80 border border-white/10">
                      {article.image_url && !failedImages[article.id] ? (
                        <NewsImage
                          src={article.image_url}
                          alt={article.title}
                          articleId={article.id}
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="h-full w-full bg-oil-dark/80 flex items-center justify-center">
                          <Newspaper className="text-oil-light-gold/70" size={32} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 mb-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={13} />
                          {formatArticleDate(article.article_date)}
                        </span>
                        <span className="uppercase tracking-[0.12em] text-oil-gold/80">
                          {article.source ?? "Unknown source"}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-semibold text-white leading-snug mb-3">
                        {article.title}
                      </h3>

                      <p className="text-sm sm:text-base text-gray-300 leading-7 line-clamp-4 flex-1">
                        {article.summary ?? "No summary available for this article."}
                      </p>

                      {article.url && (
                        <div className="pt-4 mt-4 border-t border-white/10">
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-oil-gold hover:text-oil-light-gold transition-colors"
                          >
                            Open full article
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {articles.length > ARTICLES_PER_PAGE && (
              <div className="flex justify-center pt-2">
                <Pagination
                  current={currentPage}
                  pageSize={ARTICLES_PER_PAGE}
                  total={articles.length}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default News;
