import { ref } from "vue";
import { getGamesByTitleSearchBar } from "@/data/eCommerceAppGamesShopApi";
import axios from "axios";

export function useGameSearch() {
  const searchQuery = ref("");
  const results = ref([]);
  const isLoading = ref(false);
  const hasError = ref(false);

  let currentController = null;

  const handleSearch = async () => {
    if (!searchQuery.value.trim()) {
      hasError.value = false;
      results.value = [];
      return;
    }

    if (currentController) {
      currentController.abort();
    }

    const controller = new AbortController();
    currentController = controller;

    results.value = [];
    hasError.value = false;
    isLoading.value = true;

    try {
      const response = await getGamesByTitleSearchBar.fetchGamesTitle(
        searchQuery.value,
        0,
        10,
        {
          signal: controller.signal,
        }
      );

      if (currentController === controller) {
        results.value = response.games;
      }
    } catch (error) {
      if (axios.isCancel(error) || Error.name === "CanceledError") {
        return;
      }
      console.error("Błąd podczas pobierania danych wyszukiwania: ", error);
      if (currentController === controller) {
        hasError.value = true;
      }
    } finally {
      if (currentController === controller) {
        isLoading.value = false;
      }
    }
  };

  const clearSearch = () => {
    searchQuery.value = "";
    results.value = [];
    hasError.value = false;
    isLoading.value = false;
    if (currentController) {
      currentController.abort();
    }
  };

  return {
    searchQuery,
    results,
    isLoading,
    hasError,
    handleSearch,
    clearSearch,
  };
}
