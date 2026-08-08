import axios from "axios";
const BASE_URL = process.env.VUE_APP_SPRING_API_BASE_URL;

export const getGames = {
  async fetchGamesData(page = 0, size = 4) {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: { page, size },
    });

    const sliceData = response.data;

    const mappedGames = sliceData.content.map((game) => {
      const firstPlatform =
        Array.isArray(game?.platforms) && game.platforms.length > 0
          ? game.platforms[0]
          : null;

      return {
        id: game?.id ?? "",
        title: game?.title ?? "",
        price: Number(game?.price ?? 0),
        imagePath: game?.mainImage ?? "",
        reviews: game?.reviewsCount ?? 0,
        discountInPercentage: Number(game?.discountInPercentage ?? 0),
        numberOfStars: game?.rate ?? 0,
        description: game?.description ?? "",
        genres: Array.from(game?.genres ?? []),
        platform: firstPlatform,
      };
    });

    return {
      games: mappedGames,
      hasNext: !sliceData.last,
      isLast: sliceData.last,
      pageNumber: sliceData.number,
    };
  },
};

export const getGamesByTitleSearchBar = {
  async fetchGamesTitle(query = "", page = 0, size = 1, axiosOptions = {}) {
    const response = await axios.get(`${BASE_URL}/games/search`, {
      params: {
        title: query,
        page,
        size,
      },
      ...axiosOptions,
    });

    const sliceData = response.data;

    const mappedGames = (sliceData.content || []).map((game) => {
      return {
        id: game?.id ?? "",
        title: game?.title ?? "",
      };
    });

    return {
      games: mappedGames,
      hasNext: !sliceData.last,
      isLast: sliceData.last,
      pageNumber: sliceData.number,
    };
  },
};
