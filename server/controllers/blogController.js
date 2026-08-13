import Parser from "rss-parser";

const parser = new Parser();
// Array of top construction and engineering RSS feeds
const CONTECH_FEEDS = [
  "https://www.constructiondive.com/feeds/news/",
  "https://www.enr.com/ext/resources/rss/news.xml", // Engineering News-Record
  "https://www.geoweeknews.com/rss", // Geo Week News (BIM & Tech)
];

export const getConTechNews = async (req, res) => {
  try {
    // Fetch all feeds concurrently
    const feedPromises = CONTECH_FEEDS.map(async (feedUrl) => {
      try {
        const feed = await parser.parseURL(feedUrl);
        return feed.items.map((item, index) => ({
          id: `${Buffer.from(feedUrl).toString("base64")}-${index}`, // Unique safe ID
          title: item.title || "Untitled Insight",
          content:
            item.contentSnippet ||
            item.summary ||
            "Click read more to view full article details.",
          link: item.link,
          source: feed.title || "Industry Source",
          date: item.pubDate || new Date().toISOString(),
        }));
      } catch (err) {
        console.warn(`Skipping feed due to error: ${feedUrl}`, err.message);
        return []; // Fail gracefully if one feed is down
      }
    });

    const results = await Promise.all(feedPromises);

    // Flatten all arrays into a single list
    let allPosts = results.flat();

    // Shuffle the array randomly so users see a fresh mix on every refresh
    allPosts = allPosts.sort(() => Math.random() - 0.5);

    res.json({
      success: true,
      data: allPosts.slice(0, 15), // Return top 15 randomized articles
    });
  } catch (error) {
    console.error("RSS Aggregation Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to aggregate construction insights",
    });
  }
};
