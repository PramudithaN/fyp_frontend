import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pagination } from "antd";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, Newspaper, RefreshCw, Search, Filter } from "lucide-react";
import { fetchNews, FetchNewsOptions, getCachedNews } from "../api";
import { NewsArticle } from "../types/api";
import AnimatedButton from "./ui/AnimatedButton";
import { useNotification } from "../context/NotificationContext";

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

/** Lazy-loading image with skeleton fallback. */
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
    () => new Set(articles.map((a) => a.article_date).filter(Boolean)).size,
    [articles],
  );

  const pagedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return articles.slice(start, start + ARTICLES_PER_PAGE);
  }, [articles, currentPage]);

  useEffect(() => {
    const nextStart = currentPage * ARTICLES_PER_PAGE;
    articles.slice(nextStart, nextStart + ARTICLES_PER_PAGE).forEach((article) => {
      if (article.image_url && !failedImages[article.id]) preloadImage(article.image_url);
    });
  }, [currentPage, articles, failedImages]);

  const handleImageError = useCallback((id: string | number) => {
    setFailedImages((cur) => ({ ...cur, [id]: true }));
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
      if (!cachedNews || requestOptions?.forceRefresh) setLoading(false);
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
        const msg = "Pick a date first to filter articles.";
        setError(msg);
        notify({ type: "warning", title: "Date required", message: msg });
        return;
      }
      loadNews({ articleDate: dateInput });
      return;
    }
    const parsedDays = Number(daysInput);
    if (!Number.isInteger(parsedDays) || parsedDays <= 0) {
      const msg = "Days must be a positive whole number.";
      setError(msg);
      notify({ type: "warning", title: "Invalid days value", message: msg });
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
    <div className="relative min-h-screen bg-pc-black pt-24 pb-20 px-4 sm:px-6 md:px-8">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-pc-gold/6 blur-[140px]" />

      <div className="relative max-w-5xl mx-auto space-y-6">

        {/* ── Page Header ── */}
        <header className="pc-section p-7 md:p-9">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="label-xs mb-3">Market Intelligence Feed</p>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
                Energy News Desk
              </h1>
              <p className="text-text-secondary text-sm leading-7 mt-3 max-w-xl">
                Curated editorial feed for tracking headlines that influence near-term crude price direction.
                Browse by recency window or inspect a specific publication date.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-stretch gap-3 min-w-[200px]">
              <div className="flex-1 rounded-xl border border-white/7 bg-pc-black/40 px-4 py-3">
                <p className="label-xs mb-1.5">Articles</p>
                <p className="font-display font-bold text-2xl text-text-primary">{articles.length}</p>
              </div>
              <div className="flex-1 rounded-xl border border-white/7 bg-pc-black/40 px-4 py-3">
                <p className="label-xs mb-1.5">Dates</p>
                <p className="font-display font-bold text-2xl text-text-primary">{distinctDates}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Filter Bar ── */}
        <form
          onSubmit={handleFilterSubmit}
          className="pc-card p-5 sm:p-6"
        >
          <div className="flex flex-col xl:flex-row gap-4 xl:items-end xl:justify-between">

            {/* Mode toggle */}
            <div>
              <p className="label-xs mb-3">
                <Filter size={10} className="inline mr-1.5 text-text-muted" />
                View Mode
              </p>
              <div className="inline-flex rounded-xl border border-white/8 bg-pc-black/40 p-1 gap-1">
                {(["recent", "date"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                      mode === m
                        ? "bg-pc-gold text-black font-semibold"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    }`}
                  >
                    {m === "recent" ? "Recent Dates" : "Exact Date"}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter inputs + actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
              {mode === "recent" ? (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="days" className="text-[11px] text-text-muted font-medium">
                    Distinct date count
                  </label>
                  <input
                    id="days"
                    type="number"
                    min={1}
                    value={daysInput}
                    onChange={(e) => setDaysInput(e.target.value)}
                    className="pc-input h-10 px-3.5 w-36 text-sm"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="article-date" className="text-[11px] text-text-muted font-medium">
                    Article date
                  </label>
                  <input
                    id="article-date"
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="pc-input h-10 px-3.5 w-48 text-sm"
                  />
                </div>
              )}

              <div className="flex items-end gap-2">
                <AnimatedButton type="submit" variant="primary" className="h-10 px-4">
                  <Search size={14} />
                  Apply
                </AnimatedButton>
                <AnimatedButton type="button" variant="secondary" onClick={handleReset} className="h-10 px-3.5">
                  <RefreshCw size={14} />
                  Reset
                </AnimatedButton>
              </div>
            </div>
          </div>
        </form>

        {/* ── Error State ── */}
        {error && (
          <div className="rounded-xl border border-pc-gold/25 bg-pc-gold/8 px-4 py-3 text-sm text-pc-gold">
            {error}
          </div>
        )}

        {/* ── Loading Skeletons ── */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((key) => (
              <div key={key} className="skeleton-loader h-44 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && articles.length === 0 && (
          <div className="pc-card p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
              <Newspaper size={22} className="text-text-muted" />
            </div>
            <p className="font-semibold text-text-primary mb-1">No articles found</p>
            <p className="text-sm text-text-muted">Try a different filter or reset to the default feed.</p>
          </div>
        )}

        {/* ── Article Feed ── */}
        {!loading && articles.length > 0 && (
          <section className="space-y-4">
            {/* Section header */}
            <div className="flex items-center justify-between gap-3 px-1">
              <h2 className="font-display font-semibold text-lg text-text-primary">Latest Coverage</h2>
              <p className="label-xs">
                Page {currentPage} of {Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE))}
              </p>
            </div>

            {/* Article cards */}
            <div className="space-y-3">
              {pagedArticles.map((article, index) => (
                <motion.article
                  key={`${article.id}-${(currentPage - 1) * ARTICLES_PER_PAGE + index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="pc-card p-5 hover:border-white/12 transition-all duration-200 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-xl h-40 md:h-full bg-pc-elevated border border-white/7">
                      {article.image_url && !failedImages[article.id] ? (
                        <NewsImage
                          src={article.image_url}
                          alt={article.title}
                          articleId={article.id}
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <Newspaper className="text-text-faint" size={28} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-text-muted">
                          <Calendar size={11} />
                          {formatArticleDate(article.article_date)}
                        </span>
                        {article.source && (
                          <span className="chip-neutral text-[10px] py-0.5 px-2 rounded-md font-mono uppercase tracking-wider">
                            {article.source}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-semibold text-[17px] text-text-primary leading-snug mb-3 group-hover:text-white transition-colors duration-150">
                        {article.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-sm text-text-secondary leading-7 line-clamp-3 flex-1">
                        {article.summary ?? "No summary available for this article."}
                      </p>

                      {/* Read more */}
                      {article.url && (
                        <div className="pt-4 mt-auto border-t border-white/6">
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-pc-gold hover:text-pc-gold-light transition-colors duration-150"
                          >
                            Read full article
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
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
