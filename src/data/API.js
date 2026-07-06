import axios from "axios";

const API_URL = "http://localhost:8080/games";

export const getGames = {
  async fetchGamesData() {
    const responses = (await axios.get(API_URL)).data;
    return responses.map((response) => {
      console.log(response);
      return {
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
      };
    });
  },
};
