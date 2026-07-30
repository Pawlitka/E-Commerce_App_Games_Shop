import axios from "axios";
const BASE_URL =
  process.env.APP_VUE_SPRING_API_BASE_URL || "http://localhost:8080";

export const getGames = {
  async fetchGamesData(options = {}) {
    const { data } = await axios.get(`${BASE_URL}/games`, options);

    return data.map((response) => ({
      id: response?.id ?? "",
      genres: response?.genres ?? [],
      platform: response?.platforms?.[0] ?? null,
      imagePath: response?.mainImage ?? "",
      title: response?.title ?? "",
      price: response?.price ?? 0,
      discountInPercentage: response?.discountInPercentage ?? 0,
      reviews: response?.reviewsCount ?? 0,
      numberOfStars: response?.rate ?? 0,
      description: response?.description ?? "",
    }));
  },
};

export const getGamesByTitleSearchBar = {
  async fetchGamesTitle(query = "", options = {}) {
    const url = `${BASE_URL}/games/search?title=${encodeURIComponent(query)}`;

    const { data } = await axios.get(url, options);

    return data.map((response) => ({
      id: response?.id ?? "",
      title: response?.title ?? "",
    }));
  },
};
