export async function getYoutubeVideoId(query) {
  const apiKey = "";
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponet(query)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        const ChannelName = data.items[0].snippet.channelTitle;
      return {videoId, ChannelName};
    } else {
      console.log("No video found for the given query.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching YouTube video ID:", error);
    return null;
  }

}
