import { ref, watch } from "vue";
import { getGamesByTitleSearchBar } from "@/data/eCommerceAppGamesShopApi";
import axios from "axios";
import { debounce } from "lodash-es";

const NUMBER_OF_CHARS_TO_START_SEARCH = 3;
const DEBOUNCE_DELAY_MS = 300;

export function useGameSearch() {
  const searchQuery = ref("");
  const results = ref([]);
  const isLoading = ref(false);
  const hasError = ref(false);

  let currentController = null;

  const debouncedSearch = debounce((query) => {
    executeSearch(query);
  }, DEBOUNCE_DELAY_MS);

  const cancelSearch = () => {
    debouncedSearch.cancel();
    if (currentController) {
      currentController.abort();
      currentController = null;
    }
  };

  const executeSearch = async (query) => {
    cancelSearch();

    const controller = new AbortController();
    currentController = controller;

    results.value = [];
    hasError.value = false;
    isLoading.value = true;

    try {
      const response = await getGamesByTitleSearchBar.fetchGamesTitle(
        query,
        0,
        10,
        { signal: controller.signal }
      );

      if (
        currentController === controller &&
        searchQuery.value.trim() === query
      ) {
        results.value = response.games;
      }
    } catch (error) {
      if (
        axios.isCancel(error) ||
        error?.name === "CanceledError" ||
        error?.name === "AbortError"
      ) {
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

  watch(searchQuery, (newQuery) => {
    const trimmedQuery = newQuery.trim();

    if (trimmedQuery.length >= NUMBER_OF_CHARS_TO_START_SEARCH) {
      isLoading.value = true;
      debouncedSearch(trimmedQuery);
    } else {
      cancelSearch();
      results.value = [];
      isLoading.value = false;
      hasError.value = false;
    }
  });

  return {
    searchQuery,
    results,
    isLoading,
    hasError,
    executeSearch,
    clearSearch,
  };
}
